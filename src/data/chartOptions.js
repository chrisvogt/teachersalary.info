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
    },
    textAlign: 'center',
    left: 'center',
    top: 24
  },
  legend: {
    type: 'scroll',
    bottom: 24,
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
    left: '72px',
    right: '72px',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [
      '1969-70',
      '1979-80',
      '1989-90',
      '1999-2000',
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
      color: '#E0E0E3',
      interval: 0,
      rotate: 45
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
    nameLocation: 'middle',
    nameGap: 50,
    nameRotate: 90,
    nameTextStyle: {
      color: '#A0A0A3',
      align: 'center'
    },
    axisLine: {
      lineStyle: {
        color: '#707073'
      }
    },
    axisLabel: {
      color: '#E0E0E3',
      formatter: function(value) {
        return value / 1000 + 'k';
      }
    },
    splitLine: {
      lineStyle: {
        color: '#505053'
      }
    },
    interval: 5000,
    min: function(value) {
      return Math.floor(value.min / 5000) * 5000;
    },
    max: function(value) {
      return Math.ceil(value.max / 5000) * 5000;
    }
  },
  dataset: [
    {
      id: 'dataset_raw',
      source: []
    }
  ],
  series: [{
    type: 'line',
    endLabel: {
      show: true,
      formatter: function(params) {
        return params.seriesName;
      },
      animation: {
        duration: 1000,
        delay: function(idx) {
          return 2000 + idx * 100;
        }
      },
      distance: 8,
      position: 'end',
      backgroundColor: 'rgba(33, 33, 33, 0.8)',
      padding: [4, 8],
      borderRadius: 4
    },
    labelLayout: {
      moveOverlap: 'shiftY'
    },
    emphasis: {
      focus: 'series'
    },
    encode: {
      x: 'Year',
      y: 'Salary',
      label: ['State', 'Salary'],
      itemName: 'Year',
      tooltip: ['Salary']
    }
  }]
};

export default chartOptions;
