/**
 * The default ECharts configuration.
 */
let chartOptions = {
  backgroundColor: '#212121',
  color: [
    '#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee',
    '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF',
    '#aaeeee'
  ],
  animationDuration: 3000,
  animationEasing: 'cubicInOut',
  animationThreshold: 2000,
  progressive: 500,
  progressiveThreshold: 3000,
  title: {
    text: 'Avg. salary, public elementary and secondary school teachers',
    textStyle: {
      color: '#A0A0A3',
      fontSize: '1.1em'
    }
  },
  legend: {
    type: 'scroll',
    bottom: 0,
    textStyle: {
      color: '#FFFFFF'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function(params) {
      let result = params[0].axisValue + '<br/>';
      params.forEach(param => {
        result += param.marker + ' ' + param.seriesName + ': $' + param.value + ' dollars<br/>';
      });
      return result;
    },
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    textStyle: {
      color: '#F0F0F0'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [
      '1969-70',
      '1979-80',
      '1989-90',
      '1990-2000',
      '2009-10',
      '2011-12',
      '2012-13'
    ],
    axisLine: {
      lineStyle: {
        color: '#707073'
      }
    },
    axisLabel: {
      color: '#E0E0E3'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#505053'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: 'Estimated avg. teacher salary',
    nameTextStyle: {
      color: '#A0A0A3'
    },
    axisLine: {
      lineStyle: {
        color: '#707073'
      }
    },
    axisLabel: {
      color: '#E0E0E3'
    },
    splitLine: {
      lineStyle: {
        color: '#505053'
      }
    }
  },
  dataset: [
    {
      id: 'dataset_raw',
      source: []
    }
  ],
  series: []
};

export default chartOptions;
