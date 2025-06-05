import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/action/code'
import META from '../data/meta'

function handleCodeClick () {
  window.location = META.repoUrl
}

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const PrimaryAppBar = () => (
  <AppBar
    title={META.appTitle}
    iconElementRight={<IconButton><NavigationClose /></IconButton>}
    iconStyleLeft={{display: 'none'}}
    onRightIconButtonClick={handleCodeClick}
    style={{backgroundColor: META.colors.primary}}
  />
)

export default PrimaryAppBar