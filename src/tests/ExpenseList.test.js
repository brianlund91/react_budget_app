import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppProvider } from "../context/AppContext";
import ExpenseList from "../components/ExpenseList";

describe('ExpenseList', () => {
    it('should increase budget allocation for finance department by 10 when the + button is clicked', async () => {
        render(
            <AppProvider>
                <ExpenseList/>
            </AppProvider>
        );

        // ensure the finance budget of 300 exists before increasing budget allocation
        screen.getByText('£300');

        const addButton = screen.getAllByRole('button', {name: '+'})[1]; 
        await userEvent.click(addButton);

        // implicit validation if no error is thrown looking for the updated budget value 
        screen.getByText('£310');

        // just to be 100% sure, validate that the old finance budget allocation value is not in the DOM
        const oldFinanceBudgetValue = screen.queryByText('£300');
        expect(oldFinanceBudgetValue).not.toBeInTheDocument();
    });

    it('should decrease budget allocation by 10 when the - button is clicked', async () => {
        render(
            <AppProvider>
                <ExpenseList/>
            </AppProvider>
        );

        // ensure the sales budget of 70 exists before decreasing budget allocation
        screen.getByText('£70');

        const subtractButton = screen.getAllByRole('button', {name: '-'})[2]; 
        await userEvent.click(subtractButton);

        // implicit validation if no error is thrown looking for the updated budget value 
        screen.getByText('£60');
    });

    it('should remove budeget category from table when delete button is clicked', async () => {
        render(
            <AppProvider>
                <ExpenseList/>
            </AppProvider>
        );

        const humanResourcesRow = screen.getByTestId('expense-row-Human Resource');
        expect(humanResourcesRow).toBeInTheDocument();
        
        const deleteButton = screen.getByRole('button', {name: 'Delete Human Resource'});
        await userEvent.click(deleteButton);

        expect(humanResourcesRow).not.toBeInTheDocument();
    })
});