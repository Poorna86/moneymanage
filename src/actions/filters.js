//SET_NAME_FILTER
export const setName1Filter = (name1 = '') => ({
    type: 'SET_NAME1_FILTER',
    name1
})

export const setName2Filter = (name2 = '') => ({
    type: 'SET_NAME2_FILTER',
    name2
})
//SET_PAID_FILTER
export const setPaidFilter = (paidStatus = '') => ({
    type: 'SET_PAID_FILTER',
    paidStatus
})

//SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

//SORT_BY_AMOUNT
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

//SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})