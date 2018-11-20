<label>
  Exchange:
  <input type="text" value={this.state.value} onChange={this.handleChange} />
</label>



        <TypeChooser>
          {type => <Chart type={type} data={this.state.data} />}
        </TypeChooser>



const symbolsDropdown = this.state.symbols.map((symbol) =>
  <option value={symbol}>{symbol}</option>
);

import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, getSymbols } from "./utils";
import Input from './Input'

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: null,
      symbols: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.value + ' submitted')
    event.preventDefault();
  }

  componentDidMount() {
    getData().then(data => {
      // console.log(data);

      console.log("getData(): " + data);
      this.setState({ data });
    });

    getSymbols().then(symbols => {
      console.log("getSymbols(): " + symbols);
      this.setState({ symbols });
    })
  }

  render() {

    const symbols = this.props.symbols;

    const symbolsDropdown = symbols.map((symbol) =>
      <option value={symbol}>{symbol}</option>
    );

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <label>Exchange:
              <select value="binance-BTCUSDT" onChange={this.handleChange}>
              {symbolsDropdown}
              </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <TypeChooser>
          {type => <Chart type={type} data={this.state.data} />}
        </TypeChooser>
      </div>
    )
  }
}



render(
  <ChartComponent />,
  document.getElementById("root")
);

