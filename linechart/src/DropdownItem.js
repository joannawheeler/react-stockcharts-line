import React from 'react';

class DropdownItem extends React.Component {
  handleClick = e => {
    this.props.changeValue(e.currentTarget.innerHTML);
    this.props.showDropdownItems();
  };

  render() {
    return (
      <li className="dropdownItem" onClick={this.handleClick}>
        {this.props.value}
      </li>
    );
  }
}

export default DropdownItem;
