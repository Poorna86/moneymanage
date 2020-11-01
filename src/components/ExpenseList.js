import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseList = (props) => {
    return (
    <div >
        {props.expenses.length === 0 && <p> No expenses to display </p>}
        {props.expenses.length !== 0 && 
            <table className="container">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{numeral(expense.amount).format('00.00')}</td>
                                <td>{moment(expense.createdAt).format('DD MMM YYYY')}</td>
                                <td>{expense.paidStatus}</td>
                                <td>
                                    {<Link to={`/edit/${expense.id}`}>
                                        {expense.name}
                                    </Link>}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }           
    </div>
    )
};

const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters)
    } 
}

export default connect(mapStateToProps) (ExpenseList);