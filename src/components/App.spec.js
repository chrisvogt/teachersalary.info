import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import META from '../data/meta'

// Mock all child components
jest.mock('./PrimaryAppBar', () => {
  return {
    __esModule: true,
    default: ({ style }) => <div data-testid="primary-app-bar" style={style}>Mocked AppBar</div>
  }
})

jest.mock('./Report', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="report">Mocked Report</div>
  }
})

jest.mock('./Page', () => {
  return {
    __esModule: true,
    default: ({ headline, subhead, source, disclaimer }) => (
      <div data-testid="page">
        <h1>{headline}</h1>
        <h3>{subhead}</h3>
        <div>{source}</div>
        <div>{disclaimer}</div>
      </div>
    )
  }
})

jest.mock('./Promo', () => {
  return {
    __esModule: true,
    default: ({ callToAction, ctaButtonText }) => (
      <div data-testid="promo">
        <div>{callToAction}</div>
        <button>{ctaButtonText}</button>
      </div>
    )
  }
})

jest.mock('./Footer', () => {
  return {
    __esModule: true,
    default: ({ copyright, overview, quoteText, quoteCite }) => (
      <div data-testid="footer">
        <div>{copyright}</div>
        <div>{overview}</div>
        <div>{quoteText}</div>
        <div>{quoteCite}</div>
      </div>
    )
  }
})

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('renders all components in the correct order', () => {
    render(<App />)
    const components = screen.getAllByTestId(/primary-app-bar|report|page|promo|footer/)
    expect(components).toHaveLength(5)
    expect(components[0]).toHaveAttribute('data-testid', 'primary-app-bar')
    expect(components[1]).toHaveAttribute('data-testid', 'report')
    expect(components[2]).toHaveAttribute('data-testid', 'page')
    expect(components[3]).toHaveAttribute('data-testid', 'promo')
    expect(components[4]).toHaveAttribute('data-testid', 'footer')
  })

  it('passes correct props to components', () => {
    render(<App />)
    
    // Check AppBar styling
    const appBar = screen.getByTestId('primary-app-bar')
    expect(appBar).toHaveStyle({ backgroundColor: META.colors.primary })

    // Check that components receive their required props
    const page = screen.getByTestId('page')
    expect(page.querySelector('h1')).toBeInTheDocument()
    expect(page.querySelector('h3')).toBeInTheDocument()
    expect(page.querySelectorAll('div')).toHaveLength(2)

    const promo = screen.getByTestId('promo')
    expect(promo.querySelector('div')).toBeInTheDocument()
    expect(promo.querySelector('button')).toBeInTheDocument()

    const footer = screen.getByTestId('footer')
    expect(footer.querySelectorAll('div')).toHaveLength(4)
  })
})
