import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import '../../styles/Page.css'

const Page = ({
  headline,
  subhead,
  source,
  disclaimer
}) => (
  <div className="Page">
    <Grid fluid>
      <Row>
        <Col xs={12} sm={6}>
          <h1>
            {headline}
          </h1>
          <h3 className="subhead">
            {subhead}
          </h3>
        </Col>
        <Col xs={12} sm={6}>
          <p className="source">
            {source}
          </p>
          <small className="disclaimer">
            {disclaimer}
          </small>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Page
