import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Button } from '@mui/material'
import DomainIcon from '@mui/icons-material/Domain'
import META from '../../data/meta'
import '../../styles/Promo.css'

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
            <Button
              variant="contained"
              startIcon={<DomainIcon />}
              onClick={handleCodeClick}
              sx={{
                backgroundColor: META.colors.primary,
                color: 'white',
                fontFamily: "'Quicksand', Verdana, sans-serif",
                '&:hover': {
                  backgroundColor: META.colors.primary,
                }
              }}
            >
              {ctaButtonText}
            </Button>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Promo
