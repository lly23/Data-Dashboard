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

    var workforceDef = [];

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: workforceData,
        url: workforceURL,
        async: true,
        success: function(workforceData) {
            console.log(workforceData);
            
            for (var i = 0; i < workforceData.length; i++) {
                companies.push(workforceData[i].Company);
                seriesFemale.push(workforceData[i].Female);
                seriesMale.push(workforceData[i].Male);
                seriesAsian.push(workforceData[i].Asian);
                seriesBlack.push(workforceData[i].Black);
                seriesLatino.push(workforceData[i].Latino);
                seriesWhite.push(workforceData[i].White);

                var jsonObject = {};
                jsonObject.company = workforceData[i].Company;
                jsonObject.females = workforceData[i].Female;
                jsonObject.males = workforceData[i].Male;
                jsonObject.asian = workforceData[i].Asian;
                jsonObject.black = workforceData[i].Black;
                jsonObject.latino = workforceData[i].Latino;
                jsonObject.white = workforceData[i].White;

                workforceDef.push(jsonObject);
            }
            console.log(companies);
            console.log(seriesFemale);
            console.log(seriesMale);
            console.log(seriesAsian);
            console.log(seriesBlack);
            console.log(seriesLatino);
            console.log(seriesWhite);
        }
    });

    // Highcharts.chart('workforce', {
    //     chart: {
    //         type: 'column'
    //     },
    
    //     title: {
    //         text: 'Percent of Total Workforce in the Top Tech Industries'
    //     },
    
    //     xAxis: {
    //         categories: companies
    //     },
    
    //     yAxis: {
    //         allowDecimals: false,
    //         min: 0,
    //         title: {
    //             text: 'Percentage of Employees'
    //         }
    //     },
    
    //     tooltip: {
    //         formatter: function () {
    //             return '<b>' + this.x + '</b><br/>' +
    //                 this.series.name + ': ' + this.y + '<br/>' +
    //                 'Total: ' + this.point.stackTotal;
    //         }
    //     },
    
    //     plotOptions: {
    //         column: {
    //             stacking: 'normal'
    //         }
    //     },
    
    //     series: 
    //     [{
    //         name: 'Male',
    //         data: seriesMale,
    //         stack: 'gender'
    //     }, {
    //         name: 'Female',
    //         data: seriesFemale,
    //         stack: 'gender'
    //     }, {
    //         name: 'Asian',
    //         data: seriesAsian,
    //         stack: 'race'
    //     }, {
    //         name: 'Latino',
    //         data: seriesLatino,
    //         stack: 'race'
    //     }, {
    //         name: 'Black',
    //         data: seriesBlack,
    //         stack: 'race'
    //     }, {
    //         name: 'White',
    //         data: seriesWhite,
    //         stack: 'race'
    //     }]
    // });
    



    var workforceChart = new Taucharts.Chart({
      data: workforceDef,
      type: 'horizontal-bar',
      x: 'Percentage of Employees',
      y: 'Companies',
      color: 'priority',
      plugins: [Taucharts.api.plugins.get('legend')()]
    });
    chart.renderTo('#workforce');

});