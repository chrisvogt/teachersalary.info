import React from 'react'
import { render, screen, fireEvent } from '../../../test-utils'
import StateControl from './StateControl'

describe('StateControl', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<StateControl onChange={mockOnChange} />)
    expect(container).toBeInTheDocument()
  })

  it('calls onChange with the selected state', () => {
    render(<StateControl onChange={mockOnChange} />)
    
    // Open the select using the combobox role
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    // Click an option (e.g., Arizona)
    const option = screen.getByRole('option', { name: 'Arizona' })
    fireEvent.click(option)
    
    expect(mockOnChange).toHaveBeenCalledWith({
      newState: 'AZ'
    })
  })

  it('updates internal state when a value is selected', () => {
    render(<StateControl onChange={mockOnChange} />)
    
    // Open the select using the combobox role
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    // Click an option
    const option = screen.getByRole('option', { name: 'Arizona' })
    fireEvent.click(option)
    
    // Verify the select shows the selected value
    expect(screen.getByRole('combobox')).toHaveTextContent('Arizona')
  })
}) 