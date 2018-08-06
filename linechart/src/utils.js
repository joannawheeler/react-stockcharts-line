
const cloneDeep = require('lodash.clonedeep');

export function getData() {

    const promiseMSFT = fetch('/stocks')
        .then(res => {
            return res.text();
        })
        .then(str => {
            const exitPoints = [];
            let currExitPoint = {};
            const parsedTrades = JSON.parse(str,
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
            console.log(err);
        });
    return promiseMSFT;
}