import React from 'react'
let isLoaded = false
let isContextAlreadyExists = false
const fetch = require('isomorphic-fetch')

require('expose-loader?router!next/router')
require('expose-loader?React!react')
require('expose-loader?ReactDOM!react-dom')

export default function (endpoint) {
  function appendScript (scriptURL) {
    if (!isContextAlreadyExists) {
      const scriptDOM = document.createElement('script')
      scriptDOM.innerHTML = `
              window.__JAMPLAY_GLOBAL_CONTEXT__ = {
                router: window.router,
                React: window.React,
                ReactDOM: window.ReactDOM
              }
            `
      document.body.appendChild(scriptDOM)
    }

    const FragmentScript = document.createElement('script')
    FragmentScript.src = scriptURL
    document.body.appendChild(FragmentScript)
  }

  return class FragmentComponent extends React.Component {
    static async getInitialProps (ctx) {
      const metaResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...ctx.req.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.query)
      })
      const meta = await metaResponse.json()
      return {
        ...meta
      }
    }
    componentDidMount () {
      appendScript(this.props.bundle)
    }
    render () {
      return <div id='core-root' dangerouslySetInnerHTML={{__html: this.props.html}} />
    }
  }
}
