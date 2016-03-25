import React from 'react'
import { render } from 'react-dom'
import { ScatterChart } from 'react-d3'
import request from 'superagent'

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [{ values: [] }] }
  }

  componentDidMount() {
    request.get('./../../../data/comments_processed.json')
      .then(res => {
        this.setState({
          data: [{
            name: 'comments',
            values: res.body.map(comment => ({ x: comment.sentiment, y: comment.likes }))
          }]
        })
      })
  }

  render() {
    const { data } = this.state
    return (
      <div className="chart-container">
        { data[0].values.length && <ScatterChart
          data={data}
          width={800}
          height={800}
          title="Sentiment Polarity vs # Likes for comments on my Facebook statuses"
          xAxisLabel="Sentiment Polarity"
          yAxisLabel="# Likes"
        /> }
      </div>
    )
  }
}