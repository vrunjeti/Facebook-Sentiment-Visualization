import React from 'react'
import { render } from 'react-dom'
import Chart from './components/Chart'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Chart />
      </div>
    )
  }
}