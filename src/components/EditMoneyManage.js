import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import Header from './Header';
import { startEditExpense } from '../actions/expenses';

export class EditMoneyManage extends React.Component {

    onSubmit = (expense) => {
        
        this.props.startEditExpense(this.props.expense.id, expense);
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Header />
                <h2 className='title' >Money Managment summary</h2>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                    id={this.props.expense.id}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
})

export default connect(mapStateToProps, mapDispatchToProps) (EditMoneyManage);