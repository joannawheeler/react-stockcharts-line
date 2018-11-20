
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils";
import Input from './Input'

import { TypeChooser } from "react-stockcharts/lib/helper";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Exchange:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ChartComponent />

      </div>
    )
  }
}

render(
  <ChartComponent />,
  document.getElementById("root")
);