import chartOptions from './chartOptions'

describe('chartOptions', () => {
  it('has the correct basic configuration', () => {
    expect(chartOptions).toHaveProperty('backgroundColor', '#212121')
    expect(chartOptions).toHaveProperty('animationDuration', 3000)
    expect(chartOptions).toHaveProperty('animationEasing', 'cubicInOut')
    expect(chartOptions).toHaveProperty('animationThreshold', 2000)
  })

  it('has the correct color array', () => {
    expect(chartOptions.color).toEqual([
      '#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee',
      '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF',
      '#aaeeee'
    ])
  })

  it('has the correct title configuration', () => {
    expect(chartOptions.title).toHaveProperty('text', 'Avg. salary, public elementary and secondary school teachers')
    expect(chartOptions.title.textStyle).toHaveProperty('color', '#A0A0A3')
    expect(chartOptions.title.textStyle).toHaveProperty('fontSize', '1.1em')
  })

  it('has the correct x-axis configuration', () => {
    expect(chartOptions.xAxis).toHaveProperty('type', 'category')
    expect(chartOptions.xAxis.data).toEqual([
      '1969-70',
      '1979-80',
      '1989-90',
      '1999-2000',
      '2009-10',
      '2011-12',
      '2012-13'
    ])
    expect(chartOptions.xAxis.axisLabel).toHaveProperty('rotate', 45)
  })

  it('has the correct y-axis configuration', () => {
    expect(chartOptions.yAxis).toHaveProperty('type', 'value')
    expect(chartOptions.yAxis).toHaveProperty('name', 'Estimated avg. teacher salary')
    expect(chartOptions.yAxis).toHaveProperty('interval', 5000)
    expect(chartOptions.yAxis.axisLabel.formatter).toBeInstanceOf(Function)
  })

  it('has the correct tooltip configuration', () => {
    expect(chartOptions.tooltip).toHaveProperty('trigger', 'axis')
    expect(chartOptions.tooltip).toHaveProperty('backgroundColor', 'rgba(0, 0, 0, 0.85)')
    expect(chartOptions.tooltip.formatter).toBeInstanceOf(Function)
  })

  it('has the correct series configuration', () => {
    expect(chartOptions.series[0]).toHaveProperty('type', 'line')
    expect(chartOptions.series[0].endLabel).toHaveProperty('show', true)
    expect(chartOptions.series[0].endLabel.formatter).toBeInstanceOf(Function)
  })

  it('has the correct dataset configuration', () => {
    expect(chartOptions.dataset[0]).toHaveProperty('id', 'dataset_raw')
    expect(chartOptions.dataset[0]).toHaveProperty('source')
    expect(Array.isArray(chartOptions.dataset[0].source)).toBe(true)
  })

  it('has working formatter functions', () => {
    // Test y-axis formatter
    const yAxisFormatter = chartOptions.yAxis.axisLabel.formatter
    expect(yAxisFormatter(50000)).toBe('50k')

    // Test tooltip formatter
    const tooltipFormatter = chartOptions.tooltip.formatter
    const mockParams = [{
      axisValue: '2020',
      marker: '●',
      seriesName: 'Test State',
      value: 50000
    }]
    const formattedTooltip = tooltipFormatter(mockParams)
    expect(formattedTooltip).toContain('2020')
    expect(formattedTooltip).toContain('Test State')
    expect(formattedTooltip).toContain('50000')
  })
}) 