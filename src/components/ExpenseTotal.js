import React from 'react';
import { useAppState } from '../context/AppContext';
import { calculateTotalExpenses } from '../utils';

const ExpenseTotal = () => {
    const { expenses, currency } = useAppState();
    const totalExpenses = calculateTotalExpenses(expenses);

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: {currency}{totalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
