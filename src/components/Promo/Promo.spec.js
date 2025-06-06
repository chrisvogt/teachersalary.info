import React from 'react'
import { render, screen } from '../../test-utils'
import Promo from './'

const PROPS = {
  callToAction: 'Veritas vos liberabit',
  ctaButtonText: 'Ex Scientia Tridens'
}

describe('Promo', () => {
  it('renders without crashing', () => {
    const { container } = render(<Promo {...PROPS} />)
    expect(container).toBeInTheDocument()
  })

  it('renders the call to action and button text', () => {
    render(<Promo {...PROPS} />)
    
    expect(screen.getByText(PROPS.callToAction)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: PROPS.ctaButtonText })).toBeInTheDocument()
  })
})
