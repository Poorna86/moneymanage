import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header_R';
import { startEditExpense, startDeleteExpense } from '../actions/expenses';

export class EditMoneyManage extends React.Component {

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense)
        const expenseData = {
            expense: expense
        }

        const emailForExitExpense = async () => {
            try {
                const resp = await axios.post(`${process.env.API_URL}/sendEmail/edit`, expenseData)
                console.log('response: ', response)
                this.props.history.push('/')
            } catch (err) {
                console.log(err)
            }
        }
        emailForExitExpense()
    }

    onDelete = (deleteYes) => {
        if (deleteYes) {
            this.props.startDeleteExpense({ id: this.props.expense.id })
            const callExpenseEdit = axios
            .post(`${process.env.API_URL}/sendEmail/delete`, this.props.expense)
            .then((response) => {
                console.log('response: ', response)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
            callExpenseEdit()
        }
    }

    render() {
        return (
            <div>
                <Header />
                <h2 className='title' >Money Managment summary</h2>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                    onDelete={this.onDelete}
                    id={this.props.expense.id}
                    history={this.props.history}
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
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startDeleteExpense: (data) => dispatch(startDeleteExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps) (EditMoneyManage);