import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const states = require('../../../data/states.json')
const menuItems = Object.keys(states).map(state => (
  <MenuItem value={state} key={state}>{states[state]}</MenuItem>
))

const StateControl = ({ onChange }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    onChange({
      newState: newValue
    })
  }

  return (
    <div className="control">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel sx={{ color: 'white' }}>Add State</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          label="Add State"
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </div>
  )
}

export default StateControl
