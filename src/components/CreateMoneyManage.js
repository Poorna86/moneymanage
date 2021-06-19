import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startAddExpense} from '../actions/expenses';
import Header from './Header_R';

class AddExpenses extends React.Component{
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <Header />
                <h2 className="pageTitle">Create Money Manage</h2>
                <ExpenseForm 
                    onSubmit = {this.onSubmit}
                />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps) (AddExpenses);