import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { calculateTotalExpenses } from '../utils';

const Budget = () => {
    const { budget, expenses, currency, dispatch } = useAppState();
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState(null);

    const handleBudgetChange = (event) => {
        // console.log('in handleBudgetChange', event.target.value);
        const inputValue = event.target.value;
        const totalExpenses = calculateTotalExpenses(expenses);

        // validate input
        if (isNaN(inputValue) || inputValue < 0) {
            setError('value must be a positive number');
        } 
        else if (inputValue > 20000) {
            setError('budget is not allowed to exceed 20,000');
        }
        // budget cannot be less than budget spent/allocated
        // question: would it be better to handle this validation in the reducer function?
        else if (inputValue < totalExpenses) {
            setError(`budget is not allowed to be less than the amount already allocated (${totalExpenses})`);
        }
        else {
            // valid input, clear the error and update the budget value
            setError(null);
            dispatch({
                type: 'SET_BUDGET',
                payload: inputValue,
            });
        }

        setNewBudget(inputValue)
    };

    // TODO: make hardcoded currency symbol read from state (context)?
    return(
        <div className='alert alert-secondary' data-testid='budget-box'>
            <span data-testid='budget-display'>
                Budget: {currency}{budget} 
            </span>
            <div>
                Edit: <input 
                    type='number' 
                    step='10' 
                    value={newBudget} 
                    onChange={handleBudgetChange}/>
                {error && <div className='error-message'>Error: {error}</div>}
            </div>
        </div>
    );
};

export default Budget;