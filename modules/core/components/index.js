
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: ${props => props.tick % 2 ? 'red' : 'green'};

`
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
      <Container tick={this.state.tick} >
        {'hi, ' + this.props.url.query.value}
        <br />
        {'counting from localhost:3001 >>> ' + this.state.tick}
      </Container>
    )
  }
}
