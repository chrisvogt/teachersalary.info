import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('renders with the correct attributes', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.App')).toBeInTheDocument()
  })
})
