import React from 'react';
import { useAppState } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget } = useAppState();

    const remainingBudget = budget - expenses.reduce(
        (total, expense) => {
            return (total + expense.cost);
        }, 
        0
    );

    // bad news if budget is in the negative
    const alertType = remainingBudget < 0 ? 'alert-danger' : 'alert-success' 

    return (
        <div className={`alert ${alertType}`}>
            Remaining Budget = £{remainingBudget}
        </div>
    );
};

export default Remaining;