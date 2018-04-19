import React from 'react'
import fragment from '../lib/fragment'

const CoreFragment = fragment('http://localhost:3001')
export default class IndexPage extends React.Component {
  static async getInitialProps (ctx) {
    // resolve core markup
    const coreFragmentProps = await CoreFragment.getInitialProps(ctx)
    return {
      coreFragmentProps
    }
  }

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
        {'Counting from main Render service >> ' + this.state.tick}

        <CoreFragment {...this.props.coreFragmentProps} />
      </div>
    )
  }
}
