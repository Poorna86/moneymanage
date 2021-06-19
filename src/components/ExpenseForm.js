import React from 'react';
import moment from 'moment';
import {NavLink} from 'react-router-dom';
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
            interest: props.expense ? props.expense.interest : '',
            createdAt: props.expense ? props.expense.createdAt : moment(),
            paidStatus: props.expense ? props.expense.paidStatus : '',
            error: '',
            partialExpense: props.expense && props.expense.paidStatus !== '' ? props.expense.partialExpense : [],
            calendarFocused: false,
            partialAmountPay: props.expense && props.expense.paidStatus !== 'Partial Paid' ? true : false,
            disabled: props.expense && props.expense.paidStatus !== '' ? true : false,
            disableEditBtn: props.expense.paidStatus === 'Paid' ? true : false,
            arrayLength: props.expense && props.expense.paidStatus !== 'Partial Paid' ? props.expense.partialExpense.length : 0
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

    onUpdateDateChange = (e)=> {
      e.persist();
      const updateDate = e.target.value;
      //below if statement prevents to remove input date on screen
      if (updateDate) {
          this.setState(()=> ({updateDate}));
      }
    };

    onInteresteChange = (e) => {
      const interest = e.target.value
      this.setState({interest})
    }

    onFocusChange = ({focused}) => {
      this.setState(() => ({calendarFocused: focused}));
    };

    onPaidChange = (e) => {
      const paidStatus = e.target.value;
      this.setState(() => ({paidStatus}))
  
      if(paidStatus === "Partial Paid"){
        const initialPartialDetails = {
                                        indexId: 1,
                                        balanceUpdate: false,
                                        partialAmount: '',
                                        balance: this.state.amount,
                                        partialPaidStatus: '',
                                        updateDate: moment().valueOf(),
                                        interestAmount: '',
                                        pendingInterest: ''
                                      }
        this.setState({partialExpense: [...this.state.partialExpense, initialPartialDetails]})
        this.setState({partialAmountPay: true})
      }
    };

    addNewRow = () => {
      if (this.state.arrayLength > 0) {
        this.addOneMoreRow(this.state.partialExpense[this.state.arrayLength - 1].indexId + 1)
      }
    }

    addOneMoreRow = (id) => {
      this.setState({arrayLength: this.state.arrayLength + 1 })
      const initialPartialDetails = { 
                                      indexId: id,
                                      balanceUpdate: false,
                                      partialAmount: '',
                                      balance: this.state.partialExpense[this.state.arrayLength - 1].balance,
                                      partialPaidStatus: '',
                                      updateDate: moment().valueOf(),
                                      interestAmount: '',
                                      pendingInterest: ''
                                    }
        this.setState({partialExpense: [...this.state.partialExpense, initialPartialDetails]})
        this.setState({partialAmountPay: true})
    }

    handlepartialAmountChange = (id, event) => {
      event.preventDefault()
      
      const partialExpense = this.state.partialExpense
      const myRowIndex = partialExpense.findIndex((row) => row.indexId === id)
      partialExpense[myRowIndex].partialAmount = event.target.value
      //set Balance update status for updating balance on edit 2nd time
      if (partialExpense[myRowIndex].balanceUpdate = true){
        partialExpense[myRowIndex].balanceUpdate = false
      }

      this.setState({ partialExpense })
    }

    handleUpdateDateChange = (id, event) => {
      event.preventDefault()

      const partialExpense = this.state.partialExpense
      const myRowIndex = partialExpense.findIndex((row) => row.indexId === id)
      partialExpense[myRowIndex].updateDate = event.target.value ? event.target.value : moment().valueOf()
      const enddate = partialExpense[myRowIndex].updateDate
      
      if (this.state.interest && id === 1) {
        
        partialExpense[myRowIndex].interestAmount = 
                        (this.state.amount *
                          ((moment(enddate).diff(moment(this.state.createdAt), 'months', true))/12/1)*
                          (this.state.interest*12/100)).toFixed(0)
      } else if (this.state.interest) {
        const PrevEnddate = partialExpense[myRowIndex - 1].updateDate
        partialExpense[myRowIndex].interestAmount = 
                        (partialExpense[myRowIndex].balance *
                          ((moment(enddate).diff(moment(PrevEnddate), 'months', true))/12/1)*
                          (this.state.interest*12/100)).toFixed(0)
      }
      
      if (partialExpense[myRowIndex].balanceUpdate = true){
        partialExpense[myRowIndex].balanceUpdate = false
      }
      this.setState({ partialExpense })
    }

    onClickUpdateBalance = (id) => {
      // event.preventDefault()
      
      const partialExpense = this.state.partialExpense
      const myRowIndex = partialExpense.findIndex((row) => row.indexId === id)
      //calculate interest
      if (this.state.interest && id === 1) {
        partialExpense[myRowIndex].interestAmount = 
                        (this.state.amount *
                          ((moment().diff(moment(this.state.createdAt), 'months', true))/12/1)*
                          (this.state.interest*12/100)).toFixed(0)
      } else if (this.state.interest) {
        const PrevEnddate = partialExpense[myRowIndex - 1].updateDate
        partialExpense[myRowIndex].interestAmount = 
                        (partialExpense[myRowIndex].balance *
                          ((moment().diff(moment(PrevEnddate), 'months', true))/12/1)*
                          (this.state.interest*12/100)).toFixed(0)
      }

      // Calculate pending interest amount
      if (this.state.interest) {
          if (id === 1){
            partialExpense[myRowIndex].pendingInterest = (partialExpense[myRowIndex].partialAmount - partialExpense[myRowIndex].interestAmount).toFixed(0)
          } else if (partialExpense[myRowIndex-1].pendingInterest < 0){
                      const prevInterestCurrentInterest = partialExpense[myRowIndex].interestAmount - partialExpense[myRowIndex - 1].pendingInterest
                      partialExpense[myRowIndex].pendingInterest = (partialExpense[myRowIndex].partialAmount - prevInterestCurrentInterest).toFixed(0)
                  } else {
                    partialExpense[myRowIndex].pendingInterest = 0
                  }
      }
      //set Final Balanace
      if (myRowIndex === 0 ){
        if (this.state.interest) {
              if (partialExpense[myRowIndex].pendingInterest > 0){
                partialExpense[myRowIndex].balance = (this.state.amount - partialExpense[myRowIndex].pendingInterest).toFixed(0)
              } else {
                partialExpense[myRowIndex].balance = this.state.amount
              }
        } else {
          partialExpense[myRowIndex].balance = this.state.amount - partialExpense[myRowIndex].partialAmount
        }
      } else {
        if (this.state.interest) {
            if (partialExpense[myRowIndex].pendingInterest > 0){
              partialExpense[myRowIndex].balance = (partialExpense[myRowIndex - 1].balance - partialExpense[myRowIndex].pendingInterest).toFixed(0)
            } else {
                if (partialExpense[myRowIndex].pendingInterest === 0){
                  if(partialExpense[myRowIndex].interestAmount === 0) {
                    partialExpense[myRowIndex].balance = (partialExpense[myRowIndex - 1].balance - partialExpense[myRowIndex].partialAmount).toFixed(0)
                  } else {
                    const minusBalanceFromInterest = partialExpense[myRowIndex].partialAmount - partialExpense[myRowIndex].interestAmount
                    partialExpense[myRowIndex].balance = (partialExpense[myRowIndex - 1].balance - minusBalanceFromInterest).toFixed(0)
                  }
                } else {
                  partialExpense[myRowIndex].balance = partialExpense[myRowIndex - 1].balance
                }
            }
        } else{
          partialExpense[myRowIndex].balance = partialExpense[myRowIndex - 1].balance - partialExpense[myRowIndex].partialAmount
        }
      }

      if (partialExpense[myRowIndex].pendingInterest >= 0) {
          partialExpense[myRowIndex].pendingInterest = 0
      }
      partialExpense[myRowIndex].balanceUpdate = true
      if (partialExpense[myRowIndex].balance <= 0 ){
        this.setState({paidStatus: 'Paid'})
        partialExpense[myRowIndex].partialPaidStatus = 'Paid'
      } else {
        partialExpense[myRowIndex].partialPaidStatus = 'Partial Paid'
      }
      this.setState({ partialExpense })
    }

    onSubmit = (e) => {
      e.preventDefault(); //will not allow page refresh after submit button
      
      this.state.partialExpense.forEach(element => {
        if (element.balanceUpdate === false) {
          this.onClickUpdateBalance(element.indexId)
        }
      });
      
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
          interest: this.state.interest,
          interestAmount: '',
          createdAt: this.state.createdAt.valueOf(),
          paidStatus: this.state.paidStatus,
          partialExpense: this.state.partialExpense
        } )
      }
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
                          <th style={{fontWeight: 'bold'}}> Original Amount</th>
                          <th>Description</th>
                          <th>Mobile Number</th>
                          <th style={{fontWeight: 'bold'}}>interest</th>
                          <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="create__tbody">
                      <tr className="create__tr">
                        <td className="create__td">
                          <input 
                            disabled = {this.state.disabled}
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
                            disabled = {this.state.disabled}
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
                                Name Who borrowed.
                              </Tooltip>
                            }
                           >
                            <HelpIcon />
                          </OverlayTrigger>
                        </td>
                        <td className="create__td">
                          <input 
                            disabled = {this.state.disabled}
                            type="text"
                            placeholder="Amount"
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                          />
                        </td>
                        <td className="create__td">
                          <input 
                            disabled = {this.state.disabled}
                            type="text"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                          />
                        </td>
                        <td className="create__td">
                          <input 
                            disabled = {this.state.disabled}
                            type="text"
                            placeholder="Mobile Number"
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                            maxLength="10"
                          />
                        </td>
                        <td className="create__td">
                          <input
                              disabled = {this.state.disabled}
                              placeholder = 'In Rupees'
                              type = 'number'
                              value={this.state.interest}
                              onChange={this.onInteresteChange}
                              />
                        </td>
                        <td className="create__td">
                          <input type="date"
                            disabled = {this.state.disabled}
                            placeholder="select date" name="date" 
                            onChange={this.onDateChange}
                            value={moment(this.state.createdAt).format("YYYY-MM-DD")}
                            max={moment(this.state.createdAt).format("YYYY-MM-DD")}
                          />
                        </td>
                        {window.location.pathname.search("edit") === 1 &&
                          <td className='edit__td'> 
                            <select
                             disabled = {this.state.disabled}
                             value={this.state.paidStatus}
                             onChange={this.onPaidChange}
                            >
                              <option value="Select"> {`  `} </option>
                              <option value="Partial Paid">Partial Paid</option>
                              <option value="Paid">Paid</option>
                            </select>
                          </td>
                        }

                        {this.state.partialAmountPay &&
                          <div style={{overflowX: 'auto'}}>
                            <table className="create__partial-table">
                              <thead className="create__partial-thead">
                                  <tr className="create__partial-tr">
                                    <th>Paid Status </th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Balance</th>
                                    {this.state.interest > 0 &&
                                      <>
                                      <th>Intrest Amount </th>
                                      <th>Pending Interest </th>
                                      </>
                                    }
                                  </tr>
                              </thead>
                                <tbody className="create__partial-tbody">
                                {this.state.partialExpense.map((row) => (
                                  <tr className="create__partial-tr" key={row.indexId}>
                                    <td>
                                      <input
                                        disabled
                                        value={row.partialPaidStatus}
                                        />
                                    </td>
                                    <td >
                                      <input
                                        disabled = {row.indexId !== this.state.arrayLength && this.state.disabled}
                                        type="text"
                                        placeholder="Amount"
                                        value={row.partialAmount}
                                        onChange={(event) => this.handlepartialAmountChange(row.indexId, event)}
                                      />
                                    </td>
                                    <td >
                                      <input type="date"
                                        disabled = {row.indexId !== this.state.arrayLength && this.state.disabled}
                                        name="date" 
                                        onChange={(event) => this.handleUpdateDateChange(row.indexId, event)}
                                        value={moment(row.updateDate).format("YYYY-MM-DD")}
                                        max={moment(row.updateDate).format("YYYY-MM-DD")}
                                        className='format__updateDate'
                                      />
                                    </td>
                                    <td>
                                      {row.balanceUpdate ?
                                          <input
                                            disabled = {row.indexId !== this.state.arrayLength && this.state.disabled}
                                            type = 'number'
                                            value={row.balance}
                                            disabled
                                          />
                                        :
                                          <button
                                            disabled = {row.indexId !== this.state.arrayLength && this.state.disabled}
                                            onClick={(event) => this.onClickUpdateBalance(row.indexId, event)}> 
                                            Check Balance 
                                          </button>
                                          }
                                    </td>
                                    {this.state.interest > 0 &&
                                      <>
                                        <td>
                                          <input
                                            disabled
                                            value={row.interestAmount}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            disabled
                                            value={row.pendingInterest}
                                          />
                                        </td>
                                      </>
                                    }
                                  </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        }
                      </tr>
                      {this.state.error && <p className="errorMsg">{this.state.error}</p>}
                      {this.state.arrayLength > 0 && 
                        <input
                          className='addnewrow'
                          type='button' 
                          value='add row'
                          onClick={() => this.addNewRow()}
                        />
                      }
                    </tbody>
                   </table>
                   <div className='display_flex'>
                      <button disabled={this.state.disableEditBtn} className={this.state.disableEditBtn ? "addButton_add-disabled" : "addButton_add"}>{window.location.pathname.search("edit") === 1 ? 'Edit Entry' : 'Add Entry'}</button>
                      <NavLink to="/dashboard" ><button className='addButton_cancel'>Cancel</button></NavLink>                    
                   </div>
                </form>
            </div>
        );
    };    
};

export default ExpenseForm;