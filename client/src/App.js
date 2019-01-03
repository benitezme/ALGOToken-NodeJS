import React, { Component } from 'react'

import Layout from './views/layout'

export class App extends Component {
  state = { loading: true, contractState: null }

  componentDidMount () {
    const { contract } = this.props

    // subscribe to changes in the store
    this.unsubscribe = contract.store.subscribe(() => {
      // every time the store updates, grab the contract state
      const contractState = contract.store.getState()

      // check to see if it's ready, if so, update local component state
      if (contractState.drizzleStatus.initialized) {
        this.setState({ loading: false, contractState })
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { children } = this.props
    if (this.state.loading) return <Layout>Loading contract...</Layout>
    return (
      <Layout
        contract={this.props.contract}
        contractState={this.state.contractState}
      >
        {children}
      </Layout>
    )
  }
}

export default App
