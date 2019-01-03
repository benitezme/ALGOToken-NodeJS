import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { theme, globalStyles } from './styles'
import './styles/styles.scss'

import App from './App'

export const MasterApp = props => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App>Hello!</App>
    </MuiThemeProvider>
  </BrowserRouter>
)

const StyledMasterApp = withStyles(globalStyles)(MasterApp)
export default hot(module)(StyledMasterApp)
