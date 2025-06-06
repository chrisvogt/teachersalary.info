import React from 'react'
import { render, screen, fireEvent } from '../../../test-utils'
import Controls from './'

describe('Controls', () => {
  const SELECTED_STATES = [
    {
      key: 'CA',
      label: 'California'
    },
    {
      key: 'AZ',
      label: 'Arizona'
    }
  ]

  const defaultProps = {
    selectedStates: SELECTED_STATES,
    onDeleteState: jest.fn(),
    onControlChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<Controls {...defaultProps} />)
    expect(container).toBeInTheDocument()
  })

  it('renders selected states as chips', () => {
    render(<Controls {...defaultProps} />)
    
    // Check if both state chips are rendered
    expect(screen.getByText('California')).toBeInTheDocument()
    expect(screen.getByText('Arizona')).toBeInTheDocument()
  })

  it('calls onDeleteState when a chip is removed', () => {
    render(<Controls {...defaultProps} />)
    
    // Find the delete icon for California chip
    const californiaChip = screen.getByText('California').closest('div')
    const deleteIcon = californiaChip.querySelector('svg')
    
    // Material-UI v0.20.2 uses onTouchTap for touch events
    // Simulate both click and touch events to ensure it works
    fireEvent.click(deleteIcon)
    fireEvent.touchStart(deleteIcon)
    fireEvent.touchEnd(deleteIcon)
    
    expect(defaultProps.onDeleteState).toHaveBeenCalledWith('CA')
  })
})
