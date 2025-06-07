import React from 'react'
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
    <div className="message">
      {callToAction}
    </div>
    <div>
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
  </div>
)

export default Promo
