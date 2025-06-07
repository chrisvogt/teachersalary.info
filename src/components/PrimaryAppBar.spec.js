import React from 'react'
import { render, fireEvent } from '../test-utils'
import PrimaryAppBar from './PrimaryAppBar'
import META from '../data/meta'

// Import version from package.json
const { version } = require('../../package.json')

describe('PrimaryAppBar', () => {
  let originalLocation

  beforeEach(() => {
    // Store the original window.location
    originalLocation = window.location
    delete window.location
    window.location = { ...originalLocation }
  })

  afterEach(() => {
    // Restore the original window.location
    window.location = originalLocation
  })

  it('renders without crashing', () => {
    const { container } = render(<PrimaryAppBar />)
    expect(container).toBeInTheDocument()
  })

  it('displays the correct version number', () => {
    const { getByText } = render(<PrimaryAppBar />)
    expect(getByText(`v${version}`)).toBeInTheDocument()
  })

  it('displays the correct app title', () => {
    const { getByText } = render(<PrimaryAppBar />)
    expect(getByText(META.appTitle)).toBeInTheDocument()
  })

  it('renders with the correct background color', () => {
    const { container } = render(<PrimaryAppBar />)
    const appBar = container.querySelector('.MuiAppBar-root')
    expect(appBar).toHaveStyle({ backgroundColor: META.colors.primary })
  })

  it('navigates to repo URL when code icon is clicked', () => {
    const { getByTestId } = render(<PrimaryAppBar />)
    const codeButton = getByTestId('code-button')
    
    fireEvent.click(codeButton)
    expect(window.location).toBe(META.repoUrl)
  })

  it('renders the code icon button with correct styling', () => {
    const { getByTestId } = render(<PrimaryAppBar />)
    const codeButton = getByTestId('code-button')
    expect(codeButton).toHaveClass('MuiIconButton-root')
    expect(codeButton).toHaveClass('MuiIconButton-colorInherit')
  })
})
