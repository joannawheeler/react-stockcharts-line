import React from 'react';
import { render } from 'react-dom';
import CandleStickStockScaleChart from './CandleStickStockScaleChart';
import { getData, getSymbols } from './utils';
import Input from './Input';
import Header from './Header';
import ChartContainer from './ChartContainer';
import { Grid, Row, Col } from 'react-bootstrap';
import 'react-dropdown/style.css';

// import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			exchange: 'binance',
			value: 'BTCUSDT',
			interval: '1Min',
			data: null,
			symbols: null,
			header: 'BTCUSDT',
			cursorActive: true
		};
	}

	componentDidMount = () => {
		this.setData();
		this.getTheSymbols(this.state.exchange);
	};

	changeHeader = newHeader => {
		this.setState({ header: newHeader });
	};

	// handleIntervalChange = event => {
	// 	this.setState({ interval: event.target.value });
	// };

	handleIntervalChange = newInterval => {
		this.setState({
			interval: newInterval
		});
	};

	changeExchange = newExchange => {
		this.setState({
			exchange: newExchange
		});
		this.setValue('');
		this.getTheSymbols(newExchange);
	};

	setValue = value => {
		this.setState({
			value: value
		});
	};

	handleSymbolChange = event => {
		this.setState({ value: event });
	};

	getTheSymbols = exchange => {
		getSymbols(exchange)
			.then(symbols => {
				return symbols.map(symbol => {
					if (symbol.includes('binance-')) {
						return symbol.substr(8, symbol.length - 1);
					} else if (symbol.includes('gdax-')) {
						return symbol.substr(5, symbol.length - 1);
					} else {
						return alert("didn't get any symbols");
					}
				});
			})
			.then(symbols => {
				this.setState({ symbols: symbols });
			});
	};

	setData = () => {
		console.log('exchange: ' + this.state.exchange);
		console.log('value: ' + this.state.value);
		console.log('interval: ' + this.state.interval);
		let fullSymbol = this.state.exchange + '-' + this.state.value;
		getData(fullSymbol, this.state.interval).then(data => {
			this.setState({ data });
			this.setState({ header: this.state.value });
		});
	};

	cursorActivator = bool => {
		this.setState({ cursorActive: bool });
	};

	render() {
		return (
			<Grid fluid={true}>
				<ChartContainer
					value={this.state.value}
					handleIntervalChange={this.handleIntervalChange}
					changeExchange={this.changeExchange}
					handleSymbolChange={this.handleSymbolChange}
					toggleCursor={this.toggleCursor}
					setData={this.setData}
					interval={this.state.interval}
					cursorActivator={this.cursorActivator}
					symbols={this.state.symbols}
					setData={this.setData}
					getTheSymbols={this.getTheSymbols}
					exchange={this.state.exchange}
					data={this.state.data}
					header={this.state.header}
					cursorActive={this.state.cursorActive}
				/>
			</Grid>
		);
	}
}

render(<ChartComponent />, document.getElementById('root'));
