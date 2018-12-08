from flask import Flask
from flask_restful import Api, Resource
from flask_restful import reqparse
import pymarketstore as pymkts
import talib
import pandas as pd

app = Flask(__name__);
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('exchange_symbol', type=str, default='binance-BTCUSDT', help='Provide exchange_symbol')
parser.add_argument('exchange_symbols_list222')
parser.add_argument('interval', type=str, default='1Min', help='Provide interval')


class RSI(Resource):
  def get(self):
    args = parser.parse_args()
    # exchange_symbol = 'binance-BTCUSDT'
    # args['interval'] = '1Min'
    datatype = 'OHLCV'
    # query pymkts
    # allsymbols = cli.list_symbols()
    # args['exchange_symbol']
    param = pymkts.Params(args['exchange_symbol'], args['interval'], datatype, limit=100)
    cli = pymkts.Client('http://206.189.216.139:5993/rpc')
    # param = pymkts.Params(allsymbols, args['interval'], datatype, limit=100)
    reply = cli.query(param)
    data = reply.first().df()
    # close = data['Close']
    # rsi = talib.RSI(close, timeperiod=12)
# {'data' : data[0:100000].to_json(), 'rsi': rsi.to_json()[0:10000]}


    return data.to_csv(sep='\t'), 201, {'Access-Control-Allow-Origin': '*'}

    # return filtered_symbols, 201, {'Access-Control-Allow-Origin': '*'}

    # data.to_csv(sep='\t', date_format=None)

api.add_resource(RSI, '/')




# get all binance and gdax symbols
class Symbols(Resource):
    def get(self, exchange):
        args = parser.parse_args()
        # exchange_symbol = 'binance-BTCUSDT'
        # args['interval'] = '1Min'
        datatype = 'OHLCV'

        cli = pymkts.Client('http://206.189.216.139:5993/rpc')

        # query pymkts
        allsymbols = cli.list_symbols()
        filtered_symbols = list(filter(lambda i: exchange in i, allsymbols))
    # args['exchange_symbol']


        param = pymkts.Params(allsymbols, args['interval'], datatype, limit=100)

        reply = cli.query(param)
        data = reply.first().df()
        # close = data['Close']
        # rsi = talib.RSI(close, timeperiod=12)
    # {'data' : data[0:100000].to_json(), 'rsi': rsi.to_json()[0:10000]}


        # return data.to_csv(sep='\t'), 201, {'Access-Control-Allow-Origin': '*'}

        return filtered_symbols, 201, {'Access-Control-Allow-Origin': '*'}

        # data.to_csv(sep='\t', date_format=None)

api.add_resource(Symbols, '/symbols/<string:exchange>')





if __name__ == '__main__':
  app.run(debug=True)


