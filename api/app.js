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

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
