
const cloneDeep = require('lodash.clonedeep');

export function getData() {

    // const promiseMSFT = fetch('http://206.189.216.139/indicatorData?table=xmas1&startDate=1937-01-01T12:00:27+10:00&endDate=2018-07-19T02:00:00+00:20', { headers: {Accept: 'application/json'}, credentials: 'same-origin'})
    // .then(res => {
    //     return res.json()
    // })

    const promiseMSFT = fetch('http://206.189.216.139/indicatorData?table=xmas1&startDate=1937-01-01T12:00:27+10:00&endDate=2018-07-19T02:00:00+00:20')
        .then(res => {
            return res.text();
        })
        .then(str => {
            console.log(str.slice(10, str.length - 2))
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
                        case "entryTime":
                            if (value != null) {
                                this.date = new Date(value);
                                return value;
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
                                return value;
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
                            return;
                        case "pnl":
                            if (value != null) {
                                this.pnl = value
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
            console.log(trades)
            return trades;
        })
        .catch(err => {
            console.log(err);
        });
    return promiseMSFT;
}