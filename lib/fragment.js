import React from 'react'
import Head from 'next/head'
let isLoaded = false
let isContextAlreadyExists = false
const fetch = require('isomorphic-fetch')

require('expose-loader?router!next/router')
require('expose-loader?React!react')
require('expose-loader?ReactDOM!react-dom')
require('expose-loader?StyledComponents!styled-components')

function appendStyle (styleTags) {
  const d = document.createElement('div')
  d.innerHTML = styleTags

  document.head.appendChild(d.firstChild)
}
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

  if (!document.getElementById(scriptURL)) {
    const FragmentScript = document.createElement('script')
    FragmentScript.id = scriptURL
    FragmentScript.src = scriptURL
    document.body.appendChild(FragmentScript)
  }
}
export default function (endpoint) {
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
      // appendStyle(this.props.styleTags)
    }
    render () {
      return [
        <Head key='head' >
          <title>{'something'}</title>
          {this.props.styleElements.map(style => React.createElement('style', {
            key: style.key,
            ...style.props
          }))}
        </Head>,
        <div key='root' id='core-root' dangerouslySetInnerHTML={{ __html: this.props.html }} />
      ]
    }
  }
}
