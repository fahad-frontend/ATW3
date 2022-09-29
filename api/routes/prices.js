var express = require('express')
var router = express.Router()
const db = require('../config')
const moment = require('moment')
const axios = require('axios')
const { getLastTime } = require('../utils')

/* GET users listing. */
router.get('/', async (req, res) => {
	let response = {}
	const checkTime = getLastTime(30, 'minutes')
	const pricesQuery = await db.collection('prices').where('time', '>=', checkTime).get()
	const dbPricesDocs = pricesQuery.docs.map((doc) => ({ ...doc.data() }))

	if (dbPricesDocs.length > 0) {
		response = {
			data: dbPricesDocs[0].data,
			source: 'db',
		}
	} else {
		const pricesResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10', {
			headers: {
				'X-CMC_PRO_API_KEY': `${process.env.PRICES_API_KEY}`,
			},
		})
		response = {
			data: pricesResponse.data.data,
			source: 'api',
		}
	}
	res.json(response)
})

router.post('/add', async (req, res) => {
	const { prices } = req.body
	const pricesRef = await db.collection('prices').doc()
	const time = moment().format('x')
	await pricesRef.set({
		data: prices,
		time,
	})
	res.json('Entry added to db')
})

module.exports = router
