import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from './Input';

class Header extends React.Component {
  render() {
    return (
      <Row className="show-grid fixedHeight">
        <Col className="headerCol customWidthLeftHeader " xs={2} sm={2} md={4} lg={4}>
          <div
            style={{
              paddingTop: '23px'
            }}>
            <div className="headerSymbol">{this.props.header}</div>
          </div>
        </Col>
        <Col className="headerCol" xs={10} sm={10} md={8} lg={8}>
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
            clearPlaceholder={this.props.clearPlaceholder}
            placeholder={this.props.placeholder}
          />
        </Col>
      </Row>
    );
  }
}

export default Header;
