import React from 'react';
// import { Form, FormGroup, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
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
    const exchangesDropdown = exchanges.map(exchange =>
      exchange === this.props.exchange ? null : (
        <DropdownItem
          key={exchange}
          changeValue={this.props.changeExchange}
          value={exchange}
          showDropdownItems={this.showDropdownItems}
          type={'exchange'}
        />
      )
    );

    return (
      <div className="exchangeDropdownContainer">
        <div className="innerDropdownContainer">
          <div className="currentExchange" onClick={this.showDropdownItems}>
            {this.props.exchange} &nbsp;
            <i className="fas fa-caret-down" />
          </div>
          <ul className="exchangeList">{this.state.dropdownItems ? exchangesDropdown : null}</ul>
        </div>
      </div>
    );
  }
}

export default ExchangeDropdown;
