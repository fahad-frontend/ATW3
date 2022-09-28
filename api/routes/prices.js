var express = require('express')
var router = express.Router()
const axios = require('axios')

/* GET users listing. */
router.get('/', async (req, res) => {
	const pricesResponse = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
		headers: {
			'X-CMC_PRO_API_KEY': `${process.env.PRICES_API_KEY}`,
		},
	})
	res.json(pricesResponse.data)
})

module.exports = router
