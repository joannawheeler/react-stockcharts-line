import React from 'react';
import PropTypes from 'prop-types';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries, RSISeries, BarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis, Axis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  // EdgeIndicator,
  // CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { rsi } from 'react-stockcharts/lib/indicator';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

class CandleStickStockScaleChart extends React.Component {
  render() {
    // const canvasMarginTop = 50;
    const canvasMargin = { left: 80, right: 80, top: 50, bottom: 50 };

    const candleStickHeight = 200;
    const barHeight = 200;
    const rsiHeight = 100;
    const tickFontSize = 15;
    const labelFontSize = 15;
    const tickFontWeight = 250;
    const tickPadding = 20;
    const barPaddingTop = 50;
    const rsiPaddingTop = 50;
    const canvasHeight =
      canvasMargin.top +
      candleStickHeight +
      barPaddingTop +
      barHeight +
      rsiPaddingTop +
      rsiHeight +
      tickPadding +
      canvasMargin.bottom;
    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.rsi = c;
      })
      .accessor(d => d.rsi);

    const { type, data: initialData, width, ratio, cursorActive } = this.props;

    const calculatedData = rsiCalculator(initialData);

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    // const xExtents = [
    //   xAccessor(last(data)),
    //   xAccessor(data[data.length - 100])
    // ];

    const gridWidth = width - canvasMargin.left - canvasMargin.right;

    const showGrid = true;
    const gridHeight = candleStickHeight + barPaddingTop + barHeight + rsiPaddingTop + rsiHeight;
    const yGrid = showGrid
      ? {
          innerTickSize: -1 * gridWidth,
          tickStrokeDasharray: 'ShortDash2',
          tickStrokeOpacity: 0.1,
          tickStrokeWidth: 2
        }
      : {};
    const xGrid = function(gridHeight) {
      return showGrid
        ? {
            innerTickSize: -1 * gridHeight,
            tickStrokeDasharray: 'ShortDash2',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 2
          }
        : {};
    };

    const labelXCoord = 0;

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={canvasHeight}
        width={width}
        ratio={ratio}
        margin={canvasMargin}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        useCrossHairStyleCursor={cursorActive}>
        <Chart id={1} height={candleStickHeight} yExtents={[d => [d.high, d.low]]} origin={(w, h) => [0, 0]}>
          <Label
            x={labelXCoord}
            y={-10}
            fontSize={labelFontSize}
            text="Value"
            fill="white"
            fontWeight={tickFontWeight + 100}
            textAnchor="left"
          />

          <XAxis
            axisAt="bottom"
            orient="bottom"
            outerTickSize={0}
            tickLabelFill={'white'}
            showTickLabel={false}
            stroke="none"
            fontSize={tickFontSize}
            fontWeight={tickFontWeight}
            stroke="#353535"
            // tickPadding={tickPadding}
            {...xGrid(candleStickHeight)}
          />

          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickLabelFill={'white'}
            tickFormat={format('.2s')}
            fontSize={tickFontSize}
            fontWeight={tickFontWeight}
            stroke="#353535"
            tickPadding={tickPadding}
            {...yGrid}
          />

          <MouseCoordinateY at="left" orient="left" displayFormat={format('.2f')} zIndex={-1} />

          <CandlestickSeries
            fill={d => (d.close > d.open ? '#8C221B' : '#356A04')}
            stroke={'none'}
            wickStroke={d => (d.close > d.open ? '#8C221B' : '#356A04')}
            opacity={1}
          />
        </Chart>

        <Chart
          id={2}
          height={barHeight}
          yExtents={[d => d.volume]}
          origin={(w, h) => [0, candleStickHeight + barPaddingTop]}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            outerTickSize={0}
            tickLabelFill={'white'}
            showTickLabel={false}
            stroke="none"
            fontSize={tickFontSize}
            fontWeight={tickFontWeight}
            stroke="#353535"
            // tickPadding={tickPadding}
            {...xGrid(barPaddingTop + barHeight)}
          />

          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickLabelFill={'white'}
            tickFormat={format('.2s')}
            fontSize={tickFontSize}
            fontWeight={tickFontWeight}
            stroke="#353535"
            tickPadding={tickPadding}
            {...yGrid}
          />

          <MouseCoordinateY at="left" orient="left" displayFormat={format('.4s')} zIndex={-1} />
          <Label
            x={labelXCoord}
            y={candleStickHeight + barPaddingTop - 10}
            fontSize={labelFontSize}
            text="Volume"
            fill="white"
            textAnchor="left"
          />

          <BarSeries yAccessor={d => d.volume} fill={'#2B4073'} stroke={false} opacity={1} />
        </Chart>

        <Chart
          id={3}
          yExtents={[0, 100]}
          height={rsiHeight}
          origin={(w, h) => [0, candleStickHeight + barPaddingTop + 15 + barHeight + rsiPaddingTop]}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            outerTickSize={0}
            tickLabelFill={'white'}
            fontSize={tickFontSize - 2}
            fontWeight={tickFontWeight}
            stroke="#353535"
            tickPadding={tickPadding}
            {...xGrid(tickPadding * 2 + rsiHeight + rsiPaddingTop)}
          />

          <YAxis
            axisAt="right"
            orient="right"
            tickValues={[10, 30, 50, 70, 90]}
            tickLabelFill={'white'}
            fontSize={tickFontSize}
            fontWeight={tickFontWeight}
            stroke="#353535"
            tickPadding={tickPadding}
            tickFormat={format('.2s')}
            {...yGrid}
          />

          <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
          <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

          <Label
            x={labelXCoord}
            y={candleStickHeight + barPaddingTop + barHeight + rsiPaddingTop - 10}
            fontSize={labelFontSize}
            text="RSI"
            fill="white"
            textAnchor="left"
          />
          <RSISeries
            yAccessor={d => d.rsi}
            strokeDasharray={{
              line: 'Solid',
              top: 'Solid',
              middle: 'Solid',
              bottom: 'Solid'
            }}
            stroke={{
              outsideThreshold: 'white',
              insideThreshold: 'white'
            }}
            opacity={{
              top: '0',
              middle: '0',
              bottom: '0'
            }}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

CandleStickStockScaleChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
};

CandleStickStockScaleChart.defaultProps = {
  type: 'svg'
};
CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

export default CandleStickStockScaleChart;

// import React from "react";
// import PropTypes from "prop-types";
// // import Input from './Input'

// import { format } from "d3-format";
// import { timeFormat } from "d3-time-format";

// import { ChartCanvas, Chart } from "react-stockcharts";
// import {
//  ScatterSeries,
//  CircleMarker,
//  LineSeries,
// } from "react-stockcharts/lib/series";
// import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import {
//  CrossHairCursor,
//  MouseCoordinateX,
//  MouseCoordinateY,
// } from "react-stockcharts/lib/coordinates";

// import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
// import { fitWidth } from "react-stockcharts/lib/helper";
// import { last } from "react-stockcharts/lib/utils";

// class LineAndScatterChart extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//      exc: '',
//      int: ''
//     };

//     this.onChange = this.onChange.bind(this);
//     this.getData = this.getData.bind(this);
//   }

//   onChange = (exc, int) => {
//    console.log(exc);
//    console.log(int);
//    this.setState({
//      exc: exc,
//      int: int
//    })
//   }

//   getData = () => {
//    //do ajax call to get new vals with this.state.exc and this.state.int
//   }

//  render() {
//    const { data: initialData, type, width, ratio } = this.props;
//    const xScaleProvider = discontinuousTimeScaleProvider
//      .inputDateAccessor(d => d.date);
//    const { data, xScale, xAccessor, displayXAccessor } =
//    xScaleProvider(initialData
//    );
//    const xExtents = [
//      xAccessor(last(data)),
//      xAccessor(data[data.length - 20])
//    ];
//    const changeColor = (d) => d.entryText === "BUY" ? "green" : "red";

//    return (
//      <div>

//        <ChartCanvas ratio={ratio} width={width} height={400}
//            margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
//            type={type}
//            pointsPerPxThreshold={1}
//            seriesName="MSFT"
//            data={data}
//            xAccessor={xAccessor}
//            displayXAccessor={displayXAccessor}
//            xScale={xScale}
//            xExtents={xExtents}>
//          <Chart id={1}
//              yExtents={d => [d.close]}>
//            <XAxis axisAt="bottom" orient="bottom"/>
//            <YAxis
//              axisAt="right"
//              orient="right"
//              // tickInterval={5}
//              // tickValues={[40, 60]}
//              ticks={5}
//            />
//            <MouseCoordinateX
//              at="bottom"
//              orient="bottom"
//              displayFormat={timeFormat("%Y-%m-%d")} />
//            <MouseCoordinateY
//              at="right"
//              orient="right"
//              displayFormat={format(".2f")} />
//            <LineSeries
//              yAccessor={d => d.close}
//              stroke="black" />
//            <ScatterSeries
//              yAccessor={d => d.close}
//              marker={CircleMarker}
//              markerProps={{ r: 3, fill: changeColor }} />
//            <OHLCTooltip forChart={1} origin={[-40, 0]}/>
//          </Chart>

//          <CrossHairCursor />
//        </ChartCanvas>
//      </div>
//    );
//  }
// }

// LineAndScatterChart.propTypes = {
//  data: PropTypes.array.isRequired,
//  width: PropTypes.number.isRequired,
//  ratio: PropTypes.number.isRequired,
//  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

// LineAndScatterChart.defaultProps = {
//  type: "svg",
// };
// LineAndScatterChart = fitWidth(LineAndScatterChart);

// export default LineAndScatterChart;
