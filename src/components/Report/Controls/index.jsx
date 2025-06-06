import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import META from '../../../data/meta'
import StateControl from './StateControl'
import Chips from './Chips'

const STYLES = {
  backgroundColor: META.colors.primary,
  color: 'white',
  padding: '18px 0'
}

const Controls = ({ selectedStates, onDeleteState, onControlChange }) => (
  <div className="Controls" style={STYLES}>
    <Grid fluid>
      <Row>
        <Col xs={12} sm={4}>
          <StateControl idx={1} onChange={onControlChange} />
        </Col>
        <Col xs={12} sm={8}>
          <Chips
            chipData={selectedStates}
            onDeleteState={onDeleteState}
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Controls
