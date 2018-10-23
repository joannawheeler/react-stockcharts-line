import { tsvParse, csvParse, tsvParseRows, tsvParseColumns } from "d3-dsv";
import { timeParse } from "d3-time-format";

const cloneDeep = require('lodash.clonedeep');


function parseData(parse) {
    return function(d) {
        d.date = parse(d.Epoch),
            d.open = d.Open,
            d.high = d.High,
            d.low = d.Low,
            d.close = d.Close,
            d.volume = d.Volume
        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d %H:%M:%S%Z");

export function getData() {

    const promiseMSFT = fetch('http://127.0.0.1:5000/?exchange_symbol=binance-BTCUSDT&interval=1Min')
        .then(res => res.text())
        .then(data => tsvParse(data, d => {
            // d = parseData(parseDate)(d);
            return d;
        }))
        .catch(err => {
            console.log(err);
        });
    return promiseMSFT;
}



// .then(res => {
//     res = res['data']
//     return res;
// })
// .then(res => {
//     return res.body
// })
// .then(res => {
//     return res.text();
// })
// .then(str => {
//     const exitPoints = [];
//     let currExitPoint = {};
//     const parsedTrades = JSON.parse(str,
//         function(key, value) {
//             switch (key) {
//                 case "entryText":
//                     if (value != null) {
//                         if (value === "BUY") {
//                             currExitPoint.entryText = "SELL";
//                         } else if (value === "SELL") {
//                             currExitPoint.entryText = "BUY";
//                         }
//                     } else {
//                         delete this.key;
//                     }
//                     return value;
//                 case "entryTime":
//                     if (value != null) {
//                         this.date = new Date(value);
//                         return value;
//                     } else {
//                         delete this.key;
//                     }
//                     return;
//                 case "entryPrice":
//                     if (value != null) {
//                         this.close = value;
//                     } else {
//                         delete this.key;
//                     }
//                     return;
//                 case "exitTime":
//                     if (value != null) {
//                         currExitPoint.date = new Date(value);
//                         return value;
//                     } else {
//                         delete this.key;
//                     }
//                     return;
//                 case "exitPrice":
//                     if (value != null) {
//                         currExitPoint.close = value;
//                         const newExitPoint = cloneDeep(currExitPoint);
//                         exitPoints.push(newExitPoint);
//                     } else {
//                         delete this.key;
//                     }
//                     return;
//                 default:
//                     return value;
//             }
//         });
//     const trades = parsedTrades.concat(exitPoints);
//     return trades;
// })
//         .catch(err => {
//             console.log(err);
//         });
//     return promiseMSFT;
// }