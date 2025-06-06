import React from 'react'
import { render, screen } from '@testing-library/react'
import Chips from './Chips'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const renderWithTheme = (ui) => {
  return render(
    <MuiThemeProvider>
      {ui}
    </MuiThemeProvider>
  )
}

describe('Chips', () => {
  const setup = (chips = []) => {
    const props = {
      chipData: chips,
      onDeleteState: jest.fn()
    }
    return renderWithTheme(<Chips {...props} />)
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

