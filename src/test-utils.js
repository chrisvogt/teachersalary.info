import React from 'react'
import { render } from '@testing-library/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const defaultTheme = getMuiTheme()

const AllTheProviders = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={defaultTheme}>
      {children}
    </MuiThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render } 