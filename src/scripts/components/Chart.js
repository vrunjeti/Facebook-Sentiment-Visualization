import React from 'react'
import { render } from 'react-dom'
import { ScatterChart } from 'react-d3'
import request from 'superagent'

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentData: [{ values: [] }],
      statusData: [{ values: [] }]
    }
  }

  componentDidMount() {
    Promise.all([
      request.get('./../../../data/comments_processed.json'),
      request.get('./../../../data/statuses_processed.json')
    ]).then(res => {
        const [ comments, statuses ] = res
        this.setState({
          commentData: [{
            name: 'comments',
            values: comments.body.map(comment => ({ x: comment.sentiment, y: comment.likes }))
          }],
          statusData: [{
            name: 'statuses',
            values: statuses.body.map(status => ({ x: status.sentiment, y: status.likes }))
          }]
        })
      })
  }

  render() {
    const { commentData, statusData } = this.state
    return (
      <div className="chart-container">
        <div className="filler"></div>
        { commentData[0].values.length && <ScatterChart
          data={commentData}
          width={800}
          height={800}
          title="Sentiment Polarity vs # Likes for comments on my Facebook statuses"
          xAxisLabel="Sentiment Polarity"
          yAxisLabel="# Likes"
        /> }
        <div className="filler"></div>
        { statusData[0].values.length && <ScatterChart
          data={statusData}
          width={800}
          height={800}
          title="Sentiment Polarity vs # Likes for my Facebook statuses"
          xAxisLabel="Sentiment Polarity"
          yAxisLabel="# Likes"
        /> }
      </div>
    )
  }
}