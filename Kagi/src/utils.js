const cloneDeep = require('lodash.clonedeep');

export function getData() {

    async function fetchURLs() {
        try {
            var data = await Promise.all([
                    fetch('http://206.189.216.139/indicatorData?table=xmas1&startDate=1937-01-01T12:00:27+10:00&endDate=2018-07-19T02:00:00+00:20').then(res => {
                        return res.text();
                    })
                    .then(str => {
                        const trades = [];
                        let currEntryPoint = {};
                        let currExitPoint = {};

                        JSON.parse(str.slice(10, str.length - 2),
                            function(key, value) {
                                switch (key) {
                                    case "entryText":
                                        if (value !== null) {
                                            currEntryPoint.entryText = value;
                                            if (value === "BUY") {
                                                currExitPoint.entryText = "SELL";
                                            } else if (value === "SELL") {
                                                currExitPoint.entryText = "BUY";
                                            }
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    case "exitText":
                                        delete this.key;
                                        return;
                                    case "entryTime":
                                        if (value !== null) {
                                            currEntryPoint.date = new Date(value);
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    case "entryPrice":
                                        if (value !== null) {
                                            currEntryPoint.close = value;
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    case "exitTime":
                                        if (value !== null) {
                                            currExitPoint.date = new Date(value);
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    case "exitPrice":
                                        if (value !== null) {
                                            currExitPoint.close = value;
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    case "numContracts":
                                        if (value !== null) {
                                            currEntryPoint.numContracts = value;
                                            const newEntryPoint = cloneDeep(currEntryPoint);
                                            trades.push(newEntryPoint);
                                            currExitPoint.numContracts = value;
                                        } else {
                                            delete this.key;
                                        }
                                        return value;
                                    case "pnl":
                                        if (value !== null) {
                                            currExitPoint.pnl = value;
                                            const newExitPoint = cloneDeep(currExitPoint);
                                            trades.push(newExitPoint);
                                        } else {
                                            delete this.key;
                                        }
                                        return;
                                    default:
                                        return value;
                                }
                            });
                        return trades;
                    })
                    .catch(err => {
                        console.log(err)
                    }),
                    fetch('/stocks').then(res => {
                        return res.text()
                    })
                    .then(str => JSON.parse(str,
                        function(key, value) {
                            switch (key) {
                                case "TimeStamp":
                                    this.date = new Date(value);
                                    delete this.key;
                                    return;
                                case "HighValue":
                                    this.high = value;
                                    delete this.key;
                                    return;
                                case "LowValue":
                                    this.low = value;
                                    delete this.key;
                                    return;
                                case "Open":
                                    this.open = value;
                                    delete this.key;
                                    return;
                                case "Close":
                                    this.close = value;
                                    delete this.key;
                                    return;
                                case "Volume":
                                    this.volume = value;
                                    delete this.key;
                                    return;

                                case "UnixTimeStamp":
                                    delete this.key;
                                    return;
                                case "CurrentBuyValue":
                                    delete this.key;
                                    return;
                                case "CurrentSellValue":
                                    delete this.key;
                                    return;
                                default:
                                    return value
                            }
                        }))
                    .then(stocks => stocks.Result)
                    .catch(err => {
                        console.log(err)
                    })
                ])
                .then(dataSets => {
                    for (let i = 0; i < dataSets[0].length; i++) {
                        let bs = dataSets[0][i];
                        for (let j = 0; j < dataSets[1].length; j++) {
                            let btc = dataSets[1][j];
                            if (btc.date.toString() === bs.date.toString()) {
                                btc.entryText = bs.entryText;
                                if (bs.pnl) {
                                    btc.pnl = bs.pnl;
                                }
                                btc.numContracts = bs.numContracts;
                                btc.bsClose = bs.close;
                                break;
                            }
                        }
                    }
                    return dataSets[1]
                })
        } catch (error) {
            console.log(error);
        }

        return data;

    }

    return fetchURLs();
}