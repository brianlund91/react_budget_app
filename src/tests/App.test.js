import App from '../App';

import { render, screen } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import userEvent from '@testing-library/user-event';

describe('App', () => {

    const getBudgetInput = () => {
        // TODO: more reliable selector?
        return screen.getAllByRole('spinbutton')[0];
    }

    const getAllocationAmountInput = () => {
        // TODO: more reliable selector?
        return screen.getAllByRole('spinbutton')[1];
    }

    it('should render budget App key components', () => {
        render(<App/>);
        const headerText = screen.getByText('Mim Corp\'s Budget Allocation');
        expect(headerText).toBeInTheDocument();

        const budgetText = screen.getByText(/Budget:/);
        expect(budgetText).toBeInTheDocument();

        // using implicit role of HTML table element
        const allocationTable = screen.getByRole('table');
        expect(allocationTable).toBeInTheDocument();

        // using data-testid of Budget component, not recommended by RTL
        const budgetComponent = screen.getByTestId('budget-box');
        expect(budgetComponent).toBeInTheDocument();
    });

    describe('AllocationForm integration tests', () => {
        it('should display budget allocation when increasing the allocation for a category', async () => {
            render(
                <AppProvider>
                    <App/>
                </AppProvider>
            );

            // increase budget allocation for IT via the Allocation Form
            const departmentDropdown = screen.getByLabelText('Department');
            await userEvent.selectOptions(departmentDropdown, 'IT');

            const allocationAmountInput = getAllocationAmountInput();
            await userEvent.type(allocationAmountInput, '15');

            const saveButton = screen.getByText('Save');
            await userEvent.click(saveButton);

            // validate remaining budget is decreased by 15 (1040 - 15 = 1025)
            const remainingBudget = screen.getByText(/Remaining Budget/);
            expect(remainingBudget).toHaveTextContent(/1025/);

            // validate spent amount is increased by 15 (960 + 15 = 975)
            const spentAmount = screen.getByText(/Spent so far:/);
            expect(spentAmount).toHaveTextContent(/975/);

            // validate IT budget is increased by 15 (500 + 15 = 515)
            // TODO: improve selector and validation for IT budget?
            const itBudget = screen.getByTestId('expense-row-IT')
            expect(itBudget).toHaveTextContent('£515');
        });
    })
});
