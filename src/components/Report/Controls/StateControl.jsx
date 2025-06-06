import React, { useState } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const states = require('../../../data/states.json')
const items = Object.keys(states).map(state => (
  <MenuItem value={states[state]} key={state} primaryText={`${states[state]}`} />
))

const STYLES = {
  color: 'white'
}

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
const StateControl = ({ onChange }) => {
  const [value, setValue] = useState('')

  const handleChange = (event, index, value) => {
    setValue(value)
    onChange({
      newState: items[index].key
    })
  }

  return (
    <div className="control">
      <SelectField
        floatingLabelText="Add State"
        floatingLabelStyle={STYLES}
        maxHeight={200}
        onChange={handleChange}
        value={value}
      >
        {items}
      </SelectField>
    </div>
  )
}

export default StateControl
