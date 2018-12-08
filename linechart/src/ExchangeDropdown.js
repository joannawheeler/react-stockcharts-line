import React from 'react';
import { Form, FormGroup, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import DropdownItem from './DropdownItem';

class ExchangeDropdown extends React.Component {
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
    const exchanges = this.props.exchanges;

    const defaultOption = this.props.exchange;

    const exchangesDropdown = exchanges.map(exchange =>
      exchange === this.props.exchange ? null : (
        <DropdownItem
          key={exchange}
          changeExchange={this.props.changeExchange}
          exchangeValue={exchange}
          showDropdownItems={this.showDropdownItems}
        />
      )
    );

    return (
      <div className="exchangeDropdownContainer" onClick={this.showDropdownItems}>
        <p className="currentExchange" onClick={this.showDropdownItems}>
          {this.props.exchange} &nbsp;
          <i class="fas fa-caret-down" />
        </p>
        {this.state.dropdownItems ? <ul className="exchangeList">{exchangesDropdown}</ul> : null}
      </div>
    );
  }
}

export default ExchangeDropdown;
