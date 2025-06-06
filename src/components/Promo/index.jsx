import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import META from '../../data/meta'
import Domain from 'material-ui/svg-icons/social/domain'
import '../../styles/Promo.css'

const STYLES = {
  button: {
    fontFamily: "'Quicksand', Verdana, sans-serif",
    textTransform: 'none'
  }
}

function handleCodeClick () {
  window.location = META.authorUrl
}

const Promo = ({
  callToAction,
  ctaButtonText
}) => (
  <div className="Promo">
    <Grid fluid>
      <Row>
        <Col className="message" xs={8}>
          {callToAction}
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper">
            <RaisedButton
              backgroundColor={META.colors.primary}
              icon={<Domain />}
              label={ctaButtonText}
              labelColor="white"
              labelPosition="after"
              onClick={handleCodeClick}
              style={STYLES.button}
            />
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Promo
