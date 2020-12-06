import React, { useState } from 'react';
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
      fromExpenses: {},
      toExpenses: {}
    }

    onSummaryFromRpt = () => {
        var myArray = this.props.expenses.map(function(obj) { 
            return {
                amount: parseInt(obj.amount), 
                name: obj.name1
                }
        })
        this.state.fromExpenses = myArray.reduce((a, obj)=>{
            var existItem = a.find(item => item.name=== obj.name)
            if(existItem){
                existItem.amount += obj.amount
                return a
            } 
            a.push(obj)
            return a
        }, [])       
        this.setState(() => ({ summaryFrom: true,
                                summaryTo: false,
                                detail: false }))
      }
      onSummaryToRpt = () => {
        var myArray = this.props.expenses.map(function(obj) { 
            return {
                amount: parseInt(obj.amount), 
                name: obj.name2
                }
        })
        this.state.toExpenses = myArray.reduce((a, obj)=>{
            var existItem = a.find(item => item.name=== obj.name)
            if(existItem){
                existItem.amount += obj.amount
                return a
            } 
            a.push(obj)
            return a
        }, [])       
        this.setState(() => ({ summaryFrom: false,
                                summaryTo: true,
                                detail: false }))
      }
    onDetailRpt = () => {
        this.setState(() => ({ detail: true,
                                summaryFrom: false,
                                summaryTo: false }))
    }

    render() {
      return (
        <div>
          {this.props.expenses.length === 0 ? 
             <p> No expenses to display </p>
            :
            <div>
                <button onClick={this.onSummaryFromRpt} className="btn_give-amount">Total Amount give</button>
                <button onClick={this.onSummaryToRpt} className="btn_get-amount">Total Amount get</button>
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
                                        <td>{item.name}</td>
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
                                        <td>{item.name}</td>
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
                                    <th>{this.props.filters.name2.length > 0 ? 'To Name' : 'From Name'}</th>
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
                                                    {this.props.filters.name2.length > 0 ? expense.name2 : expense.name1}
                                                </Link>}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>       
                        </table>
                    }
            </div>    
          }      
        </div>
      );
    }
  };
// const ExpenseList = (props) => {
// //class ExpenseList extends React.Component {
//     var myArray = props.expenses.map(function(obj) { 
//         return {
//             amount: parseInt(obj.amount), 
//             name: obj.name1
//             }
//          })
        
//     var res = myArray.reduce((a, obj)=>{
//         var existItem = a.find(item => item.name=== obj.name);
//         if(existItem){
//           existItem.amount += obj.amount;
//           return a;
//         } 
//         a.push(obj);
//         return a;
//       }, []);

//       const summary = useState(false)
//       const detail = useState(true)

//       function sayHello () {
//         this.setState({summary: true, detail: false});
//       }    

//     return (
//         <div >
//             {props.expenses.length === 0 && <p> No expenses to display </p>}
//             {props.expenses.length !== 0 && 
//                 <table className="container">
//                     <button onClick={sayHello}> Click me!</button>
//                     <thead>
//                         <tr>
//                             <th>Amount</th>
//                             <th>Date</th>
//                             <th>Status</th>
//                             <th>{props.filters.name2.length > 0 ? 'To Name' : 'From Name'}</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             props.expenses.map((expense) => (
//                                 <tr key={expense.id}>
//                                     <td>{numeral(expense.amount).format('00.00')}</td>
//                                     <td>{moment(expense.createdAt).format('DD MMM YYYY')}</td>
//                                     <td>{expense.paidStatus}</td>
//                                     <td>
//                                         {<Link to={`/edit/${expense.id}`}>
//                                             {props.filters.name2.length > 0 ? expense.name2 : expense.name1}
//                                         </Link>}
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                         {
//                             res.map(item=> (
//                                 <tr key={res.id}>
//                                     <td>{item.name}</td>
//                                     <td>{item.amount}</td>
//                                 </tr>
//                             ))    
//                         }
//                     </tbody>
//                 </table>
//             }           
//         </div>
//     )    
// };


const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    } 
}

export default connect(mapStateToProps) (ExpenseList);