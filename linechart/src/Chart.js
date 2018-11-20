


import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries,
  RSISeries,
  BarSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  // EdgeIndicator,
  // CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  RSITooltip,
  OHLCTooltip
} from "react-stockcharts/lib/tooltip";
import { rsi } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickStockScaleChart extends React.Component {

  render() {

    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {d.rsi = c;})
      .accessor(d => d.rsi)
      .stroke("blue")

    const { type, data: initialData, width, ratio } = this.props;

    const calculatedData = rsiCalculator(initialData);

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData);

    // const xExtents = [
    //   xAccessor(last(data)),
    //   xAccessor(data[data.length - 100])
    // ];

      const start = xAccessor(last(data));
      const end = xAccessor(data[Math.max(0, data.length - 150)]);
      const xExtents = [start, end];

    return (
      <ChartCanvas height={700}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={'type'}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        zIndex={-1}
      >

        <Chart id={1} height={250}
          yExtents={[d => [d.high, d.low]]}
          padding={{ top: 20, bottom: 20 }}
          // margin={{bottom: 50}}
        >

          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            zIndex={-1}
            />

          <OHLCTooltip origin={[0, 0]} />

          <CandlestickSeries fill={d => d.close > d.open ? "red" : "green"} />



        </Chart>
        <Chart id={2} height={150}
          yExtents={[d => d.volume]}
          origin={(w, h) => [0, h - 400]}
          // padding={{top: 5}}
        >
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
            zIndex={-1}
            />

          <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "purple" : "pink"} />

        </Chart>
        <Chart id={3}
          yExtents={[0, 100]}
          height={125} origin={(w, h) => [0, h - 250]}
        >
          <XAxis axisAt="bottom" orient="bottom" outerTickSize={0} />
          <YAxis axisAt="right"
            orient="right"
            tickValues={[30, 50, 70]}/>

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} />

          <RSISeries yAccessor={d => d.rsi}  />

          <RSITooltip origin={[-38, 15]}
            yAccessor={d => d.rsi}
            options={rsiCalculator.options()} />
        </Chart>

        <CrossHairCursor
        />

      </ChartCanvas>
    );
  }
}

CandleStickStockScaleChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChart.defaultProps = {
  type: "svg",
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
// 	ScatterSeries,
// 	CircleMarker,
// 	LineSeries,
// } from "react-stockcharts/lib/series";
// import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import {
// 	CrossHairCursor,
// 	MouseCoordinateX,
// 	MouseCoordinateY,
// } from "react-stockcharts/lib/coordinates";

// import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
// import { fitWidth } from "react-stockcharts/lib/helper";
// import { last } from "react-stockcharts/lib/utils";

// class LineAndScatterChart extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//     	exc: '',
//     	int: ''
//     };

//     this.onChange = this.onChange.bind(this);
//     this.getData = this.getData.bind(this);
//   }

//   onChange = (exc, int) => {
//   	console.log(exc);
//   	console.log(int);
//   	this.setState({
//   		exc: exc,
//   		int: int
//   	})
//   }

//   getData = () => {
//   	//do ajax call to get new vals with this.state.exc and this.state.int
//   }

// 	render() {
// 		const { data: initialData, type, width, ratio } = this.props;
// 		const xScaleProvider = discontinuousTimeScaleProvider
// 			.inputDateAccessor(d => d.date);
// 		const { data, xScale, xAccessor, displayXAccessor } =
// 		xScaleProvider(initialData
// 		);
// 		const xExtents = [
// 			xAccessor(last(data)),
// 			xAccessor(data[data.length - 20])
// 		];
// 		const changeColor = (d) => d.entryText === "BUY" ? "green" : "red";

// 		return (
// 			<div>

// 				<ChartCanvas ratio={ratio} width={width} height={400}
// 						margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
// 						type={type}
// 						pointsPerPxThreshold={1}
// 						seriesName="MSFT"
// 						data={data}
// 						xAccessor={xAccessor}
// 						displayXAccessor={displayXAccessor}
// 						xScale={xScale}
// 						xExtents={xExtents}>
// 					<Chart id={1}
// 							yExtents={d => [d.close]}>
// 						<XAxis axisAt="bottom" orient="bottom"/>
// 						<YAxis
// 							axisAt="right"
// 							orient="right"
// 							// tickInterval={5}
// 							// tickValues={[40, 60]}
// 							ticks={5}
// 						/>
// 						<MouseCoordinateX
// 							at="bottom"
// 							orient="bottom"
// 							displayFormat={timeFormat("%Y-%m-%d")} />
// 						<MouseCoordinateY
// 							at="right"
// 							orient="right"
// 							displayFormat={format(".2f")} />
// 						<LineSeries
// 							yAccessor={d => d.close}
// 							stroke="black" />
// 						<ScatterSeries
// 							yAccessor={d => d.close}
// 							marker={CircleMarker}
// 							markerProps={{ r: 3, fill: changeColor }} />
// 						<OHLCTooltip forChart={1} origin={[-40, 0]}/>
// 					</Chart>

// 					<CrossHairCursor />
// 				</ChartCanvas>
// 			</div>
// 		);
// 	}
// }

// LineAndScatterChart.propTypes = {
// 	data: PropTypes.array.isRequired,
// 	width: PropTypes.number.isRequired,
// 	ratio: PropTypes.number.isRequired,
// 	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

// LineAndScatterChart.defaultProps = {
// 	type: "svg",
// };
// LineAndScatterChart = fitWidth(LineAndScatterChart);

// export default LineAndScatterChart;
