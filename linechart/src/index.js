

import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, getSymbols } from "./utils";
// import Input from './Input';
import Downshift from 'downshift';
import { Form, FormGroup, Button, Grid, Row, Col } from 'react-bootstrap'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'




import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'BTCUSDT',
			data: null,
			symbols: null,
			exchanges: ['binance', 'gdax'],
			exchange: 'binance',
			intervals: ['1Min', '2Min', '1Hr'],
			interval: '1Min',
			toggle: true
		};

		// this.handleExchangeChange = this.handleExchangeChange.bind(this);
		this.handleSymbolChange = this.handleSymbolChange.bind(this);
		this.handleIntervalChange = this.handleIntervalChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getTheSymbols = this.getTheSymbols.bind(this);

		this.toggle = this.toggle.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.setValue = this.setValue.bind(this);

	}

	onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({exchange: option.label})
    this.setValue(option.label);
    // this.handleExchangeChange(option.label);
    this.handleSubmit(option.label)
    this.getTheSymbols(option.label);
  }

  setValue(exchange) {

  	if (exchange === 'gdax') {
  		this.setState({
  		  value: 'ETC-BTC'
  	  })
  	} else if (exchange === 'binance') {
  	  this.setState({
  		  value: 'BTCUSDT'
  	  })
  	}
  	console.log("setvalue1" + this.state.value)

  }

	toggle() {
		this.setState({
			toggle: !this.state.toggle
		})
	}

	handleSymbolChange(event) {
		this.setState({ value: event })
	}

	getTheSymbols(exchange) {
		getSymbols(exchange).then(symbols => {
			return symbols.map((symbol) => {
				if (symbol.includes("binance-")) {
					return symbol.substr(8, symbol.length - 1);
				} else if (symbol.includes("gdax-")) {
					return symbol.substr(5, symbol.length - 1);
				}
			})
		})
		.then(symbols => {
			this.setState({symbols: symbols})
			console.log(symbols)
		})
	}

	handleIntervalChange(event) {
		this.setState({ interval: event.target.value })
	}

	// handleSubmit(event) {
	handleSubmit(value) {
		console.log("submit2" + value)
		this.setValue(value)
		console.log("submit2setvaluevalue" + this.state.value)

		alert(this.state.value + ' submitted')
		// event.preventDefault();
		let fullSymbol = this.state.exchange + "-" + this.state.value;
		getData(fullSymbol, this.state.interval).then(data => {
			this.setState({ data })
		})
	}

	componentDidMount() {
		let fullSymbol = this.state.exchange + "-" + this.state.value;
		getData(fullSymbol, this.state.interval).then(data => {
			this.setState({ data });
		});
		this.getTheSymbols(this.state.exchange);
	}


	render() {

		if (this.state.data == null || this.state.symbols == null) {
			return <div>Loading...</div>
		}

		// const symbolsDropdown = this.state.symbols.map((symbol) =>
		// 	<option key={symbol} value={symbol}>{symbol}</option>
		// );

		// const exchangesDropdown = this.state.exchanges.map((exchange) =>
		// 	<option key={exchange} value={exchange}>{exchange}</option>
		// 	);

			// const exchangesDropdown = this.state.exchanges.map((exchange) =>
			// <option key={exchange} value={exchange}>{exchange}</option>
			// );


		const intervalsDropdown = this.state.intervals.map((interval) =>
			<option key={interval} value={interval}>{interval}</option>
			);

		const defaultOption = this.state.exchange;

		return (
			<div>
			<Grid>
			  <Row className="show-grid">
			    <Col xs={4} md={4}>
			      <code>{'<Col xs={12} md={8}'};</code>
			    </Col>
			    <Col xs={4} md={4}>
			      <code>{'<Col xs={6} md={4}'}</code>
			    </Col>
			    <Col xs={4} md={4}>
			      <code>{'<Col xs={6} md={4}'}</code>
			    </Col>
			  </Row>
			</Grid>



			<Grid>
			  <Row className="show-grid">
				<Form inline onSubmit={this.handleSubmit} className="symbolBar">

					<Col xs={3}>
				  <FormGroup controlId="formInlineExchangesDropdown">
					  <Dropdown options={this.state.exchanges} onChange={this.onSelect} value={defaultOption} placeholder={this.state.exchange} />
				  </FormGroup>{' '}
				  </Col>

				  <Col xs={3}>
				  <FormGroup style={{zIndex:1}} controlId="formInlineSymbolInput">
				    <Downshift
						    onChange={this.handleSymbolChange}
						    itemToString={item => (item ? item : '')}
						  >
						    {({
						      getInputProps,
						      getItemProps,
						      getLabelProps,
						      getMenuProps,
						      isOpen,
						      inputValue,
						      highlightedIndex,
						      selectedItem,
						    }) => (
						      <div className="symbolInput">

						        <input {...getInputProps({ placeholder: this.state.value })} className="symbolText" />
						        <ul {...getMenuProps()} className="symbolList">
						          {isOpen
						            ? this.state.symbols
						                .filter(item => {
						                	let matches = true;
						                	inputValue = inputValue.toUpperCase();
						                	for (var i = 0; i < inputValue.length; i++) {

						                		if (item[i] !== (inputValue[i])) {
						                			matches = false;
						                		}
						                	}
						                	if (matches === false) {
						                		return false
						                	} else {
						                		return true
						                	}
						                })
						                .map((item, index) => {
						                	if (inputValue !== "") {
							                  return <li
							                    {...getItemProps({
							                      key: item,
							                      index,
							                      item,
							                      style: {
							                        backgroundColor:
							                          highlightedIndex === index ? 'yellow' : 'black',
							                        fontWeight: selectedItem === item ? 'bold' : 'normal',
							                      },
							                    })} className="symbol"
								                  >


								                  	{item}


								                  </li>
								                } else {
								                	return null
							                }
						                })

						            : null}
						       	</ul>
						     	</div>
						   	)}
						  </Downshift>
				  </FormGroup>{' '}
				  </Col>
				  <Col xs={3}>
				  <FormGroup controlId="formInlineIntervalInput">
							<select defaultValue="1Min" onChange={this.handleIntervalChange} className="interval">
								{intervalsDropdown}
							</select>
				  </FormGroup>{' '}
				  </Col>
				  <Col xs={3}>
				  <Button id="formSubmit" type="submit" className="submit">Submit</Button>
				  </Col>
				</Form>
				</Row>
				</Grid>

				<Row>
					<Col lg={12}>
						<Chart type="hybrid" data={this.state.data} />}
					</Col>
				</Row>

			</div>
		)
	}
}


render(
	<ChartComponent />,
	document.getElementById("root")
);

