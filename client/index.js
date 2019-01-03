/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './src'

import { Drizzle, generateStore } from 'drizzle'
import Algotoken from '../build/contracts/AlgoTokenV1.json'

const options = { contracts: [Algotoken] }

const contractStore = generateStore(options)
const contract = new Drizzle(options, contractStore)

ReactDOM.render(<App contract={contract} />, document.getElementById('App'))
