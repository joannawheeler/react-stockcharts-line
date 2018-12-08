import React from 'react';
import { Form, FormGroup, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import DropdownItem from './DropdownItem';

class IntervalDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownItems: false
    };
  }

  showDropdownItems = () => {
    this.setState({
      dropdownItems: !this.state.dropdownItems
    });
  };

  render() {
    const intervals = this.props.intervals;

    const defaultOption = this.props.exchange;

    const intervalsDropdown = intervals.map(interval =>
      interval === this.props.interval ? null : (
        <DropdownItem
          key={interval}
          changeExchange={this.props.handleIntervalChange}
          exchangeValue={interval}
          showDropdownItems={this.showDropdownItems}
        />
      )
    );

    return (
      <div className="exchangeDropdownContainer" onClick={this.showDropdownItems}>
        <p className="currentExchange" onClick={this.showDropdownItems}>
          {this.props.interval} &nbsp;
          <i class="fas fa-caret-down" />
        </p>
        {this.state.dropdownItems ? <ul className="exchangeList">{intervalsDropdown}</ul> : null}
      </div>
    );
  }
}

export default IntervalDropdown;
