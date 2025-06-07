import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import META from '../data/meta'

// Import version from package.json
const { version } = require('../../package.json')

function handleCodeClick () {
  window.location = META.repoUrl
}

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const PrimaryAppBar = () => (
  <AppBar position="static" sx={{ backgroundColor: META.colors.primary }}>
    <Toolbar>
      <Typography component="span" sx={{ mr: 1, opacity: 0.7 }}>
        v{version}
      </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {META.appTitle}
      </Typography>
      <IconButton
        color="inherit"
        onClick={handleCodeClick}
        size="large"
        data-testid="code-button"
      >
        <CodeIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default PrimaryAppBar