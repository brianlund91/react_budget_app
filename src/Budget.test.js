import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Budget from './components/Budget';
import { AppProvider } from './context/AppContext';

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

    // TODO: is there a better pattern than this? It smells off 
    await userEvent.clear(budgetInput);
    await userEvent.type(budgetInput, '2050');

    expect(budgetInput.value).toBe("2050");

    // validate that editing the budget causes the new value to be displayed
    const budgetDisplay = screen.getByText(/Budget:/);
    // screen.debug(budgetDisplay);
    // expect(budgetDisplay.textContent).toMatch(/2050/);
    expect(budgetDisplay).toHaveTextContent(/2050/);
});
});
