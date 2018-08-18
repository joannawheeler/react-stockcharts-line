/* ------------------------------------------------------------------------------
 *
 *  # Google Visualization - chart combinations
 *
 *  Google Visualization combo chart demonstration
 *
 *  Version: 1.0
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */


// Combo chart
// ------------------------------

// Initialize chart
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCombo);


// Chart settings
function drawCombo() {

    // Data
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Bitcoin', 'Altcoins', 'Average'],
        ['2017/11',  165,      938,       614.6],
        ['2017/12',  135,      1120,             682],
        ['2018/01',  157,      1167,         623],
        ['2018/02',  139,      1110,          609.4],
        ['2018/03',  136,      691,          569.6]
    ]);


    // Options
    var options_combo = {
        fontName: 'Roboto',
        height: 400,
        fontSize: 12,
        chartArea: {
            left: '5%',
            width: '90%',
            height: 350
        },
        isStacked: true,
        seriesType: "bars",
        series: {
            2: {
                type: "line",
                pointSize: 5,
                color: '#000'
            }
        },
        tooltip: {
            textStyle: {
                fontName: 'Roboto',
                fontSize: 13
            }
        },
        vAxis: {
            gridlines:{
                color: '#e5e5e5',
                count: 10
            },
            minValue: 0
        },
        legend: {
            position: 'top',
            alignment: 'center',
            textStyle: {
                fontSize: 12
            }
        }
    };

    // Draw chart
    var combo = new google.visualization.ComboChart($('#google-combo')[0]);
    combo.draw(data, options_combo);
}


// Resize chart
// ------------------------------

$(function () {

    // Resize chart on sidebar width change and window resize
    $(window).on('resize', resize);
    $(".sidebar-control").on('click', resize);

    // Resize function
    function resize() {
        drawCombo();
    }
});
