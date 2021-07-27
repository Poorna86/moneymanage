import moment from 'moment';

//get visible expenses
export default (expenses, {name1, name2, paidStatus, sortBy, startDate, endDate}) => {
    
    return expenses.filter((expense) => {
        
        const createdAtMoment = moment(expense.createdAt)
        const expensePaidstatus = expense.paidStatus === undefined ? '' : expense.paidStatus
        const filterPaidStatus = paidStatus
        const startDateMatch =  startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const name1Match = expense.name1.toLowerCase().includes(name1.toLowerCase());
        const name2Match = expense.name2.toLowerCase().includes(name2.toLowerCase());
        const paidStatusMatch = expensePaidstatus.toLowerCase().includes(filterPaidStatus.toLowerCase());
        
        return startDateMatch && endDateMatch && name1Match && name2Match && paidStatusMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    }); 
    
}