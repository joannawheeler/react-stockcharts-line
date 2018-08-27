import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
	LineSeries,
	ScatterSeries,
	CircleMarker
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import { EdgeIndicator } from "react-stockcharts/lib/coordinates";

import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { ema } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

// const dateFormat = timeFormat("%Y-%m-%d");
// const numberFormat = format(".2f");

const dateFormat = timeFormat("%-m/%-d/%Y %-I:%M %p");
const numberFormat = format(".100000");

function tooltipContent(ys) {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
									{
										label: "Contracts",
										value: currentItem.numContracts && numberFormat(currentItem.numContracts)
									},
									{
										label: "PNL",
										value: currentItem.pnl && numberFormat(currentItem.pnl)
									}
			]
				.filter(line => line.value)
		};
	};
}

const keyValues = ["high", "low"];

class CandleStickChartWithHoverTooltip extends React.Component {
	// removeRandomValues(data) {
	// 	return data.map(item => {
	// 		const newItem = { ...item };
	// 		const numberOfDeletion =
	// 			Math.floor(Math.random() * keyValues.length) + 1;
	// 		for (let i = 0; i < numberOfDeletion; i += 1) {
	// 			const randomKey =
	// 				keyValues[Math.floor(Math.random() * keyValues.length)];
	// 			newItem[randomKey] = undefined;
	// 		}
	// 		return newItem;
	// 	});
	// }

	render() {
		let { type, data: initialData, width, ratio } = this.props;

		// remove some of the data to be able to see
		// the tooltip resize
		// initialData = this.removeRandomValues(initialData);

		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {
				d.ema20 = c;
			})
			.accessor(d => d.ema20);

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d, c) => {
				d.ema50 = c;
			})
			.accessor(d => d.ema50);

		const margin = { left: 80, right: 80, top: 30, bottom: 50 };

		// const calculatedData = ema50(ema20(initialData));
		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			d => d.date
		);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			// calculatedData
			initialData
		);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		const changeColor = (d) => d.entryText === "BUY" ? "green" : "red";

		return (
			<ChartCanvas
				height={400}
				width={width}
				ratio={ratio}
				margin={margin}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart
					id={1}
					yExtents={[
						d => [d.high, d.low],
						ema20.accessor(),
						ema50.accessor()
					]}
					padding={{ top: 10, bottom: 20 }}
				>
					<XAxis axisAt="bottom" orient="bottom" />

					<YAxis axisAt="right" orient="right" ticks={5} />

					<CandlestickSeries />


					<LineSeries
						yAccessor={ema20.accessor()}
						stroke={ema20.stroke()}
					/>
					<LineSeries
						yAccessor={ema50.accessor()}
						stroke={ema50.stroke()}
					/>

					<EdgeIndicator
						itemType="last"
						orient="right"
						edgeAt="right"
						yAccessor={d => d.close}
						fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
					/>


				</Chart>
				<Chart
					id={2}
					yExtents={[d => d.bsClose]}
					height={150}
					origin={(w, h) => [0, h - 150]}
				>
					<YAxis
						axisAt="left"
						orient="left"
						ticks={5}
						tickFormat={format(".2s")}
					/>

					<ScatterSeries
						yAccessor={d => d.bsClose}
						marker={CircleMarker}
						markerProps={{ r: 8, fill: changeColor, stroke: changeColor }}
					/>
					<CurrentCoordinate yAccessor={d => d.bsClose} fill="#9B0A47" />
					<HoverTooltip

						tooltipContent={tooltipContent()}
						fontSize={15}
					/>
				</Chart>
			</ChartCanvas>
		);
	}
}

CandleStickChartWithHoverTooltip.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithHoverTooltip.defaultProps = {
	type: "svg"
};
CandleStickChartWithHoverTooltip = fitWidth(CandleStickChartWithHoverTooltip);

export default CandleStickChartWithHoverTooltip;




// import React from "react";
// import PropTypes from "prop-types";

// import { format } from "d3-format";
// import { timeFormat } from "d3-time-format";

// import { ChartCanvas, Chart } from "react-stockcharts";
// import {
// 	CandlestickSeries,
// 	ScatterSeries,
// 	CircleMarker,
// 	RSISeries
// } from "react-stockcharts/lib/series";
// import { XAxis, YAxis } from "react-stockcharts/lib/axes";

// import {
// 	CrossHairCursor,
// 	EdgeIndicator,
// 	CurrentCoordinate,
// 	MouseCoordinateX,
// 	MouseCoordinateY,
// } from "react-stockcharts/lib/coordinates";

// import {
// 	OHLCTooltip,
// 	MovingAverageTooltip,
// 	RSITooltip,
// 	SingleValueTooltip,
// } from "react-stockcharts/lib/tooltip";

// import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// import { HoverTooltip } from "react-stockcharts/lib/tooltip";
// import { fitWidth } from "react-stockcharts/lib/helper";
// import { last } from "react-stockcharts/lib/utils";
// import { ema, rsi, sma, atr } from "react-stockcharts/lib/indicator";
// const dateFormat = timeFormat("%-m/%-d/%Y %-I:%M %p");
// const numberFormat = format(".100000");

// function tooltipContent() {
// 	  		return ({ currentItem, xAccessor }) => {
// 					return {
// 								x: dateFormat(xAccessor(currentItem)),
// 								y: [
// 									{
// 										label: "Contracts",
// 										value: currentItem.numContracts && numberFormat(currentItem.numContracts)
// 									},
// 									{
// 										label: "PNL",
// 										value: currentItem.pnl && numberFormat(currentItem.pnl)
// 									}
// 								]
// 									.filter(line => {
// 										return line.value
// 									})
// 					}
// 		    }

// 	}

// // const keyValues = ["high", "low"];

// class CandleStickChartWithRSIIndicator extends React.Component {
// 	// removeRandomValues(data) {
// 	// 	return data.map(item => {
// 	// 		const newItem = { ...item };
// 	// 		const numberOfDeletion =
// 	// 			Math.floor(Math.random() * keyValues.length) + 1;
// 	// 		for (let i = 0; i < numberOfDeletion; i += 1) {
// 	// 			const randomKey =
// 	// 				keyValues[Math.floor(Math.random() * keyValues.length)];
// 	// 			newItem[randomKey] = undefined;
// 	// 		}
// 	// 		return newItem;
// 	// 	});
// 	// }

// 	render() {

// 		const ema26 = ema()
// 			.id(0)
// 			.options({ windowSize: 26 })
// 			.merge((d, c) => {d.ema26 = c;})
// 			.accessor(d => d.bsClose);


// 		let { type, data: initialData, width, ratio } = this.props;

// 		// remove some of the data to be able to see
// 		// the tooltip resize
// 		// initialData = this.removeRandomValues(initialData);



// 		const margin = { left: 80, right: 80, top: 30, bottom: 50 };

//     const calculatedData = ema26(initialData);
// 		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
// 			d => d.date
// 		);

// 		// const { data: data2, xScale: xScale2, xAccessor: xAccessorTwo, displayXAccessor: displayXAccessor2 } = xScaleProvider(
// 		// 	[
// 		// 	  {
// 		// 			bsClose: 6000,
// 		// 			close: 6050,
// 		// 			date: new Date("2018-07-14T18:00:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6366.1,
// 		// 			low: 6365.3,
// 		// 			numContracts: 10,
// 		// 			open: 6245.2,
// 		// 			volume: 1.46738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6005,
// 		// 			close: 6055,
// 		// 			date: new Date("2018-07-14T18:05:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6369.1,
// 		// 			low: 6367.3,
// 		// 			numContracts: 2,
// 		// 			open: 6248.2,
// 		// 			volume: 1.85738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6010,
// 		// 			close: 6060,
// 		// 			date: new Date("2018-07-14T18:10:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6375.1,
// 		// 			low: 6379.3,
// 		// 			numContracts: 2,
// 		// 			open: 6250.2,
// 		// 			volume: 1.50738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6020,
// 		// 			close: 6058,
// 		// 			date: new Date("2018-07-14T18:15:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6376.1,
// 		// 			low: 6375.3,
// 		// 			numContracts: 2,
// 		// 			open: 6248.2,
// 		// 			volume: 1.66738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6000,
// 		// 			close: 6050,
// 		// 			date: new Date("2018-07-14T18:20:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6366.1,
// 		// 			low: 6365.3,
// 		// 			numContracts: 2,
// 		// 			open: 6245.2,
// 		// 			volume: 1.46738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6050,
// 		// 			close: 6060,
// 		// 			date: new Date("2018-07-14T18:00:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6376.1,
// 		// 			low: 6365.3,
// 		// 			numContracts: 2,
// 		// 			open: 6230.2,
// 		// 			volume: 1.46738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 6070,
// 		// 			close: 6065,
// 		// 			date: new Date("2018-07-14T18:05:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6375.1,
// 		// 			low: 6374.3,
// 		// 			numContracts: 2,
// 		// 			open: 6250.2,
// 		// 			volume: 1.85738467
// 		// 	  },
// 		// 	  {
// 		// 			bsClose: 7000,
// 		// 			close: 6070,
// 		// 			date: new Date("2018-07-14T18:10:00"),
// 		// 			entryText: "BUY",
// 		// 			high: 6355.1,
// 		// 			low: 6335.3,
// 		// 			numContracts: 2,
// 		// 			open: 6245.2,
// 		// 			volume: 1.7738467
// 		// 	  }
// 		// 	  // {
// 		// 			// bsClose: 6009,
// 		// 			// close: 6058,
// 		// 			// date: new Date("2018-07-14T18:15:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6376.1,
// 		// 			// low: 6375.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.66738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:20:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:00:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6005,
// 		// 			// close: 6055,
// 		// 			// date: new Date("2018-07-14T18:05:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6369.1,
// 		// 			// low: 6367.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.85738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:10:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6009,
// 		// 			// close: 6058,
// 		// 			// date: new Date("2018-07-14T18:15:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6376.1,
// 		// 			// low: 6375.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.66738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:20:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:00:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6005,
// 		// 			// close: 6055,
// 		// 			// date: new Date("2018-07-14T18:05:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6369.1,
// 		// 			// low: 6367.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.85738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:10:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6009,
// 		// 			// close: 6058,
// 		// 			// date: new Date("2018-07-14T18:15:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6376.1,
// 		// 			// low: 6375.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.66738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:20:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:00:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6005,
// 		// 			// close: 6055,
// 		// 			// date: new Date("2018-07-14T18:05:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6369.1,
// 		// 			// low: 6367.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.85738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:10:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6009,
// 		// 			// close: 6058,
// 		// 			// date: new Date("2018-07-14T18:15:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6376.1,
// 		// 			// low: 6375.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6248.2,
// 		// 			// volume: 1.66738467
// 		// 	  // },
// 		// 	  // {
// 		// 			// bsClose: 6000,
// 		// 			// close: 6050,
// 		// 			// date: new Date("2018-07-14T18:20:00"),
// 		// 			// entryText: "BUY",
// 		// 			// high: 6366.1,
// 		// 			// low: 6365.3,
// 		// 			// numContracts: 2,
// 		// 			// open: 6245.2,
// 		// 			// volume: 1.46738467
// 		// 	  // }
// 		// 	]
// 		// );

// 		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
// 			calculatedData
// 		);

// 		const start = xAccessor(last(data));
// 		const end = xAccessor(data[Math.max(0, data.length - 150)]);
// 		const xExtents = [start, end];

// 		// const start2 = xAccessorTwo(last(data2));
// 		// const end2 = xAccessorTwo(data2[Math.max(0, data2.length - 150)]);
// 		// const xExtents2 = [start2, end2];

// 		const changeColor = (d) => d.entryText === "BUY" ? "green" : "red";

// 		return (
// 			<ChartCanvas
// 				height={400}
// 				width={width}
// 				ratio={ratio}
// 				margin={margin}
// 				type={type}
// 				seriesName="MSFT"
// 				data={data}
// 				xScale={xScale}
// 				xAccessor={xAccessor}
// 				displayXAccessor={displayXAccessor}
// 				xExtents={xExtents}
// 			>
// 				<Chart
// 					id={1}
// 					yExtents={[
// 						d => [d.high, d.low]
// 					]}
// 					padding={{ top: 10, bottom: 20 }}
// 				>
// 					<XAxis axisAt="bottom" orient="bottom" />

// 					<YAxis axisAt="right" orient="right" ticks={5} />

// 					<CandlestickSeries />

// 					<ScatterSeries
// 					  stroke={ema26.stroke("red")}
// 						yAccessor={d => d.bsClose}
// 						marker={CircleMarker}
// 						markerProps={{ r: 4, fill: changeColor }}
// 					/>


// 				</Chart>

// 			</ChartCanvas>
// 		);
// 	}
// }

// CandleStickChartWithHoverTooltip.propTypes = {
// 	data: PropTypes.array.isRequired,
// 	width: PropTypes.number.isRequired,
// 	ratio: PropTypes.number.isRequired,
// 	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
// };

// CandleStickChartWithHoverTooltip.defaultProps = {
// 	type: "svg"
// };
// CandleStickChartWithHoverTooltip = fitWidth(CandleStickChartWithHoverTooltip);

// export default CandleStickChartWithHoverTooltip;
