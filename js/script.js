$(function () {
    // Work Distribution Chart
    var workURL = 'BreakdownInTech.json';
    var workData = [];
    var work_categories = [];
    var techMale = [];
    var techFemale = [];
    var techWhite = [];
    var techAsian = [];
    var techHispanic = [];
    var techBlack = [];

    // AJAX call for breakdown in tech json file
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: workData,
        url: workURL,
        async: true,
        success: function(workData) {

            for (var i = 0; i < workData.length; i++) {
                work_categories.push(workData[i].Industry);
                techMale.push(workData[i].Male);
                techFemale.push(workData[i].Female);
                techWhite.push(workData[i].White);
                techAsian.push(workData[i].Asian);
                techHispanic.push(workData[i].Hispanic);
                techBlack.push(workData[i].Black);
            }

            Highcharts.chart('graphOne', {
                chart: {
                    type: 'column'
                },
            
                title: {
                    text: 'Percentage of Women, Men, and Racial Groups in the Tech Field',
                },
            
                xAxis: {
                    categories: work_categories
                },
            
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: '% of Employees out of Total Employed within each Industry'
                    }
                },
            
                tooltip: {
                    formatter: function () {
                        var currentTotal = 0;

                        // change the total amount of employees of each industry when hovering over a certain section
                        if (this.x == "Professional and Technical Services") {
                            currentTotal = '11,764';
                        } else if (this.x == "Architectural, engineering, and related services") {
                            currentTotal = '1,779';
                        } else if (this.x == "Computer systems design and related services") {
                            currentTotal = '3,057';
                        } else if (this.x == "Management, scientific, and technical consulting services") {
                            currentTotal = '1,706';
                        } else if (this.x == "Other profession, scientific, and technical services") {
                            currentTotal = '497';
                        }

                        return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '%' + '<br/>' +
                        'Total Employees in Industry: ' + currentTotal;
                    }
                },
            
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
            
                series: [{
                    name: 'Male',
                    data: techMale,
                    stack: 'gender',
                    color: '#000000'
                }, {
                    name: 'Female',
                    data: techFemale,
                    stack: 'gender',
                    color: '#A8A8A8'
                }, {
                    name: 'White',
                    data: techWhite,
                    stack: 'race',
                    color: '#007BA3'
                }, {
                    name: 'Asian',
                    data: techAsian,
                    stack: 'race',
                    color: '#C0E8F2'
                }, {
                    name: 'Hispanic',
                    data: techHispanic,
                    stack: 'race',
                    color: '#89CCFF'
                }, {
                    name: 'Black',
                    data: techBlack,
                    stack: 'race',
                    color: '#5AAABE'
                }]
            });
        } // end of success function
    }); // end of breakdown in tech ajax call
    

    // Reasons for Racial and Gender Gaps Chart
    var surveyDataURL = 'GapsPew.json';
    var surveyData = [];
    var responses = [];
    var seriesAsian = [];
    var seriesBlack = [];
    var seriesHispanic = [];
    var seriesWhite = [];

    // AJAX call for workforce data
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
                    text: 'STEM Employee Responses on Why Minorities are Less Seen in the Tech Industry'
                },
            
                xAxis: {
                    categories: responses
                },
            
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    max: 80,
                    title: {
                        text: '% of Stem Employees who Answered'
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
    var workforceURL = 'AllPercentages.txt';

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
    }); // close DataTable
    
});