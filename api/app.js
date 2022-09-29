const express = require('express')
const cors = require('cors')
const path = require('path')

const pricesRouter = require('./routes/prices')
const newsRouter = require('./routes/news')
const tweetsRouter = require('./routes/tweets')
require('dotenv').config()

const app = express()
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/prices', pricesRouter)
app.use('/news', newsRouter)
app.use('/tweets', tweetsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.send('server running')
})

module.exports = app
