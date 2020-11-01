import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const { name='', amount=0, description = '', phone=0, createdAt=0, paidStatus='' } = expenseData;
        const expense = { name, amount, description, phone, createdAt, paidStatus }

        database.ref('moneymanage').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
    });
//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = ((id, updates) => {
    return (dispatch) => {
        return database.ref(`moneymanage/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}) 

//SET_EXPENSE
export const setExpense = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = (() => {
    return (dispatch) => {
        return database.ref('moneymanage').once('value').then((snapshot) => {
            const expenses = []

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpense(expenses))
        })
    }
})