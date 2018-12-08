import React from 'react';

class DropdownItem extends React.Component {
  handleClick = e => {
    this.props.changeExchange(e.currentTarget.innerHTML);
    this.props.showDropdownItems();
  };

  render() {
    return (
      <li className="exchangeDropdownItem exchangeValue" onClick={this.handleClick}>
        {this.props.exchangeValue}
      </li>
    );
  }
}

export default DropdownItem;
