import React from 'react';
import { Form, FormGroup, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import Downshift from 'downshift';
import ExchangeDropdown from './ExchangeDropdown';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: ['binance', 'gdax'],
      intervals: ['1Min', '2Min', '1Hr'],
      toggle: true,
      inputValue: ''
    };
  }

  submit = event => {
    event.preventDefault();
    this.props.setData();
  };

  filterSuggestions = inputValue => {
    const filteredItems = this.props.symbols.filter(symbol => {
      let matches = true;
      inputValue = inputValue.toUpperCase();
      for (var i = 0; i < inputValue.length; i++) {
        if (symbol[i] !== inputValue[i]) {
          matches = false;
        }
      }
      if (matches === false) {
        return false;
      } else {
        return true;
      }
    });
    return filteredItems.length;
  };

  toggleCursor = text => {
    const dropdownItemCount = this.filterSuggestions(text);
    if (dropdownItemCount === 0 || dropdownItemCount === this.props.symbols.length || dropdownItemCount === undefined) {
      this.props.cursorActivator(true);
    } else {
      if (this.props.cursorActive !== false) {
        this.props.cursorActivator(false);
      }
    }
  };

  render() {
    const intervalsDropdown = this.state.intervals.map(interval => (
      <option key={interval} value={interval}>
        {interval}
      </option>
    ));

    return (
      <Form inline onSubmit={this.submit} className="symbolBar">
        <Col className="headerCol fixedHeight" xs={6} sm={3} md={3} lg={3}>
          <FormGroup controlId="formInlineExchangesDropdown">
            <ExchangeDropdown
              exchanges={this.state.exchanges}
              exchange={this.props.exchange}
              changeExchange={this.props.changeExchange}
              // bsStyle="exchangesDropdown"
              // options={this.state.exchanges}
              // onChange={this.props.changeExchange}
              // value={defaultOption}
              // placeholder={this.props.exchange}
            />
          </FormGroup>{' '}
        </Col>

        <Col className="headerCol" xs={6} sm={3} md={3} lg={3}>
          <FormGroup controlId="formInlineSymbolInput">
            <Downshift
              onInputValueChange={this.toggleCursor}
              //this.props.value gets set to the item selected from the dropdown ie GNTBNB onChange
              onChange={this.props.handleSymbolChange}
              itemToString={item => (item ? item : '')}>
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
              }) => (
                <div className="symbolInput">
                  <input
                    {...getInputProps({
                      placeholder: this.props.value
                    })}
                    id="input"
                  />
                  <ul {...getMenuProps({ className: 'symbolList' })}>
                    {isOpen
                      ? this.props.symbols
                          .filter(item => {
                            let matches = true;
                            debugger;
                            inputValue = inputValue.toUpperCase();
                            for (var i = 0; i < inputValue.length; i++) {
                              if (item[i] !== inputValue[i]) {
                                matches = false;
                              }
                            }
                            if (matches === false) {
                              return false;
                            } else {
                              return true;
                            }
                          })
                          .map((item, index) => {
                            if (inputValue !== '') {
                              return (
                                <li
                                  {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    style: {
                                      backgroundColor: highlightedIndex === index ? 'lightgray' : '#44adef',
                                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                                      opacity: 1
                                    }
                                  })}
                                  className="symbol"
                                  id="symbol">
                                  {item}
                                </li>
                              );
                            } else {
                              return null;
                            }
                          })
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          </FormGroup>{' '}
        </Col>
        <Col className="headerCol" xs={12} sm={3} md={3} lg={3}>
          <FormGroup controlId="formInlineIntervalInput">
            <select defaultValue="1Min" onChange={this.props.handleIntervalChange} className="interval">
              {intervalsDropdown}
            </select>
          </FormGroup>{' '}
        </Col>
        <Col className="headerCol" xs={12} sm={3} md={3} lg={3}>
          <div className="text-center">
            <Button bsClass="submit" type="submit">
              Update
            </Button>
          </div>
        </Col>
      </Form>
    );
  }
}

// CandleStickStockScaleChart.propTypes = {
//   data: PropTypes.array.isRequired,
//   width: PropTypes.number.isRequired,
//   ratio: PropTypes.number.isRequired,
//   type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

// CandleStickStockScaleChart.defaultProps = {
//   type: "svg",
// };
// CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);
export default Input;
