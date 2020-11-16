import moment from 'moment';

//filter reducer

const filtersReducersDefaultState = {
    name1: '',
    name2: '',
    paidStatus: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

const filterReducer = (state = filtersReducersDefaultState, action) => {
    switch (action.type) {
        case 'SET_NAME1_FILTER':
            return {
                ...state,
                name1: action.name1
            }
        case 'SET_NAME2_FILTER':
            return {
                ...state,
                name2: action.name2
            }    
        case 'SET_PAID_FILTER':
            return {
                ...state,
                paidStatus: action.paidStatus
            }    
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
};

export default filterReducer;