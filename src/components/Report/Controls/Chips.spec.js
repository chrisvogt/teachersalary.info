import React from 'react'
import { render, screen, fireEvent } from '../../../test-utils'
import Chips from './Chips'

describe('Chips', () => {
  const setup = (chips = []) => {
    const props = {
      chipData: chips,
      onDeleteState: jest.fn()
    }
    return { ...render(<Chips {...props} />), props }
  }

  it('renders without chips', () => {
    const { container } = setup()
    expect(container).toBeInTheDocument()
  })

  it('renders with null chipData', () => {
    const { container } = setup(null)
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

  it('calls onDeleteState when chip is clicked', () => {
    const chips = [
      {
        key: 'CA',
        label: 'California'
      }
    ]
    const { props } = setup(chips)
    const chip = screen.getByText('California')
    fireEvent.click(chip)
    expect(props.onDeleteState).toHaveBeenCalledWith('CA')
  })

  it('calls onDeleteState when delete icon is clicked', () => {
    const chips = [
      {
        key: 'CA',
        label: 'California'
      }
    ]
    const { props } = setup(chips)
    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)
    expect(props.onDeleteState).toHaveBeenCalledWith('CA')
  })
})

