
const cloneDeep = require('lodash.clonedeep');

export function getData() {

    const table = 'xmas1';
    const startDate ='1937-01-01T12:00:27+10:00';
    const endDate = '2018-07-19T02:00:00+00:20';

    const promiseMSFT = fetch('http://206.189.216.139/indicatorData?table=' + table + '&startDate=' + startDate + '&endDate=' + endDate)
        .then(res => {
            return res.text();
        })
        .then(str => {
            const exitPoints = [];
            let currExitPoint = {};
            const parsedTrades = JSON.parse(str.slice(10, str.length - 2),
                function(key, value) {
                    switch (key) {
                        case "entryText":
                            if (value != null) {
                                if (value === "BUY") {
                                    currExitPoint.entryText = "SELL";
                                } else if (value === "SELL") {
                                    currExitPoint.entryText = "BUY";
                                }
                            } else {
                                delete this.key;
                            }
                            return value;
                        case "exitText":
                            delete this.key;
                            return;
                        case "entryTime":
                            if (value != null) {
                                this.date = new Date(value);
                            } else {
                                delete this.key;
                            }
                            return;
                        case "entryPrice":
                            if (value != null) {
                                this.close = value;
                            } else {
                                delete this.key;
                            }
                            return;
                        case "exitTime":
                            if (value != null) {
                                currExitPoint.date = new Date(value);
                            } else {
                                delete this.key;
                            }
                            return;
                        case "exitPrice":
                            if (value != null) {
                                currExitPoint.close = value;
                            } else {
                                delete this.key;
                            }
                            return;
                        case "numContracts":
                            if (value != null) {
                                this.numContracts = value;
                                currExitPoint.numContracts = value;
                            } else {
                                delete this.key;
                            }
                            return value;
                        case "pnl":
                            if (value != null) {
                                currExitPoint.pnl = value;
                                const newExitPoint = cloneDeep(currExitPoint);
                                exitPoints.push(newExitPoint);
                            } else {
                                delete this.key;
                            }
                            return;
                        default:
                            return value;
                    }
                });
            const trades = parsedTrades.concat(exitPoints);
            return trades;
        })
        .catch(err => {
        });
    return promiseMSFT;
}