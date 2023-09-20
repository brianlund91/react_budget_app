import React from "react";
import {  useAppState } from "../context/AppContext";

import { TiDelete } from 'react-icons/ti';

const ExpenseItem = (props) => {
    const { dispatch } = useAppState();

    const handleDelete = () => {
        console.log(`in ExpenseItem.handleDelete() for expense ${props.name}`);
        
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.name,
        });
    };

    const increaseAllocation = () => {
        console.log(`in ExpenseItem.increaseAllocation() for expense ${props.name}`);

        dispatch({
            type: 'ADD_EXPENSE',
            payload: {
                name: props.name,
                cost: 10
            },
        });
    };

    const decreaseAllocation = () => {
        console.log(`in ExpenseItem.decreaseAllocation() for expense ${props.name}`);

        dispatch({
            type: 'REDUCE_EXPENSE',
            payload: {
                name: props.name,
                cost: 10
            },
        });
    };

    return (
        <tr data-testid={`expense-row-${props.name}`}>
            <td>{props.name}</td>
            <td>£{props.cost}</td>
            <td>
                <button onClick={increaseAllocation}>+</button>
            </td>
            <td>
                <button onClick={decreaseAllocation}>-</button>
            </td>
            <td>
                <button onClick={handleDelete} aria-label={`Delete ${props.name}`}>
                    <TiDelete size='1.5em'/>
                </button>
            </td>
        </tr>
    )
};

export default ExpenseItem;