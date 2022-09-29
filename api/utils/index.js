const moment = require('moment')

const getLastTime = (number, metric) => moment().subtract(number, metric).format('x')

module.exports = {
	getLastTime,
}
