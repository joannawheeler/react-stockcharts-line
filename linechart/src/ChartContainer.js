import React from 'react';
import CandleStickStockScaleChart from './CandleStickStockScaleChart';
import Header from './Header';
import { Row, Col } from 'react-bootstrap';

class ChartContainer extends React.Component {
  render() {
    let chart;
    if (this.props.data == null || this.props.symbols == null) {
      chart = <div>Loading...</div>;
    } else {
      chart = <CandleStickStockScaleChart type="svg" data={this.props.data} cursorActive={this.props.cursorActive} />;
    }

    return (
      <div>
        <Header
          header={this.props.header}
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
        <Row className="chartRow">
          <Col className="chartCol" lg={12}>
            <div style={{ backgroundColor: '#353535' }} className="wrapper">
              {chart}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChartContainer;
