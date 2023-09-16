import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState(false);

    const handleBudgetChange = (event) => {
        console.log('in handleBudgetChange', event.target.value);
        const inputValue = event.target.value;

        // validate input
        if (isNaN(inputValue) || inputValue > 20000) {
            setError(true);
        } else {
            // clear the error 
            setError(false) 
        }
        setNewBudget(inputValue)
    };

    // TODO: make hardcoded currency symbol read from state (context)?
    return(
        <div className='alert alert-secondary' data-testid='budget-box'>
            <span data-testid='budget-display'>
                Budget: £{budget} 
            </span>
            <input 
                type='number' 
                step='10' 
                value={newBudget} 
                onChange={handleBudgetChange}/>
            {error && <div className='error-message'>Error: budget must be {'<'}20,000</div>}
        </div>
    );
};

export default Budget;