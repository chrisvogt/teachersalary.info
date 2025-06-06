import React from 'react'
import { render, screen } from '../../../test-utils'
import Chips from './Chips'

describe('Chips', () => {
  const setup = (chips = []) => {
    const props = {
      chipData: chips,
      onDeleteState: jest.fn()
    }
    return render(<Chips {...props} />)
  }

  it('renders without chips', () => {
    const { container } = setup()
    expect(container).toBeInTheDocument()
  })

  it('renders with chips', () => {
    const chips = [
      {
        key: 'CA',
        label: 'California'
      },
      {
        key: 'AZ',
        label: 'Arizona'
      }
    ]
    setup(chips)
    expect(screen.getByText('California')).toBeInTheDocument()
    expect(screen.getByText('Arizona')).toBeInTheDocument()
  })
})

