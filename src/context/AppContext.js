import React, { createContext, useContext, useReducer } from 'react';
import { calculateTotalExpenses } from '../utils';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            action.type = "DONE";
            const totalExpenses = calculateTotalExpenses(state.expenses);
            const proposedExpenses = totalExpenses + action.payload.cost;
            // ensure that new expenses are within our alloted budget 
            if (proposedExpenses <= state.budget) {
                state.expenses.map((currentExp) => {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = currentExp.cost + action.payload.cost;
                    }
                    return currentExp;
                });
            } else {
                alert("Cannot increase the allocation! Out of funds");
            }
            return {
                ...state
            };
        case 'REDUCE_EXPENSE':
            const reduce_expenses = state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost =  currentExp.cost - action.payload.cost;
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                expenses: [...reduce_expenses],
            };
        case 'DELETE_EXPENSE':
            console.log(`in DELETE_EXPENSE case in reducer, payload=${action.payload}`)
            action.type = "DONE";
            const newExpenses = state.expenses.filter((expense)=> {
                return expense.name !== action.payload;
            });
            state.expenses = newExpenses;
            return {
                ...state,
            };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
            };
        case 'CHANGE_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
const AppContext = createContext();

export const useAppState = () => {
    return useContext(AppContext);
};

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    // Note: copying initialState so that the object does not get modified for subsequent test runs
    const [state, dispatch] = useReducer(AppReducer, { ...initialState } );
    // console.log('state:', state);
    let remaining = 0;

    if (state.expenses) {
        const totalExpenses = calculateTotalExpenses(state.expenses);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
