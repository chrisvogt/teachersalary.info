import React from 'react'
import * as CONTENT from '../../content/text'

const EmptyNotice = ({ message }) => (
  <div className="notice">
    <p>{message || CONTENT.noStatesNotice}</p>
  </div>
)

export default EmptyNotice
