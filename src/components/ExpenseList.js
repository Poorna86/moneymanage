import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import moment from 'moment';
import numeral from 'numeral';

class ExpenseList extends React.Component {
    state = {
      summaryFrom: false,
      summaryTo: false,
      detail: true,
      indExpense: false,
      indToExpense: false,
      fromExpenses: {},
      toExpenses: {},
      indivisualExpense: {},
      indivisualToExpense: {},
      indivisualToAmount: 0,
      indivisualFromAmount: 0
    }
    
    onSummaryFromRpt = () => {
       const holder = this.props.expenses
       const holderExpense = holder.filter(list => {
            list.amount = parseInt(list.amount)
            if(list.paidStatus !== "Paid"){
                return list
            }
        })
        
        this.state.fromExpenses = Object.values(holderExpense.reduce((acc, curr) => {
            if (acc[curr.name1]) {
                acc[curr.name1].amount += curr.amount
            }
            else {
                acc[curr.name1] = { ...curr }
            }
            return acc
            }, {}))   
        
        this.setState(() => ({ summaryFrom: true,
                                summaryTo: false,
                                detail: false,
                                indExpense: false,
                                indToExpense: false }))
      }
      onSummaryToRpt = () => {
        const holder = this.props.expenses
        const holderExpense = holder.filter(list => {
            list.amount = parseInt(list.amount)
            if(list.paidStatus !== "Paid"){
                return list
            }
        })

        this.state.toExpenses = Object.values(holderExpense.reduce((acc, curr) => {
            if (acc[curr.name2]) {
                acc[curr.name2].amount += curr.amount
            }
            else {
                acc[curr.name2] = { ...curr }
            }
            return acc
            }, {}))
        
        this.setState(() => ({ summaryFrom: false,
                                summaryTo: true,
                                detail: false,
                                indExpense: false,
                                indToExpense: false }))
      }
    onDetailRpt = () => {
        this.setState(() => ({ detail: true,
                                summaryFrom: false,
                                summaryTo: false,
                                indExpense: false,
                                indToExpense: false }))
    }
    onClickDetailList = (name2) => {
        const expenseDetailList = this.props.expenses
        this.state.indivisualExpense = expenseDetailList.filter((list) => {
            return list.name2 === name2 && list.paidStatus !== 'Paid' 
        })
        this.setState(() => ({ detail: false,
                                summaryFrom: false,
                                summaryTo: false,
                                indExpense: true,
                                indToExpense: false }))
    }
    onClickToDetailList = (name1, indToAmount) => {
        const expenseDetailList = this.props.expenses
        this.state.indivisualToExpense = expenseDetailList.filter((list) => {
            return list.name1 === name1 && list.paidStatus !== 'Paid' 
        })
        this.setState(() => ({ detail: false,
                                summaryFrom: false,
                                summaryTo: false,
                                indExpense: false,
                                indToExpense: true,
                                indivisualToAmount: indToAmount }))
    }

    render() {
      return (
        <div>
          {this.props.expenses.length === 0 ? 
             <p> No expenses to display </p>
            :
            <div>
                <button onClick={this.onSummaryFromRpt} className="btn_give-amount">Amount give</button>
                <button onClick={this.onSummaryToRpt} className="btn_get-amount">Amount get</button>
                <button onClick={this.onDetailRpt} className="btn_detail-amount">detail Report</button>
                    { this.state.summaryFrom && 
                        <table className="container">
                            <thead>
                                <tr>
                                   <th>Name</th>
                                   <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                  this.state.fromExpenses.map(item=> (
                                    <tr key={this.state.fromExpenses.id}>
                                        <td className='content_url' onClick={() => this.onClickToDetailList(item.name1, item.amount)}>{item.name1}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                  ))
                                } 
                            </tbody>    
                        </table>    
                    }

                    { this.state.summaryTo && 
                        <table className="container">
                            <thead>
                                <tr>
                                   <th>Name</th>
                                   <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                  this.state.toExpenses.map(item=> (
                                    <tr key={this.state.fromExpenses.id}>
                                        <td className='content_url' onClick={() => this.onClickDetailList(item.name2)}>{item.name2}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                  ))
                                } 
                            </tbody>    
                        </table>    
                    }

                    { this.state.detail &&
                        <table className="container">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>{this.props.filters.name1.length > 0 ? 'From Name' : 'To Name'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.expenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{numeral(expense.amount).format('00.00')}</td>
                                            <td>{moment(expense.createdAt).format('DD MMM YYYY')}</td>
                                            <td>{expense.paidStatus}</td>
                                            <td>
                                                {<Link to={`/edit/${expense.id}`}>
                                                    {this.props.filters.name1.length > 0 ? expense.name1 : expense.name2}
                                                </Link>}
                                            </td>
                                        </tr>
                                    ))
                                }
                                 
                            </tbody>       
                        </table>
                    }
                    { this.state.indExpense && 
                        <table className="container1">
                            <thead>
                                <tr>
                                    <th>From Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.indivisualExpense.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{expense.name2}</td>
                                            <td>{numeral(expense.amount).format('00.00')}</td>
                                            <td>{moment(expense.createdAt).format('DD MMM YYYY')}</td>
                                            <td>{expense.description}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <th>Total  = </th>
                                    <th>{this.state.indivisualFromAmount}</th>
                                </tr>
                            </thead>
                        </table>        
                    }
                    { this.state.indToExpense && 
                        <table className="container1">
                            <thead>
                                <tr>
                                    <th>To Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th className='description_width'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.indivisualToExpense.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{expense.name1}</td>
                                            <td>{numeral(expense.amount).format('00.00')}</td>
                                            <td>{moment(expense.createdAt).format('DD MMM YYYY')}</td>
                                            <td>{expense.description}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            
                            <thead>
                                <tr>
                                    <th>Total  = </th>
                                    <th>{this.state.indivisualToAmount}</th>
                                </tr>
                            </thead>
                        </table>                
                    }
            </div>
          }      
        </div>
      );
    }
  };

const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    } 
}

export default connect(mapStateToProps) (ExpenseList);