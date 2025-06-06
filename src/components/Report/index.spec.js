import React from 'react'
import { render, screen } from '@testing-library/react'
import Report from './'
import mockContext from '../../mocks/context'

describe('Report', () => {
  it('renders without crashing', () => {
    const { container } = render(<Report />, { wrapper: mockContext.Provider })
    expect(container).toBeInTheDocument()
  })

  it('displays notice when no states are selected', () => {
    render(<Report />, { wrapper: mockContext.Provider })
    
    // Since Notice component should display some text when no states are selected,
    // we can test for that text being present
    expect(screen.getByText(/select a state/i)).toBeInTheDocument()
  })
})
