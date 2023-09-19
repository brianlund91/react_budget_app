import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Budget from './components/Budget';
import { AppProvider } from './context/AppContext';

const getBudgetInputElement = () => {
    // TODO: more reliable selector
    return screen.getAllByRole('spinbutton')[0]; 
}

describe('Budget', () => {

    it('should render the component', () => {
        render(
            <AppProvider>
                <Budget /> 
            </AppProvider>
        );
        const budgetBox = screen.getByTestId('budget-box');
        expect(budgetBox).toBeInTheDocument();
    });

    it('should display Budget text', () => {
        render(
            <AppProvider>
                <Budget /> 
            </AppProvider>
        );

        const budgetText = screen.getByText(/Budget:/);
        expect(budgetText).toBeInTheDocument();
    });

    it('should update budget when budget input is modified', async () => {
        render(
            <AppProvider>
                <Budget /> 
            </AppProvider>
        );

        // TODO: more reliable selector
        const budgetInput = screen.getAllByRole('spinbutton')[0];
        expect(budgetInput.value).toBe("2000");

        // fireEvent.change(budgetInput, {
        //     target: { value: '2050' }
        // });

        await userEvent.clear(budgetInput);
        await userEvent.type(budgetInput, '2050');

        expect(budgetInput.value).toBe("2050");

        // validate that editing the budget causes the new value to be displayed
        const budgetDisplay = screen.getByText(/Budget:/);
        // screen.debug(budgetDisplay);

        // expect(budgetDisplay.textContent).toMatch(/2050/);
        expect(budgetDisplay).toHaveTextContent(/2050/);
    });

    it('should display error and not update budget when budget input exceeds limit of 20,000', async () => {
        render(
            <AppProvider>
                <Budget /> 
            </AppProvider>
        );

        const budgetInput = getBudgetInputElement();

        await userEvent.clear(budgetInput);
        await userEvent.type(budgetInput, '20010');
        expect(budgetInput.value).toBe('20010');

        // validate that editing the budget to be above limit of 20,000 does NOT update the budget
        const budgetDisplay = screen.getByText(/Budget:/);
        expect(budgetDisplay).toHaveTextContent(/2001/);

        // validate that error message is displayed
        const errorDisplay = screen.getByText(/Error:/);
        expect(errorDisplay).toBeVisible();
        // TODO: validate error message?
        // expect(errorDisplay).toHaveTextContent(/???/);
    });

    it('should display error and not update budget when budget input is less than allocated budget', async () => {
        render(
            <AppProvider>
                <Budget /> 
            </AppProvider>
        );

        const budgetInput = getBudgetInputElement();

        await userEvent.clear(budgetInput);
        await userEvent.type(budgetInput, '100');
        expect(budgetInput.value).toBe('100');

        // validate that editing the budget to be less than allocated budget does NOT update the budget amount
        // Note: initial state of allocated budget is £960
        // TODO: modify this to dynamically get the allocated budget
        const budgetDisplay = screen.getByText(/Budget:/);
        expect(budgetDisplay).toHaveTextContent(/2000/);

        // validate error message is displayed
        const errorDisplay = screen.getByText(/Error:/);
        expect(errorDisplay).toBeVisible();
        // TODO: validate error message?
        // expect(errorDisplay).toHaveTextContent(/???/);
    });
});
