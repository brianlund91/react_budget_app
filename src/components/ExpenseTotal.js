import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { calculateTotalExpenses } from '../utils';

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);
    const totalExpenses = calculateTotalExpenses(expenses);

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: £{totalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
