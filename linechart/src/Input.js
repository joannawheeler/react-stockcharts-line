
import React from "react";
import PropTypes from "prop-types";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.input});
    this.props.onValInput(this.state.input)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.input);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          <label>
            Exchange Symbol:
            <input type="text" name="name" value={this.state.input} onChange={event => this.props.onChange(event.target.value)} />
          </label>
          <label>
            Interval:
            <input type="text" name="name" value={this.state.input} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Input;