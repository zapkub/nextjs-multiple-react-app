import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Main from './components'
import bodyParser from 'body-parser'

import { ServerStyleSheet } from 'styled-components'
process.env.SC_ATTR = 'core'

const app = express()
app.use(bodyParser.json({}))
app.post('/', function (req, res) {
  const query = req.body
  const sheet = new ServerStyleSheet()
  sheet.collectStyles(<Main url={{query}} />)

  const html = renderToString(<Main url={{query}} />)

  res.json({
    bundle: '/static/fragment/core.js',
    html,
    styleTags: sheet.getStyleTags(),
    styleElements: sheet.getStyleElement()
  })
})

app.listen(3001, function () {
  console.log('core at 3001')
})
