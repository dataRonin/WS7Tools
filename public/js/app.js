/**
 * Front-end core
 */
(function ($) {

    // Receive messages through websocket from server
    // The range Selector selected lets you choose the default button, I choose the 1 m
    function socket_listeners(socket) {
        socket.on('plot-data', function (data) {
            if (data) {
                var seriesCounter = 0;
                var seriesOptions = [];
                var validKeys = Object.keys(data).slice(1,data.length);
                //console.log(validKeys);
                var names = validKeys;
                //var names = ["VANMET","PRIMET","H15MET","WS7"];
                var drawChart = function () {
                    $('#container').highcharts('StockChart', {
                        rangeSelector: {
                            selected:  1
                        },

                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                                }
                            },
                            plotLines: [{
                                value: 0,
                                width: 2,
                                color: 'silver'
                            }]
                        },

                        // plotOptions: {
                        //     series: {
                        //         compare: 'percent'
                        //     }
                        // },

                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                            valueDecimals: 2
                        },

                        series: seriesOptions
                    });
                };
                $.each(names, function (i, name) {
                    var plotdata = [];
                    for (var j = 0, len=data[name].length; j < len; ++j) {
                        plotdata.push([data.TmStamp[j], data[name][j]]);
                    }
                    seriesOptions[i] = {
                        name: name,
                        data: plotdata
                    };
                    seriesCounter++;
                    if (seriesCounter === names.length) {
                        drawChart();
                    }
                });
            }
        });

        socket.on('plot-rad', function (data) {
            if (data) {
                // was testing to see what it got console.log(data.WindSpeed);
                var seriesCounter = 0;
                var seriesOptions = [];
                var names = ["SW_in_Avg", "SW_in_Max","SW_out_Avg","SW_out_Max"];
                var drawChart = function () {
                    $('#container').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 2
                        },

                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (this.value > 0 ? ' + ' : '') + this.value;
                                }
                            },
                            plotLines: [{
                                value: 0,
                                width: 2,
                                color: 'silver'
                            }]
                        },


                        plotOptions: {
                            series: {
                                compare: 'percent'
                            }
                        },

                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                            valueDecimals: 2
                        },

                        series: seriesOptions
                    });
                };
                $.each(names, function (i, name) {
                    var plotdata = [];
                    for (var j = 0, len=data[name].length; j < len; ++j) {
                        plotdata.push([data.TmStamp[j], data[name][j]]);
                    }
                    seriesOptions[i] = {
                        name: name,
                        data: plotdata
                    };
                    seriesCounter++;
                    if (seriesCounter === names.length) {
                        drawChart();
                    }
                });
            }
        });

        socket.on('plot-temps', function (data) {
            if (data) {
                // was testing to see what it got console.log(data.WindSpeed);
                var seriesCounter = 0;
                var seriesOptions = [];
                
                var names = ["RMY_ASP_Avg", "RMY_ASP_Max","RMY_ASP_Min","Cotton_Avg", "Cotton_Max", "Cotton_Min", "HJA_Sh_Avg", "HJA_Sh_Max", "HJA_Sh_Min", "HJA_Lg_Avg", "HJA_Lg_Max", "HJA_Lg_Min", "Gill_AF_Avg", "Gill_AF_Max", "Gill_AF_Min"];
                
                var drawChart = function () {
                    $('#container').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 2
                        },

                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (this.value > 0 ? ' + ' : '') + this.value;
                                }
                            },
                            plotLines: [{
                                value: 0,
                                width: 2,
                                color: 'silver'
                            }]
                        },

                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                            valueDecimals: 2
                        },

                        series: seriesOptions
                    });
                }

                $("#pick-cotton").click(function (event) {
                    event.preventDefault();
                    var names = ["RMY_ASP_Avg", "RMY_ASP_Max","RMY_ASP_Min","Cotton_Avg", "Cotton_Max", "Cotton_Min"]
                    $.each(names, function (i, name) {
                        var plotdata = [];
                        for (var j = 0, len=data[name].length; j < len; ++j) {
                            plotdata.push([data.TmStamp[j], data[name][j]]);
                        }
                        seriesOptions[i] = {
                            name: name,
                            data: plotdata
                        };
                        seriesCounter++;
                        if (seriesCounter === names.length) {
                            drawChart();
                        }
                    });
                });

                $("#pick-gill").click(function (event) {
                    event.preventDefault();
                    var names = ["RMY_ASP_Avg", "RMY_ASP_Max","RMY_ASP_Min","Gill_AF_Avg", "Gill_AF_Max", "Gill_AF_Min"]
                    $.each(names, function (i, name) {
                        var plotdata = [];
                        for (var j = 0, len=data[name].length; j < len; ++j) {
                            plotdata.push([data.TmStamp[j], data[name][j]]);
                        }
                        seriesOptions[i] = {
                            name: name,
                            data: plotdata
                        };
                        seriesCounter++;
                        if (seriesCounter === names.length) {
                            drawChart();
                        }
                    });
                });

                $("#pick-lg").click(function (event) {
                    event.preventDefault();
                    var names = ["RMY_ASP_Avg", "RMY_ASP_Max","RMY_ASP_Min","HJA_Lg_Avg", "HJA_Lg_Max", "HJA_Lg_Min"]
                    $.each(names, function (i, name) {
                        var plotdata = [];
                        for (var j = 0, len=data[name].length; j < len; ++j) {
                            plotdata.push([data.TmStamp[j], data[name][j]]);
                        }
                        seriesOptions[i] = {
                            name: name,
                            data: plotdata
                        };
                        seriesCounter++;
                        if (seriesCounter === names.length) {
                            drawChart();
                        }
                    });
                });

                $("#pick-sheltered").click(function (event) {
                    event.preventDefault();
                    var names = ["RMY_ASP_Avg", "RMY_ASP_Max","RMY_ASP_Min","HJA_Sh_Avg", "HJA_Sh_Max", "HJA_Sh_Min"]
                    $.each(names, function (i, name) {
                        var plotdata = [];
                        for (var j = 0, len=data[name].length; j < len; ++j) {
                            plotdata.push([data.TmStamp[j], data[name][j]]);
                        }
                        seriesOptions[i] = {
                            name: name,
                            data: plotdata
                        };
                        seriesCounter++;
                        if (seriesCounter === names.length) {
                            drawChart();
                        }
                    });
                });
            };
        });
    }


    // Send messages through websocket to server
    function socket_emitters(socket) {
        socket.emit('plots');

        // go to the basic temperature plot when you click temperature
        $("#pick-temps").click(function (event) {
            event.preventDefault();
            socket.emit('plots');
        });

        // return to default wind plot when you click wind
        $("#pick-wind").click(function (event) {
            event.preventDefault();
            socket.emit('wind');
        });

        // start getting temps when you click temps
        $("#pick-sw").click(function (event) {
            event.preventDefault();
            socket.emit('swin');
        });

        $("#pick-gill").click(function (event) {
            event.preventDefault();
            socket.emit('temps');
        });

        $("#pick-sheltered").click(function (event) {
            event.preventDefault();
            socket.emit('temps');
        });

        $("#pick-").click(function (event) {
            event.preventDefault();
            socket.emit('temps');
        });
    }

    /* the main function*/
    $(document).ready(function () {
        var socket_url, socket;
        
        socket_url = window.location.protocol + '//' + document.domain + ':' + location.port;
        socket = io.connect(socket_url);

        socket.on('connect', function () {
            socket_listeners(socket);
            socket_emitters(socket);            
        })
    });
//});
}(jQuery));
