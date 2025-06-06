import React from 'react'
import { render } from '@testing-library/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PrimaryAppBar from './PrimaryAppBar'

const renderWithTheme = (ui) => {
  return render(
    <MuiThemeProvider>
      {ui}
    </MuiThemeProvider>
  )
}

describe('PrimaryAppBar', () => {
  it('renders without crashing', () => {
    const { container } = renderWithTheme(<PrimaryAppBar />)
    expect(container).toBeInTheDocument()
  })
})
