
import React from 'react'

export default class Core extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tick: 0
    }
  }
  componentDidMount () {
    setInterval(() => {
      this.setState({
        tick: this.state.tick + 1
      })
    }, 1000)
  }
  render () {
    return (
      <div>
        {'hi, ' + this.props.url.query.value}
        <br />
        {'counting from localhost:3001 >>> ' + this.state.tick}
      </div>
    )
  }
}
