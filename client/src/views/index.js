import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Header } from './layout'

const styles = theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 'calc(100vh)'
  }
})

class Layout extends Component {
  render () {
    return (
      <div className={this.props.classes.layout}>
        <Header />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
