
const LOCAL_STORAGE_KEY = 'expenseData';

export const fetchExpenseData = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export const addExpenseData = (newData) => {
    const data = fetchExpenseData();
    data.push(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}
