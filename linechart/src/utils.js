import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";


function parseData(parse) {
    return function(d) {
        d.date = parse(d.Epoch);
        d.open = +d.Open;
        d.high = +d.High;
        d.low = +d.Low;
        d.close = +d.Close;
        d.volume = +d.Volume;
        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d %H:%M:%S%Z");

export function getData(value, interval) {
    const promiseCompare = fetch("http://127.0.0.1:5000/?exchange_symbol=" + value + "&interval=" + interval)
        .then(response => response.json())
        // .then(response => response.text())
        .then(data => tsvParse(data, d => {
            d = parseData(parseDate)(d);
            return d;
        }));
    return promiseCompare;
}

export function getSymbols(exchange) {
    const symbols = fetch("http://127.0.0.1:5000/symbols/" + exchange)
        .then(response => response.json())
    return symbols;
}