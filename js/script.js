$(function () {
    // WorkForce Chart
    var workforceURL = '/data/json/PercentOfTotalWorkforce.json';
    var workforceData = [];
    var companies = [];
    var seriesFemale = [];
    var seriesMale = [];
    var seriesAsian = [];
    var seriesBlack = [];
    var seriesLatino = [];
    var seriesWhite = [];

    // Women in School Chart
    var womenSchoolURL = '/data/json/HighSchoolBachelorsCompletion.json';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: workforceData,
        url: workforceURL,
        async: true,
        success: function(workforceData) {
            console.log(workforceData);
            
            for (var i = 0; i < workforceData.length; i++) {
                // High Charts
                companies.push(workforceData[i].Company);
                seriesFemale.push(workforceData[i].Female);
                seriesMale.push(workforceData[i].Male);
                seriesAsian.push(workforceData[i].Asian);
                seriesBlack.push(workforceData[i].Black);
                seriesLatino.push(workforceData[i].Latino);
                seriesWhite.push(workforceData[i].White);
            }

            Highcharts.chart('workforce', {
                chart: {
                    type: 'column'
                },
            
                title: {
                    text: 'Percent of Total Workforce in Tech Industries'
                },
            
                xAxis: {
                    categories: companies
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
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
            
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
            
                series: 
                [{
                    name: 'Male',
                    data: seriesMale,
                    stack: 'gender'
                }, {
                    name: 'Female',
                    data: seriesFemale,
                    stack: 'gender'
                }, {
                    name: 'Asian',
                    data: seriesAsian,
                    stack: 'race'
                }, {
                    name: 'Latino',
                    data: seriesLatino,
                    stack: 'race'
                }, {
                    name: 'Black',
                    data: seriesBlack,
                    stack: 'race'
                }, {
                    name: 'White',
                    data: seriesWhite,
                    stack: 'race'
                }]
            });


        } //end of success function
    });


    
});