import React from 'react'
import { render, fireEvent } from '../test-utils'
import PrimaryAppBar from './PrimaryAppBar'
import META from '../data/meta'

describe('PrimaryAppBar', () => {
  beforeEach(() => {
    // Store the original window.location
    delete window.location
    window.location = { ...window.location }
  })

  afterEach(() => {
    // Restore the original window.location
    window.location = location
  })

  it('renders without crashing', () => {
    const { container } = render(<PrimaryAppBar />)
    expect(container).toBeInTheDocument()
  })

  it('navigates to repo URL when code icon is clicked', () => {
    const { getByTestId } = render(<PrimaryAppBar />)
    const codeButton = getByTestId('code-button')
    
    fireEvent.click(codeButton)
    expect(window.location).toBe(META.repoUrl)
  })
})
