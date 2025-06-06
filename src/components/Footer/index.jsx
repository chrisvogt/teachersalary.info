import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import META from '../../data/meta'
import '../../styles/Footer.css'

const STYLES = {
  footer: {
    backgroundColor: META.colors.primary,
    color: 'white'
  }
}

const Footer = ({
  copyright,
  overview,
  quoteText,
  quoteCite
}) => (
  <div className="Footer" style={STYLES.footer}>
    <Grid fluid>
      <Row>
        <Col xs={12} sm={6}>
          <p>{overview}</p>
        </Col>
        <Col xs={12} sm={6}>
          <blockquote>
            {quoteText}
            <cite>
              {quoteCite}
            </cite>
          </blockquote>
        </Col>
        <Col xs={12}>
          <small>
            {copyright}
          </small>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Footer
