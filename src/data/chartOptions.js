/**
 * The default Highcharts configuration.
 * @tutorial http://api.highcharts.com/highcharts
 */
let chartOptions = {
  chart: {
    type: 'spline',
    backgroundColor: '#212121',
    plotBorderColor: '#606063'
  },
  colors: [
    '#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee',
    '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF',
    '#aaeeee'
  ],
  title: {
    text: 'Avg. salary, public elementary and secondary school teachers',
    style: {
      color: '#A0A0A3',
      fontSize: '1.1em'
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    floating: false,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  xAxis: {
    categories: [
      '1969-70',
      '1979-80',
      '1989-90',
      '1990-2000',
      '2009-10',
      '2011-12',
      '2012-13'
    ],
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
  },
  exporting: {
    buttons: {
      contextButton: {
        menuItems: ['printChart']
      }
    },
    sourceWidth: 1600,
    sourceHeight: 400
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      text: 'Estimated avg. teacher salary',
      style: {
        color: '#A0A0A3'
      }
    }
  },
  tooltip: {
    shared: true,
    valuePrefix: '$',
    valueSuffix: ' dollars',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
      color: '#F0F0F0'
    }
  },
  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#505053'
      }
    }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    areaspline: {
      fillColor: false
    },
    series: {
      dataLabels: {
        color: '#B0B0B3'
      },
      marker: {
        lineColor: '#333'
      }
    },
    boxplot: {
      fillColor: '#505053'
    },
    candlestick: {
      lineColor: 'white'
    },
    errorbar: {
      color: 'white'
    }
  }
}

export default chartOptions
