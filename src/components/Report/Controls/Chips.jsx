import React from 'react'
import Chip from 'material-ui/Chip'

const STYLES = {
  chip: {
    backgroundColor: 'white',
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
const Chips = ({ chipData, onDeleteState }) => {
  const renderChip = data => (
    <Chip
      key={data.key}
      onRequestDelete={() => onDeleteState(data.key)}
      style={STYLES.chip}
    >
      {data.label}
    </Chip>
  )

  const getChips = () => {
    if (chipData && chipData.length > 0) {
      return chipData.map(renderChip)
    }
    return null
  }

  return (
    <div style={STYLES.wrapper}>
      {getChips()}
    </div>
  )
}

export default Chips
