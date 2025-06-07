import chartOptions from './chartOptions'

describe('chartOptions', () => {
  describe('basic configuration', () => {
    it('should have a title', () => {
      expect(chartOptions.title.text).toBe('Avg. salary, public elementary and secondary school teachers')
    })

    it('should have the correct background color', () => {
      expect(chartOptions.backgroundColor).toBe('#212121')
    })

    it('should have the correct color palette', () => {
      expect(chartOptions.color).toContain('#7cb5ec')
      expect(chartOptions.color).toContain('#f7a35c')
      expect(chartOptions.color).toContain('#90ee7e')
    })
  })

  describe('axes configuration', () => {
    it('should have x-axis categories', () => {
      expect(chartOptions.xAxis.data).toContain('1969-70')
      expect(chartOptions.xAxis.data).toContain('2012-13')
    })

    it('should have y-axis title', () => {
      expect(chartOptions.yAxis.name).toBe('Estimated avg. teacher salary')
    })
  })

  describe('tooltip configuration', () => {
    it('should have tooltip enabled', () => {
      expect(chartOptions.tooltip.trigger).toBe('axis')
    })

    it('should have correct tooltip styling', () => {
      expect(chartOptions.tooltip.backgroundColor).toBe('rgba(0, 0, 0, 0.85)')
      expect(chartOptions.tooltip.textStyle.color).toBe('#F0F0F0')
    })
  })

  describe('accessibility', () => {
    it('should have accessibility enabled', () => {
      expect(chartOptions.accessibility.enabled).toBe(true)
    })

    it('should have a description', () => {
      expect(chartOptions.accessibility.description).toBe(
        'Chart showing average salaries of public elementary and secondary school teachers across different states over time'
      )
    })

    describe('announceNewData formatter', () => {
      const formatter = chartOptions.accessibility.announceNewData.announcementFormatter

      it('should return false when no point is provided', () => {
        expect(formatter([], null, null)).toBe(false)
      })

      it('should format announcement for new point', () => {
        const point = {
          series: { name: 'California' },
          y: 50000,
          category: '2012-13'
        }
        expect(formatter(null, null, point)).toBe(
          'New data point added for California: 50000 dollars in 2012-13'
        )
      })
    })
  })
}) 