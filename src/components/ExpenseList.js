import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import moment from 'moment';
import numeral from 'numeral';
import axios from 'axios';
import database from '../firebase/firebase';

const ExpenseList = (props) => {
    axios
    .get('http://localhost:3001/dashboard')
    .then((response) => {
      console.log('error', response.data);
      this.setState({events: response.data})
    })
    .catch(err => {
      this.setState({error: err.response.data.message})
      console.error('error info: ', err.response.data.message);
    });

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
                        <th>{props.filters.name2.length > 0 ? 'To Name' : 'From Name'}</th>
                        {/* <th>Name</th> */}
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
                                        {props.filters.name2.length > 0 ? expense.name2 : expense.name1}
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
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    } 
}

export default connect(mapStateToProps) (ExpenseList);