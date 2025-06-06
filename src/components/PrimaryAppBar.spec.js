import React from 'react'
import { render } from '../test-utils'
import PrimaryAppBar from './PrimaryAppBar'

describe('PrimaryAppBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<PrimaryAppBar />)
    expect(container).toBeInTheDocument()
  })
})
