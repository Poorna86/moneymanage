// expense reducer

const expenseReducersDefaultState = [];

const expenseReducer = (state = expenseReducersDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': 
            return [
                ...state,
                action.expense
            ]
        case 'SET_EXPENSES':
            return action.expenses 
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return {
                        ...expense
                    }
                }
            })
        case 'DELETE_EXPENSE':
            
            return state.filter(( { id } ) => {
                return id !== action.id
            })
        default:
            return state
    }
};

export default expenseReducer;