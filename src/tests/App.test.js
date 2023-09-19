import App from '../App';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

describe('App', () => {
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
});
