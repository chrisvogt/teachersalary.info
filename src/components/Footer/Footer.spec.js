import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './'

const PROPS = {
  copyright: 'Et docere et rerum exquirere causas',
  overview: 'Veritas',
  quoteText: 'Ma luna a\'e o na lahui a pau ke ola o ke kanaka',
  quoteCite: 'Scientia est Potentia'
}

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer {...PROPS} />)
    expect(container).toBeInTheDocument()
  })

  it('renders the passed content', () => {
    render(<Footer {...PROPS} />)
    
    expect(screen.getByText(PROPS.copyright)).toBeInTheDocument()
    expect(screen.getByText(PROPS.overview)).toBeInTheDocument()
    expect(screen.getByText(PROPS.quoteText)).toBeInTheDocument()
    expect(screen.getByText(PROPS.quoteCite)).toBeInTheDocument()

    // Verify correct HTML elements are used
    expect(screen.getByText(PROPS.copyright).tagName).toBe('SMALL')
    expect(screen.getByText(PROPS.overview).tagName).toBe('P')
    expect(screen.getByText(PROPS.quoteText).tagName).toBe('BLOCKQUOTE')
    expect(screen.getByText(PROPS.quoteCite).tagName).toBe('CITE')
  })
})
