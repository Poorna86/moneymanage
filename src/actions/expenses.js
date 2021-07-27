import database from '../firebase/firebase';
import { history } from '../routers/AppRouter';

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const { name1='', name2='', amount=0, description = '', phone=0, interest=0, createdAt=0, paidStatus='', partialExpense=[''] } = expenseData;
        const expense = { name1, name2, amount, description, phone, interest, createdAt, paidStatus, partialExpense }
        const uid = getState().auth.uid
        
        database.ref(`users/${uid}/moneymanage`).push(expense).then((ref) => {
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
    
    return (dispatch,getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/moneymanage/${id}`).update(
            updates
            ).then(() => {
            dispatch(editExpense(id, updates))
        }).catch((e) => console.log('error: ', e))
    }
}) 

//DELETE_EXPENSE
export const deleteExpense = ({ id } = {}) => ({
    type: 'DELETE_EXPENSE',
    id
});

export const startDeleteExpense = ( { id } = {} ) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        
        database.ref(`users/${uid}/moneymanage/${id}`).remove().then(() => {
          dispatch(deleteExpense({ id }))
        })
    }
  }

//SET_EXPENSE
export const setExpense = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = (() => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/moneymanage`).once('value').then((snapshot) => {
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