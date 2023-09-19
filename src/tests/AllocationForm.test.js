import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import { AppProvider } from "../context/AppContext"
import AllocationForm from "../components/AllocationForm"

const getAllocationAmountInput = () => {
    return screen.getByRole('spinbutton');
}

describe('AllocationForm', () => {
    it('should not allow non-numeric input', async () => {
        render(
            <AppProvider>
                <AllocationForm/>
            </AppProvider>
        );

        const allocationAmountInput = getAllocationAmountInput();

        await userEvent.type(allocationAmountInput, 'abc');
        expect(allocationAmountInput).toHaveTextContent('');
    });

    it('should alert if attempting to increase allocation above remaining budget', async () => {
        // some gross code to mock window.alert in a testing environment
        const originalAlert = window.alert;
        const mockAlert = jest.fn();
        window.alert = mockAlert;
        // const alertSpy = jest.spyOn(window, 'alert');
        
        render(
            <AppProvider>
                <AllocationForm/>
            </AppProvider>
        );

        const allocationAmountInput = getAllocationAmountInput();
        
        await userEvent.type(allocationAmountInput, '2000');
        expect(allocationAmountInput).toHaveValue(2000);

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        expect(mockAlert).toHaveBeenCalledTimes(1);
        expect(mockAlert).toHaveBeenCalledWith("The value cannot exceed remaining funds  £1040");
   
        // Restore the original window.alert to avoid side effects in other tests
        // alertSpy.mockRestore();

        // Restore the original window.alert
        window.alert = originalAlert;
    });
});