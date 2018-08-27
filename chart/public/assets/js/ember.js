var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

    var socket = io.connect('https://socket.coincap.io');
    $(document).ready(function () {
      $('#coins-info-table').dataTable( {
          "order": [],
          "pageLength": 100,
          "dom": '<"toolbar">rtfp',
          "info": false,
          "responsive": true,
          language: {
          search: "_INPUT_",
          searchPlaceholder: "Search for Asset"
        },
        "columnDefs": [
          { "width": "100px", "targets": 3 }
        ]

      } );
      $("div.toolbar").html('');

        socket.on('trades', function (data) {

            updateMarkets(data);
        })
    });
    window.updateMarkets = function (data) {
        if (data.coin != undefined) {
            var coin = 'BTC_' + data.coin;
            var coin_data = data.msg;
            var _coinTable = $('#coins-info-table');
            var row = _coinTable.find("tr#" + coin);
            price = _coinTable.find("tr#" + coin + " .price");
            change = _coinTable.find("tr#" + coin + " .change span");
            volume = _coinTable.find("tr#" + coin + " .volume");
            capital = _coinTable.find("tr#" + coin + " .market_capital");
            supply = _coinTable.find("tr#" + coin + " .supply");
            _price = formatter.format(coin_data.price);
            previous_price = $(price).data('usd');
            _class = coin_data.cap24hrChange >= 0 ? 'increment' : 'decrement';
            if (coin_data.cap24hrChange >= 0.0) {
                $(price).html(_price).removeClass().addClass(_class + ' price').data("usd", _price);
            } else {
                $(price).html(_price).removeClass().addClass(_class + ' price').data("usd", _price);
            }
            $(volume).html(formatter.format(coin_data.volume));
            $(capital).html(formatter.format(coin_data.mktcap));
            $(supply).html(coin_data.supply);
            if (_price !== previous_price) {
                _class = previous_price < _price ? 'increment' : 'decrement';
                $(row).addClass(_class);
                setTimeout(function () {
                    $(row).removeClass('increment decrement');
                }, 300);
            }
        }
    };
