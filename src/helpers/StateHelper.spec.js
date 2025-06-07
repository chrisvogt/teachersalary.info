import StateHelper from './StateHelper'

describe('StateHelper', () => {
  const MOCK = {
    AZ: 'Arizona',
    CA: 'California'
  }
  let State

  beforeEach(() => {
    State = new StateHelper(MOCK)
  })

  describe('constructor', () => {
    it('initializes with the provided states data', () => {
      expect(State.states).toBe(MOCK)
    })

    it('handles empty data initialization', () => {
      const emptyState = new StateHelper({})
      expect(emptyState.states).toEqual({})
    })
  })

  describe('getName()', () => {
    it('returns the state name based on the USPS code', () => {
      const result = State.getName('AZ')
      expect(result).toEqual(MOCK.AZ)
    })

    it('returns false for an invalid state key', () => {
      const result = State.getName('FOO')
      expect(result).toBeFalsy()
    })

    it('is case sensitive for state codes', () => {
      const result = State.getName('az')
      expect(result).toBeFalsy()
    })

    it('handles null state parameter', () => {
      const result = State.getName(null)
      expect(result).toBeFalsy()
    })

    it('handles undefined state parameter', () => {
      const result = State.getName(undefined)
      expect(result).toBeFalsy()
    })
  })

  describe('getAll()', () => {
    it('returns an array of state objects', () => {
      const result = State.getAll()
      const expected = [
        {
          key: 'AZ',
          label: 'Arizona'
        }, {
          key: 'CA',
          label: 'California'
        }
      ]

      expect(result).toEqual(expect.arrayContaining(expected))
    })

    it('returns empty array for empty states object', () => {
      const emptyState = new StateHelper({})
      const result = emptyState.getAll()
      expect(result).toEqual([])
    })

    it('maintains consistent object structure', () => {
      const result = State.getAll()
      result.forEach(state => {
        expect(state).toHaveProperty('key')
        expect(state).toHaveProperty('label')
      })
    })
  })

  describe('getByKeys()', () => {
    it('returns the state name based on the USPS code', () => {
      const result = State.getByKeys(['AZ'])
      const expected = [
        {
          key: 'AZ',
          label: 'Arizona'
        }
      ]

      expect(result).toEqual(expected)
    })

    it('properly handles empty requests', () => {
      const result = State.getByKeys([])
      expect(result).toEqual([])
    })

    it('properly handles unfound states', () => {
      const result = State.getByKeys(['FOO', 'FAR'])
      expect(result).toEqual([])
    })

    it('handles mixed valid and invalid state codes', () => {
      const result = State.getByKeys(['AZ', 'FOO', 'CA'])
      const expected = [
        {
          key: 'AZ',
          label: 'Arizona'
        },
        {
          key: 'CA',
          label: 'California'
        }
      ]
      expect(result).toEqual(expect.arrayContaining(expected))
      expect(result).toHaveLength(2)
    })

    it('handles null keys array', () => {
      const result = State.getByKeys(null)
      expect(result).toEqual([])
    })

    it('handles undefined keys array', () => {
      const result = State.getByKeys(undefined)
      expect(result).toEqual([])
    })
  })
})
