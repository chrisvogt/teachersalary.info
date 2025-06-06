import chartOptions from './chartOptions'

describe('chartOptions', () => {
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