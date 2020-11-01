import moment from 'moment';

//get visible expenses
export default (expenses, {name, paidStatus, sortBy, startDate, endDate}) => {
      
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch =  startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const nameMatch = expense.name.toLowerCase().includes(name.toLowerCase())
        const paidStatusMatch = expense.paidStatus.toLowerCase().includes(paidStatus.toLowerCase())
        
        return startDateMatch && endDateMatch && nameMatch && paidStatusMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }

    });
}