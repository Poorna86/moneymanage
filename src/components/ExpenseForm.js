import React from 'react';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import HelpIcon from '@material-ui/icons/Help';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ExpenseForm extends React.Component {
    
    constructor(props) {
        super (props)
        this.state = {
            name1: props.expense ? props.expense.name1 : '',
            name2: props.expense ? props.expense.name2 : '',
            amount: props.expense ? props.expense.amount : '',
            description: props.expense ? props.expense.description : '',
            phone: props.expense ? props.expense.phone : '',
            createdAt: props.expense ? props.expense.createdAt : moment(),
            paidStatus: props.expense ? props.expense.paidStatus : '',
            error: '',
            calendarFocused: false
        };
    };
    
    onName1Change = (e) => {
        const name1 = e.target.value;
        this.setState (() => ({name1}))
    };

    onName2Change = (e) => {
        const name2 = e.target.value;
        this.setState (() => ({name2}))
    };

    onAmountChange = (e) => {
        const amount = e.target.value
        //below !amount will allow user to remove input amount
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({error: ''}))
            this.setState(() => ({amount}))
        } else {
          this.setState(() => ({error: 'Please valid amount'}))
        }
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState (() => ({description}))
    };

    onPhoneChange = (e) => {
        const phone = e.target.value;
        var pattern = new RegExp(/^[0-9\b]+$/);
        //below !phone will allow user to remove input amount
        if(!phone || phone.match(pattern)) {
            this.setState(() => ({error: ''}))
            this.setState(() => ({phone}))
        } else {
          this.setState(() => ({error: 'Please valid phone number'}))
        }
    };

    onDateChange = (e)=> {
      e.persist();
      const createdAt = e.target.value;
      //below if statement prevents to remove input date on screen
      if (createdAt) {
          this.setState(()=> ({createdAt}));
      }
    };

    onFocusChange = ({focused}) => {
      this.setState(() => ({calendarFocused: focused}));
    };

    onSubmit = (e) => {
      e.preventDefault(); //will not allow page refresh after submit button
      if (!this.state.name1 || !this.state.name2 || !this.state.amount || !this.state.description || !this.state.phone || !this.state.createdAt) {
        this.setState(() => ({error: 'All input fields are mandatory' }));
      } else {
        this.setState(() => ({error: ''}))
        this.props.onSubmit({
          name1: this.state.name1,
          name2: this.state.name2,
          amount: this.state.amount,
          description: this.state.description,
          phone: this.state.phone,
          createdAt: this.state.createdAt.valueOf(),
          paidStatus: this.state.paidStatus
        })
      }
    };

    onPaidChange = (e) => {
      const paidStatus = e.target.value;
      this.setState(() => ({paidStatus}))
    };

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                  <table className="create__table">
                    <thead className="create__thead">
                        <tr className="create__tr">
                          <th >Name From </th>
                          <th >Name To </th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th>Mobile Number</th>
                          <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="create__tbody">
                      <tr className="create__tr">
                        <td className="create__td">
                          <input 
                            type="text"
                            placeholder="Name from"
                            autoFocus
                            value={this.state.name1}
                            onChange={this.onName1Change}
                          />
                          <OverlayTrigger
                            key='left'
                            placement='left'
                              overlay={
                              <Tooltip id='tooltip-left'>
                                Name who gave money.
                              </Tooltip>
                            }
                           >
                            <HelpIcon className="check"/>
                          </OverlayTrigger>
                        </td>
                        <td className="create__td">
                          <input 
                            type="text"
                            placeholder="Name to"
                            value={this.state.name2}
                            onChange={this.onName2Change}
                          />
                          <OverlayTrigger
                            key='left'
                            placement='left'
                              overlay={
                              <Tooltip id='tooltip-left'>
                                Name Who barrowed.
                              </Tooltip>
                            }
                           >
                            <HelpIcon />
                          </OverlayTrigger>
                        </td>
                        <td className="create__td">
                          <input 
                            type="text"
                            placeholder="Amount"
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                          />
                        </td>
                        <td className="create__td">
                          <input 
                            type="text"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                          />
                        </td>
                        <td className="create__td">
                          <input 
                            type="text"
                            placeholder="Mobile Number"
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                            maxLength="10"
                          />
                        </td>
                        <td className="create__td">
                          <input type="date"
                            placeholder="select date" name="date" 
                            onChange={this.onDateChange}
                            value={moment(this.state.createdAt).format("YYYY-MM-DD")}
                            max={moment(this.state.createdAt).format("YYYY-MM-DD")}
                          />
                        </td>
                        {window.location.pathname.search("edit") === 1 &&
                          <td className='edit__td'> 
                            <select
                             value={this.state.paidStatus}
                             onChange={this.onPaidChange}
                            >
                              <option value="Select">Select</option>
                              <option value="Paid">Paid</option>
                            </select>
                          </td>
                        }
                      </tr>
                      {this.state.error && <p className="errorMsg">{this.state.error}</p>}
                    </tbody>
                   </table>
                   <button className="addButton">{window.location.pathname.search("edit") === 1 ? 'Edit Entry' : 'Add Entry'}</button>
                </form>
            </div>
        );
    };    
};

export default ExpenseForm;