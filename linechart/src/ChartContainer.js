import React from 'react';
import CandleStickStockScaleChart from './CandleStickStockScaleChart';
import Header from './Header';
import { Row, Col } from 'react-bootstrap';

class ChartContainer extends React.Component {
  render() {
    let chart;
    if (this.props.data == null || this.props.symbols == null) {
      chart = (
        <div className="text-center" style={{ color: 'white' }}>
          <p style={{ paddingTop: '50%', paddingBottom: '50%' }}>Loading...</p>
        </div>
      );
    } else {
      chart = (
        <CandleStickStockScaleChart type="hybrid" data={this.props.data} cursorActive={this.props.cursorActive} />
      );
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
          clearPlaceholder={this.props.clearPlaceholder}
          placeholder={this.props.placeholder}
        />
        <Row className="chartRow">
          <Col className="chartCol" xs={12} sm={12} md={12} lg={12}>
            <div style={{ backgroundColor: '#353535', position: 'relative', zIndex: 0 }}>{chart}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChartContainer;
