import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import { TiDelete } from 'react-icons/ti';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext)

    const handleDelete = () => {
        console.log(`in ExpenseItem.handleDelete() for expense ${props.name}`);
        
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
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

    return (
        <tr>
            <td>{props.name}</td>
            <td>£{props.cost}</td>
            <td>
                <button onClick={increaseAllocation}>+</button>
            </td>
            <td>
                <TiDelete size='1.5em' onClick={handleDelete}>
                    Delete
                </TiDelete>
            </td>
        </tr>
    )
};

export default ExpenseItem;