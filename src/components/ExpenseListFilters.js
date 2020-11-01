import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import Header from './header';
import { setNameFilter, setPaidFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onNameChange = (e) => {
    this.props.setNameFilter(e.target.value);
  };

  onPaidStatusChange = (e) => {
    if (e.target.value === 'paid') {
      this.props.setPaidFilter(e.target.value);
    }
  }

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } 
  };
  render() {
    return (
      <div>
        <Header />
        <h2 className='title' >Money Managment summary</h2>
        <form className='filters'>
            <input
            className='filter__items'
            type="text"
            value={this.props.filters.name}
            placeholder="Enter name filter"
            onChange={this.onNameChange}
            />
            <select
              className='filter_items'
              value={this.props.filters.paidStatus}
              onChange={this.onPaidStatusChange}
            >
              <option value="select">Select</option>
              <option value="paid">Paid</option>
            </select>
            <select
            className='filter__items'
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
            >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            </select>
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            />
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setNameFilter: (name) => dispatch(setNameFilter(name)),
  setPaidFilter: (paidStatus) => dispatch(setPaidFilter(paidStatus)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);