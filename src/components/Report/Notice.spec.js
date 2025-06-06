import React from 'react'
import { render, screen } from '@testing-library/react'
import Notice from './Notice'
import * as CONTENT from '../../content/text'

describe('Notice', () => {
  it('renders without crashing', () => {
    const { container } = render(<Notice />)
    expect(container).toBeInTheDocument()
  })

  it('renders the default notice message', () => {
    render(<Notice />)
    expect(screen.getByText(CONTENT.noStatesNotice)).toBeInTheDocument()
  })

  it('renders the passed notice message', () => {
    const message = 'Veritate Duce Progredi'
    render(<Notice message={message} />)
    expect(screen.getByText(message)).toBeInTheDocument()
  })
})
