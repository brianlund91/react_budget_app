import { useAppState } from "../context/AppContext";

const Currency = () => {
    const { currency, dispatch } = useAppState();

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;

        dispatch({
            type: 'CHANGE_CURRENCY',
            payload: newCurrency,
        });
    }

    return (
        <div>
            <span>Select Currency: </span>
            <select id='currency-dropdown' value={currency} onChange={handleCurrencyChange}>
                <option value='£'>£ Pound</option>
                <option value='$'>$ Dollar</option>
                <option value='€'>€ Euro</option>
                <option value='₹'>₹ Rupee</option>
            </select>
        </div>
    );
};

export default Currency;