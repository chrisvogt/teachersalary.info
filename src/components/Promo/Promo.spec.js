import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import Promo from './'
import META from '../../data/meta'

const PROPS = {
  callToAction: 'Veritas vos liberabit',
  ctaButtonText: 'Ex Scientia Tridens'
}

describe('Promo', () => {
  beforeEach(() => {
    // Store the original window.location
    delete window.location
    window.location = { ...window.location }
  })

  afterEach(() => {
    window.location = window.location
  })

  it('renders without crashing', () => {
    const { container } = render(<Promo {...PROPS} />)
    expect(container).toBeInTheDocument()
  })

  it('renders the call to action and button text', () => {
    render(<Promo {...PROPS} />)
    
    expect(screen.getByText(PROPS.callToAction)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: PROPS.ctaButtonText })).toBeInTheDocument()
  })

  it('navigates to author URL when button is clicked', () => {
    render(<Promo {...PROPS} />)
    const button = screen.getByRole('button', { name: PROPS.ctaButtonText })
    
    fireEvent.click(button)
    expect(window.location).toBe(META.authorUrl)
  })
})
