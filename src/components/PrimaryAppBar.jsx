import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import META from '../data/meta'

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
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {META.appTitle}
      </Typography>
      <IconButton
        color="inherit"
        onClick={handleCodeClick}
        size="large"
      >
        <CodeIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default PrimaryAppBar