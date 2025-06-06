import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const states = require('../../../data/states.json')
const menuItems = Object.keys(states).map(state => (
  <MenuItem 
    value={state} 
    key={state}
    sx={{
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'inherit'
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.24)',
          color: 'inherit'
        }
      }
    }}
  >
    {states[state]}
  </MenuItem>
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
        <InputLabel 
          htmlFor="state-select" 
          sx={{ 
            color: 'white',
            '&.Mui-focused': {
              color: 'white',
            },
            '&.MuiFormLabel-filled': {
              color: 'white',
            }
          }}
        >
          Add State
        </InputLabel>
        <Select
          id="state-select"
          value={value}
          onChange={handleChange}
          label="Add State"
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#004D40',  // Same as teal[900]
                '& .MuiMenuItem-root': {
                  color: 'white'
                }
              }
            }
          }}
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
