// var createError = require('http-errors')
const express = require('express')
const cors = require('cors')
var path = require('path')
// var cookieParser = require('cookie-parser')
// var logger = require('morgan')

const pricesRouter = require('./routes/prices')
const newsRouter = require('./routes/news')
require('dotenv').config()

const app = express()
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter)
app.use('/prices', pricesRouter)
app.use('/news', newsRouter)

// app.get('/prices', (request, response) => {
// 	response.send('<h1>About</h1>')
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
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
