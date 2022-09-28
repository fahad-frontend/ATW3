var express = require('express')
var router = express.Router()
const axios = require('axios')

/* GET users listing. */
router.get('/', async (req, res) => {
	const newsResponse = await axios.get(
		`https://cryptonews-api.com/api/v1/category?section=general&items=20&page=${req.query.page}&token=${process.env.NEWS_API_KEY}`
	)
	res.json(newsResponse.data)
})

module.exports = router
