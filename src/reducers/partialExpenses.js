// expense reducer

const expenseReducersDefaultState = [];

const partialExpenses = (state = expenseReducersDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PARTIAL_EXPENSE': 
            return [
                ...state,
                action.partialExpense
            ]
        case 'SET_PARTIAL_EXPENSES':
            return action.partialExpenses
        case 'EDIT_PARTIAL_EXPENSE': 
            return state.map((partialExpense) => {
                if (partialExpense.id === action.id) {
                    return {
                        ...partialExpense,
                        ...action.updates
                    }
                } else {
                    return {
                        ...partialExpense
                    }
                }
            }) 
        default:
            return state
    }
};

export default partialExpenses;