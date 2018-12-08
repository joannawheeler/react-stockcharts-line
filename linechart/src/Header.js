import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Input';

class Header extends React.Component {
  render() {
    return (
      <Row className="show-grid fixedHeight">
        <Col className="headerCol" xs={12} sm={12} md={4} lg={4}>
          <h1 className="headerSymbol">{this.props.header}</h1>
        </Col>
        <Col className="headerCol" xs={12} sm={12} md={8} lg={8}>
          <Input
            interval={this.props.interval}
            symbols={this.props.symbols}
            exchange={this.props.exchange}
            value={this.props.value}
            handleIntervalChange={this.props.handleIntervalChange}
            changeExchange={this.props.changeExchange}
            handleSymbolChange={this.props.handleSymbolChange}
            toggleCursor={this.props.toggleCursor}
            setData={this.props.setData}
            cursorActivator={this.props.cursorActivator}
          />
        </Col>
      </Row>
    );
  }
}

export default Header;
