import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import Report from './'

// Mock the JSON imports
jest.mock('../../data/salaries.json', () => ({
  NY: [1, 2, 3],
  CA: [4, 5, 6],
  AZ: [7, 8, 9]
}))

jest.mock('../../data/states.json', () => ({
  NY: 'New York',
  CA: 'California',
  AZ: 'Arizona'
}))

// Mock the helpers
jest.mock('../../helpers/SalariesHelper', () => {
  const mockSalaries = {
    NY: [1, 2, 3],
    CA: [4, 5, 6],
    AZ: [7, 8, 9]
  }

  class MockSalariesHelper {
    constructor(salaries) {
      this.salaries = salaries || mockSalaries
    }

    parseSeries(series) {
      return Object.values(series)
    }

    getSeries(state) {
      if (state in this.salaries) {
        return this.parseSeries(this.salaries[state])
      }
      return false
    }
  }

  return MockSalariesHelper
})

jest.mock('../../helpers/StateHelper', () => {
  const mockStates = {
    NY: 'New York',
    CA: 'California',
    AZ: 'Arizona'
  }
  
  class MockStateHelper {
    constructor(states) {
      this.states = states || mockStates
    }

    getName(state) {
      return this.states[state] || false
    }

    getByKeys(keys) {
      if (!keys || keys.length < 1) return []
      return keys
        .filter(key => key in this.states)
        .map(key => ({
          key,
          label: this.states[key]
        }))
    }
  }

  return MockStateHelper
})

describe('Report', () => {
  it('renders without crashing', () => {
    const { container } = render(<Report />)
    expect(container).toBeInTheDocument()
  })

  it('initializes with default states', () => {
    render(<Report />)
    // Find state chips by their button role
    const buttons = screen.getAllByRole('button')
    expect(buttons.some(button => button.textContent.includes('Arizona'))).toBeTruthy()
    expect(buttons.some(button => button.textContent.includes('California'))).toBeTruthy()
    expect(buttons.some(button => button.textContent.includes('New York'))).toBeTruthy()
  })

  it('adds a new state when handleControlChange is called', () => {
    render(<Report />)
    
    // Open the select using the combobox role
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    // Select California from dropdown
    const californiaOption = screen.getByRole('option', { name: 'California' })
    fireEvent.click(californiaOption)
    
    // Verify chips are present
    expect(screen.getByRole('button', { name: /arizona/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /california/i })).toBeInTheDocument()
  })

  it('removes a state when handleDeleteState is called', () => {
    render(<Report />)
    
    // Find all chips (state buttons)
    const stateChips = screen.getAllByRole('button')
    
    // Find the specific Arizona chip and its delete button
    const arizonaChip = stateChips.find(chip => chip.textContent.includes('Arizona'))
    const deleteButton = arizonaChip.querySelector('[aria-label="delete"]') || arizonaChip.querySelector('svg')
    fireEvent.click(deleteButton)
    
    // Verify Arizona chip is removed
    expect(screen.queryByRole('button', { name: /arizona/i })).not.toBeInTheDocument()
    // Verify California chip still exists
    expect(screen.getByRole('button', { name: /california/i })).toBeInTheDocument()
  })
}) 