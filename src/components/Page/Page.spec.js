import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from './'

const PROPS = {
  headline: 'Fiat lux',
  subhead: 'δωρεαν ελαβετε δωρεαν δοτε',
  source: 'Virtus et Scientia',
  disclaimer: 'Sapientia et Doctrina'
}

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page {...PROPS} />)
    expect(container).toBeInTheDocument()
  })

  it('renders the passed content', () => {
    render(<Page {...PROPS} />)
    
    // Using role queries where possible for better accessibility testing
    expect(screen.getByRole('heading', { level: 1, name: PROPS.headline })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: PROPS.subhead })).toBeInTheDocument()
    
    // Using text queries for elements without semantic roles
    expect(screen.getByText(PROPS.source)).toBeInTheDocument()
    expect(screen.getByText(PROPS.disclaimer)).toBeInTheDocument()
    
    // Verify correct classes are applied
    expect(screen.getByText(PROPS.subhead)).toHaveClass('subhead')
    expect(screen.getByText(PROPS.source)).toHaveClass('source')
    expect(screen.getByText(PROPS.disclaimer)).toHaveClass('disclaimer')
  })
})
