import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    };

    // TODO: make hardcoded currency symbol read from state (context)?
    return(
        <div className='alert alert-secondary'>
            <span>
                Budget: £{budget} 
            </span>
            <input 
                type='number' 
                step='10' 
                value={newBudget} 
                onChange={handleBudgetChange}/>
        </div>
    );
};

export default Budget;