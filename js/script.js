$(function () {
    // Pie Chart
    var pieChartURL = '/data/json/BreakdownInTech.json';
    var pieChartData = [];

    Highcharts.chart('graphOne', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Other',
                y: 7.05
            }]
        }]
    });

    // Reasons for Racial and Gender Gaps Chart
    var surveyDataURL = '/data/json/GapsPew.json';
    var surveyData = [];
    var responses = [];
    var seriesAsian = [];
    var seriesBlack = [];
    var seriesHispanic = [];
    var seriesWhite = [];

    // First AJAX call for workforce data
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: surveyData,
        url: surveyDataURL,
        async: true,
        success: function(surveyData) {
            console.log(surveyData);
            
            for (var i = 0; i < surveyData.length; i++) {
                // High Charts
                responses.push(surveyData[i].Responses);
                seriesWhite.push(surveyData[i].White);
                seriesAsian.push(surveyData[i].Asian);
                seriesHispanic.push(surveyData[i].Hispanic);
                seriesBlack.push(surveyData[i].Black);
            }

            Highcharts.chart('graphTwo', {
                chart: {
                    type: 'column'
                },
            
                title: {
                    text: 'Responses to the Racial Gaps among STEM employees'
                },
            
                xAxis: {
                    categories: responses
                },
            
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Percentage of Employees'
                    }
                },
            
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:"#000";padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
            
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
            
                series: 
                [{
                    name: 'White',
                    data: seriesWhite,
                    color: '#006287'
                }, {
                    name: 'Asian',
                    data: seriesAsian,
                    color: '#AFCED8'
                }, {
                    name: 'Hispanic',
                    data: seriesHispanic
                }, {
                    name: 'Black',
                    data: seriesBlack,
                    color: '#6DA9BC'
                }]
            });
        } //end of success function
    }); //end of workforce ajax call

    //WorkForce Table
    var workforceURL = '/data/txt/AllPercentages.txt';

    $('#workforce').DataTable({
        "ajax": workforceURL,
        "columns": [
        //headings 
        {"data": "Company"},
        {"data": "Female"},
        {"data": "Male"},
        {"data": "White"},
        {"data": "Asian"},
        {"data": "Latino"},
        {"data": "Black"},
        {"data": "Multi"},
        {"data": "Other"}
        ],
        "columnDefs": [{
            targets: [ 0, 1, 2 ],
            className: 'mdl-data-table__cell--non-numeric'
        }] //close columnDefs
    });
    
});