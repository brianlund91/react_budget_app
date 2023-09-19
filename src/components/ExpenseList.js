import React from "react";
import { useAppState } from "../context/AppContext";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
    const { expenses } = useAppState();

    return (
        <table className='table'>
            <thead className="thead-light">
            <tr>
                <th scope="col">Department</th>
                <th scope="col">Allocated Budget</th>
                <th scope="col">Increase by 10</th>
                <th scope="col">Delete</th>
            </tr>
          </thead>
            <tbody>
                {expenses.map((expense) => {
                    return <ExpenseItem 
                        key={expense.id} 
                        name={expense.name} 
                        cost={expense.cost} />
                })}
            </tbody>
        </table>
    )
};

export default ExpenseList