import React from 'react';
import { Form, FormGroup, Button, Col } from 'react-bootstrap';
import Downshift from 'downshift';
import ExchangeDropdown from './ExchangeDropdown';
import IntervalDropdown from './IntervalDropdown';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: ['binance', 'gdax'],
      intervals: ['1Min', '2Min', '1Hr'],
      toggle: true,
      symbolColor: 'black'
    };
  }

  submit = event => {
    event.preventDefault();
    if (this.props.symbols.includes(this.props.value)) {
      this.props.setData();
    }
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

  handleMouseOver = () => {
    this.setState({
      symbolColor: 'white'
    });
  };

  handleMouseOut = () => {
    this.setState({
      symbolColor: 'black'
    });
  };

  render() {
    let symbolItems = [];
    return (
      <Form inline onSubmit={this.submit} className="symbolBar">
        <Col className="headerCol fixedHeight customWidthExchange" xs={3} sm={3} md={3} lg={3}>
          <FormGroup>
            <ExchangeDropdown
              exchanges={this.state.exchanges}
              exchange={this.props.exchange}
              changeExchange={this.props.changeExchange}
              clearPlaceholder={this.props.clearPlaceholder}
              placeholder={this.props.placeholder}
              handleSymbolChange={this.props.handleSymbolChange}
            />
          </FormGroup>{' '}
        </Col>

        <Col className="headerCol customWidthSymbolInput" xs={3} sm={3} md={3} lg={3}>
          <FormGroup>
            {this.props.symbols !== null ? (
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
                  selectedItem,
                  itemCount,
                  items
                }) => (
                  <div className="symbolInput" style={{ borderBottom: 'solid ' + this.state.symbolColor + ' 1.5px' }}>
                    <input
                      style={{ color: this.state.symbolColor }}
                      {...getInputProps({
                        onMouseOver: this.handleMouseOver,
                        onMouseOut: this.handleMouseOut
                      })}
                      placeholder={this.props.placeholder}
                      id="input"
                      onFocus={this.props.clearPlaceholder}
                    />
                    <ul
                      style={{
                        height: 'auto',
                        border: isOpen ? 'solid 2px #44adef' : 'none',
                        maxHeight: '150px',
                        borderRadius: '6px',
                        overflow: 'auto'
                      }}
                      {...getMenuProps({ className: 'symbolList' })}>
                      {isOpen
                        ? this.props.symbols
                            .filter((item, index) => {
                              let matches = true;
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
                                        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
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
            ) : null}
          </FormGroup>{' '}
        </Col>

        <Col className="headerCol fixedHeight customWidthInterval" xs={3} sm={3} md={3} lg={3}>
          <FormGroup controlId="formInlineIntervalInput">
            <IntervalDropdown
              intervals={this.state.intervals}
              interval={this.props.interval}
              handleIntervalChange={this.props.handleIntervalChange}
            />
          </FormGroup>{' '}
        </Col>
        <Col className="headerCol customWidthButton" xs={3} sm={3} md={3} lg={3}>
          <div className="text-center">
            <Button bsStyle="link" style={{ textDecoration: 'none' }} type="submit" className="submit">
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
