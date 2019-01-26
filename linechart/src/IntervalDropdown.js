import React from 'react';
// import { Form, FormGroup, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
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

    // const defaultOption = this.props.exchange;

    const intervalsDropdown = intervals.map(interval =>
      interval === this.props.interval ? null : (
        <DropdownItem
          key={interval}
          changeValue={this.props.handleIntervalChange}
          value={interval}
          showDropdownItems={this.showDropdownItems}
          type={'interval'}
        />
      )
    );

    return (
      <div className="exchangeDropdownContainer">
        {/* the centered exchange */}
        <div className="innerDropdownContainer">
          <div className="currentExchange" onClick={this.showDropdownItems}>
            {this.props.interval} &nbsp;
            <i className="fas fa-caret-down" />
          </div>
          <ul className="exchangeList">{this.state.dropdownItems ? intervalsDropdown : null}</ul>
        </div>
      </div>
    );
  }
}

export default IntervalDropdown;
