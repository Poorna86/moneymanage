import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import Header from './header';
import { setName1Filter, setName2Filter, setPaidFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

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

  onName1Change = (e) => {
    const name1 = e.target.value
    this.props.setName1Filter(name1);
  };

  onName2Change = (e) => {
    const name2 = e.target.value
    this.props.setName2Filter(name2);
  };

  onPaidStatuschecked = (e) => {
    if (e.target.checked === true) {
      this.props.setPaidFilter('paid');
    } else {
      this.props.setPaidFilter('');
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
            className="filter__items mobile__view-input"
            type="text"
            value={this.props.filters.name1}
            placeholder="From name filter"
            onChange={this.onName1Change}
            />
            <input
            className="filter__items mobile__view-input"
            type="text"
            value={this.props.filters.name2}
            placeholder="To name filter"
            onChange={this.onName2Change}
            />
            <label className="mobile__view">Paid
               <input
                name="Paid"
                type="checkbox"
                checked={this.state.value}
                onChange={this.onPaidStatuschecked}
                />
            </label>
            <select
            className="filter__items mobile__view"
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
  setName1Filter: (name1) => dispatch(setName1Filter(name1)),
  setName2Filter: (name2) => dispatch(setName2Filter(name2)),
  setPaidFilter: (paidStatus) => dispatch(setPaidFilter(paidStatus)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);