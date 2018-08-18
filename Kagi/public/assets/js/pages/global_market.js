/* ------------------------------------------------------------------------------
 *
 *  # Echarts - candlestick and other charts
 *
 *  Candlestick and other chart configurations
 *
 *  Version: 1.0
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */

$(function () {

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: 'assets/js/plugins/visualization/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(

        // Add necessary charts
        [
          'echarts',
          'echarts/chart/line',
          'echarts/chart/bar',
          'echarts/chart/gauge',
          'echarts/theme/limitless'
        ],


        // Charts setup
        function (ec, limitless) {


            // Initialize charts
            // ------------------------------

            var tempVal = (Math.random() * (43-32) + 32).toFixed(2);
            var gauge_styling = ec.init(document.getElementById('gauge_styling'));

            gauge_styling_options = {

                 series: [{
                     name: 'LDA Sentiment Score',
                     type: 'gauge',
                     detail: {
                         formatter: '{value}%'
                     },
                     data: [{
                         value: tempVal
                     }],
                     axisLine: {
                         lineStyle: {
                             color: [
                                 [0.2, 'red'],
                                 [0.4, 'orange'],
                                 [0.8, '#6DD900'],
                                 [1, 'green']
                             ],
                             width: 15
                         }
                     },
                     axisTick: {            // 坐标轴小标记
                        length: 20,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                     axisLabel: {
                         formatter: function(v) {
                             switch (v + '') {
                                 case '10':
                                     return 'Dangerous';
                                 case '30':
                                     return 'Bearish';
                                 case '60':
                                     return 'Neutral';
                                 case '80':
                                     return 'Bullish';
                                 default:
                                     return '';
                             }
                         }
                     },

                 }]
             };
             // Add random data
             clearInterval(timeTicket2);
             var timeTicket2 = setInterval(function () {
                 gauge_styling_options.series[0].data[0].value = (Math.random() * (43-32) + 32).toFixed(2);
                 gauge_styling.setOption(gauge_styling_options, true);
             }, 5000)

             stacked_area_options = {

                 // Setup grid
                 grid: {
                     x: 40,
                     x2: 20,
                     y: 35,
                     y2: 25
                 },

                 // Add tooltip
                 tooltip: {
                     trigger: 'axis'
                 },

                 // Add legend
                 legend: {
                     data: ['Bitcoin', 'Ethereum', 'All Others']
                 },

                 // Enable drag recalculate
                 calculable: true,

                 // Add horizontal axis
                 xAxis: [{
                     type: 'category',
                     boundaryGap: false,
                     data: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday']
                 }],

                 // Add vertical axis
                 yAxis: [{
                     type: 'value'
                 }],

                 // Add series
                 series: [
                     {
                         name: 'Bitcoin',
                         type: 'line',
                         stack: 'Total',
                         itemStyle: {normal: {areaStyle: {type: 'default'}}},
                         data: [39.59, 39.89, 40.09, 40.67, 41.44, 41.90, 41.32]

                     },
                     {
                         name: 'Ethereum',
                         type: 'line',
                         stack: 'Total',
                         itemStyle: {normal: {areaStyle: {type: 'default'}}},
                         data: [18.79, 18.84, 18.96, 18.62, 18.30, 18.18, 18.03]
                     },
                     {
                         name: 'All Others',
                         type: 'line',
                         stack: 'Total',
                         itemStyle: {normal: {areaStyle: {type: 'default'}}},
                         data: [39.88,  39.89, 39.98, 40.24, 40.14, 40.54, 40.65]



                     }
                 ]
             };







            // Apply options
            // ------------------------------

            gauge_styling.setOption(gauge_styling_options);


            // Resize charts
            // ------------------------------

            window.onresize = function () {
                setTimeout(function (){
                    gauge_styling.resize();
                }, 200);
            }
        }


    );




    // Animated progress with percentage count
    // ------------------------------

    // Initialize charts
    progressPercentage('#progress_percentage_one', 46, 3, "#eee", "#EF5350", 0.33);
    progressPercentage('#progress_percentage_two', 46, 3, "#eee", "#2196F3", 0.48);
    progressPercentage('#progress_percentage_three', 46, 3, "#eee", "#008000", 0.69);
    progressPercentage('#progress_percentage_four', 46, 3, "#eee", "#E53935", 0.22);

    // Chart setup
    function progressPercentage(element, radius, border, backgroundColor, foregroundColor, end) {


        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            startPercent = 0,
            fontSize = 22,
            endPercent = end,
            twoPi = Math.PI * 2,
            formatPercent = d3.format('.0%'),
            boxSize = radius * 2;

        // Values count
        var count = Math.abs((endPercent - startPercent) / 0.01);

        // Values step
        var step = endPercent < startPercent ? -0.01 : 0.01;


        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', boxSize)
            .attr('height', boxSize)
            .append('g')
                .attr('transform', 'translate(' + radius + ',' + radius + ')');


        // Construct chart layout
        // ------------------------------

        // Arc
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border)
            .cornerRadius(20);


        //
        // Append chart elements
        //

        // Paths
        // ------------------------------

        // Background path
        svg.append('path')
            .attr('class', 'd3-progress-background')
            .attr('d', arc.endAngle(twoPi))
            .style('fill', backgroundColor);

        // Foreground path
        var foreground = svg.append('path')
            .attr('class', 'd3-progress-foreground')
            .attr('filter', 'url(#blur)')
            .style({
              'fill': foregroundColor,
              'stroke': foregroundColor
            });

        // Front path
        var front = svg.append('path')
            .attr('class', 'd3-progress-front')
            .style({
              'fill': foregroundColor,
              'fill-opacity': 1
            });


        // Text
        // ------------------------------

        // Percentage text value
        var numberText = svg
            .append('text')
                .attr('dx', 0)
                .attr('dy', (fontSize / 2) - border)
                .style({
                    'font-size': fontSize + 'px',
                    'line-height': 1,
                    'fill': foregroundColor,
                    'text-anchor': 'middle'
                });


        // Animation
        // ------------------------------

        // Animate path
        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            numberText.text(formatPercent(progress));
        }

        // Animate text
        var progress = startPercent;
        (function loops() {
            updateProgress(progress);
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
    }

});
