import database from '../firebase/firebase';

//ADD_PARTIAL_EXPENSE

export const addPartialExpense = (partialExpense) => ({
    type: 'ADD_PARTIAL_EXPENSE',
    partialExpense
});

export const startAddPartialExpense = (partialExpenseData = [] ) => {
    return (dispatch, getState) => {
        const partialExpense = partialExpenseData
        const uid = getState().auth.uid
        console.log('database update: ', partialExpense)
        database.ref(`users/${uid}/partialpayments`).push(partialExpense).then((ref) => {
            dispatch(addPartialExpense({
                id: ref.key,
                ...partialExpense
            }))
        })
    }
}

//SET_PARTIAL_EXPENSES
export const setPartialExpense = (id, partialExpenses) => ({
    type: 'SET_PARTIAL_EXPENSES',
    id,
    partialExpenses
});

export const startSetPartialExpenses = (() => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/partialpayments`).once('value').then((snapshot) => {
            const partialExpenses = []
            let id = ''          
            snapshot.forEach((childSnapshot) => {
                id = childSnapshot.key
                partialExpenses.push({
                    ...childSnapshot.val()
                })
            })
            console.log('partial payments id: ', id)
            dispatch(setPartialExpense(id, partialExpenses))
        })
    }
})

//EDIT_PARTIAL_EXPENSE
export const editPartialExpense = (id, partialUpdates) => ({
    type: 'EDIT_PARTIAL_EXPENSE',
    id,
    partialUpdates
});

export const startEditPartialExpense = ((id, partialUpdates) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid
        console.log('edit partial uid: ', uid)
        return database.ref(`users/${uid}/partialpayments/${id}`).update(
            partialUpdates
            ).then(() => {
            dispatch(editExpense(id, partialUpdates))
        }).catch((e) => console.log('error: ', e))
    }
}) 