export const calculateTotalExpenses = (expenses) => {
    return expenses.reduce(
        (total, expense) => {
            return (total = total + expense.cost);
        }, 
        0,
    );
};