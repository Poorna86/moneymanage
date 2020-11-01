import React from 'react';
import ExpenseListFilters from './ExpenseListFilters';
import NavBarPage from './Navbar/NavBarPage';
import ExpenseList from './ExpenseList';

class ExpenseDashboardPage extends React.Component {
    componentDidMount() {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
          };
    };
    render () {
        return(
            <div>
                <NavBarPage />
                <ExpenseListFilters />
                <ExpenseList />
            </div>
        );
    }
}

export default ExpenseDashboardPage;