currency.addEventListener("change", function() {
    var XHR = new XMLHttpRequest();
    var currencyRates = {};
    var ARR_currencyRates =[];
    var dates = [];

    var nStartDate = parseInt(startDate.value.split("-").join(""));
    var nEndDate = parseInt(endDate.value.split("-").join(""));
    
    for (var i = nStartDate; i <= nEndDate; i++) {
        var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency.value}&date=${i}&json`
        XHR.open("GET", URI, false);
        XHR.send();
        XHR.addEventListener("readystatechange", function() {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
            var data = JSON.parse(XHR.responseText);
           currencyRates[i] = (data[0].rate);
        }
        }, false); 
    }
    for (var key in currencyRates){
        ARR_currencyRates.push(currencyRates[key].toFixed(2));
        dates.push(key);
    }
    Highcharts.chart('graph', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'exchange'
        },
        subtitle: {
            text: 'Source: bank.gov.ua'
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: 'Rate in UAH'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: currency.value,
            data: ARR_currencyRates}]
    });
}, false);


