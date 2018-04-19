import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Main from './components'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json({}))
app.post('/', function (req, res) {
  const query = req.body

  const html = renderToString(<Main url={{query}} />)

  res.json({
    bundle: '/static/fragment/core.js',
    html
  })
})

app.listen(3001, function () {
  console.log('core at 3001')
})
