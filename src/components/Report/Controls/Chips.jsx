import React from 'react'
import { Chip, Box } from '@mui/material'

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
const Chips = ({ chipData, onDeleteState }) => {
  const renderChip = data => (
    <Chip
      key={data.key}
      label={data.label}
      onClick={() => onDeleteState(data.key)}
      onDelete={() => onDeleteState(data.key)}
      sx={{
        backgroundColor: 'white',
        margin: 0.5,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        },
        '&:focus': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        },
        '& .MuiChip-deleteIcon': {
          color: '#004D40',
          '&:hover': {
            color: '#00695C'
          }
        }
      }}
    />
  )

  const getChips = () => {
    if (chipData && chipData.length > 0) {
      return chipData.map(renderChip)
    }
    return null
  }

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {getChips()}
    </Box>
  )
}

export default Chips
