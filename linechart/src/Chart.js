
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	CircleMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { ema } from "react-stockcharts/lib/indicator";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const dateFormat = timeFormat("%-m/%-d/%Y %-I:%M %p");
const numberFormat = format(".2f");

function tooltipContent(ys) {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				// {
				// 	label: "entry time",
				// 	value: currentItem.entryTime && numberFormat(currentItem.entryTime)
				// },
				// {
				// 	label: "entry price",
				// 	value: currentItem.entryPrice && numberFormat(currentItem.Price)
				// },
				// {
				// 	label: "low",
				// 	value: currentItem.low && numberFormat(currentItem.low)
				// },
				{
					label: "close",
					value: currentItem.close && numberFormat(currentItem.close)
				},
				{
					label: "numContracts",
					value: currentItem.numContracts && numberFormat(currentItem.numContracts)
				},
				{
					label: "pnl",
					value: currentItem.pnl && numberFormat(currentItem.pnl)
				}
			]
				// .concat(
				// 	ys.map(each => ({
				// 		label: each.label,
				// 		value: each.value(currentItem),
				// 		stroke: each.stroke
				// 	}))
				// )
				.filter(line => line.value)
		};
	};
}

class LineAndScatterChart extends React.Component {

	render() {
		let { data: initialData, type, width, ratio } = this.props;

		// const ema20 = ema()
		// 	.id(0)
		// 	.options({ windowSize: 20 })
		// 	.merge((d, c) => {
		// 		d.ema20 = c;
		// 	})
		// 	.accessor(d => d.ema20);

		// const ema50 = ema()
		// 	.id(2)
		// 	.options({ windowSize: 50 })
		// 	.merge((d, c) => {
		// 		d.ema50 = c;
		// 	})
		// 	.accessor(d => d.ema50);

		// const calculatedData = ema50(ema20(initialData));

		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 20])
		];

		const changeColor = (d) => d.entryText === "BUY" ? "green" : "red";

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
					type={type}
					pointsPerPxThreshold={1}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
					xScale={xScale}
					xExtents={xExtents}>
				<Chart id={1}
						yExtents={d => [d.close]}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis
						axisAt="right"
						orient="right"
						// tickInterval={5}
						// tickValues={[40, 60]}
						ticks={5}
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />
					<LineSeries
						yAccessor={d => d.close}
						stroke="black" />
					<ScatterSeries
						yAccessor={d => d.close}
						marker={CircleMarker}
						markerProps={{ r: 3, fill: changeColor }} />
					<HoverTooltip
						// yAccessor={ema50.accessor()}
						tooltipContent={tooltipContent()
						}
						fontSize={15}
					/>
					<OHLCTooltip forChart={1} origin={[-40, 0]}/>
				</Chart>

				<CrossHairCursor />
			</ChartCanvas>

		);
	}
}

LineAndScatterChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChart.defaultProps = {
	type: "svg",
};
LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;
