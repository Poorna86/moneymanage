import React from 'react';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseList from './ExpenseList';

class ExpenseDashboardPage extends React.Component {
    
    render () {
        return(
            <div>
                <ExpenseListFilters />
                <ExpenseList />
            </div>
        );
    }
}

export default ExpenseDashboardPage;