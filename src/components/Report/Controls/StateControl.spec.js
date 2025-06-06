import React from 'react'
import { render, screen } from '../../../test-utils'
import StateControl from './StateControl'
import * as CONTENT from '../../../content/text'

describe('StateControl', () => {
  it('renders without crashing', () => {
    const { container } = render(<StateControl />)
    expect(container).toBeInTheDocument()
  })

  it('renders state selection control', () => {
    render(<StateControl />)
    // Assuming there's a label or text for state selection
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
