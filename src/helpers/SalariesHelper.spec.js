import SalariesHelper from './SalariesHelper'

const MOCK = {
  'AL': {
    '1969-70': 1,
    '1979-80': 2,
    '1989-90': 3
  },
  'AK': {
    '1969-70': 1,
    '1979-80': 2,
    '1989-90': 3
  }
}

describe('SalariesHelper', () => {
  let Salaries

  beforeEach(() => {
    Salaries = new SalariesHelper(MOCK)
  })

  describe('constructor', () => {
    it('initializes with the provided salary data', () => {
      expect(Salaries.salaries).toBe(MOCK)
    })

    it('handles empty data initialization', () => {
      const emptySalaries = new SalariesHelper({})
      expect(emptySalaries.salaries).toEqual({})
    })
  })

  describe('parseSeries()', () => {
    it('parses a salaries series object', () => {
      const result = Salaries.parseSeries(MOCK.AL)
      expect(result).toEqual(expect.arrayContaining([1, 2, 3]))
    })

    it('handles empty series object', () => {
      const result = Salaries.parseSeries({})
      expect(result).toEqual([])
    })

    it('maintains order of values based on object keys', () => {
      const result = Salaries.parseSeries(MOCK.AL)
      expect(result).toEqual([1, 2, 3])
    })
  })

  describe('getSeries()', () => {
    it('returns the data for a valid state', () => {
      const result = Salaries.getSeries('AL')
      expect(result).toEqual([1, 2, 3])
    })

    it('returns false for an invalid state', () => {
      const result = Salaries.getSeries('FOO')
      expect(result).toBeFalsy()
    })

    it('is case sensitive for state codes', () => {
      const result = Salaries.getSeries('al')
      expect(result).toBeFalsy()
    })

    it('handles null state parameter', () => {
      const result = Salaries.getSeries(null)
      expect(result).toBeFalsy()
    })

    it('handles undefined state parameter', () => {
      const result = Salaries.getSeries(undefined)
      expect(result).toBeFalsy()
    })
  })
})
