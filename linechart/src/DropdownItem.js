import React from 'react';

class DropdownItem extends React.Component {
  handleClick = e => {
    this.props.changeValue(e.currentTarget.innerHTML);
    this.props.showDropdownItems();
    // this.props.clearPlaceholder();
    // this.props.setValue('');
    if (this.props.type === 'exchange') {
      console.log('ph: ' + this.props.placeholder);
      console.log('v: ' + this.props.value);
      console.log('ex: ' + this.props.exchange);
      this.props.clearPlaceholder();
      this.props.handleSymbolChange('');
    }
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
