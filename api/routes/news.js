const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../config')
const moment = require('moment')
const { getLastTime } = require('../utils')

router.get('/', async (req, res) => {
	let response = {}
	const checkTime = getLastTime(1, 'hours')
	const newsQuery = await db.collection('news').where('time', '>=', checkTime).where('page', '==', parseInt(req.query.page)).get()
	const dbNewsDocs = newsQuery.docs.map((doc) => ({ ...doc.data() }))
	if (dbNewsDocs.length > 0) {
		response = {
			data: dbNewsDocs[0].data,
			source: 'db',
		}
	} else {
		const newsResponse = await axios.get(
			`https://cryptonews-api.com/api/v1/category?section=general&items=20&page=${req.query.page}&token=${process.env.NEWS_API_KEY}`
		)
		response = {
			data: newsResponse.data.data,
			source: 'api',
		}
	}

	res.json(response)
})

router.post('/add', async (req, res) => {
	const { news, page } = req.body
	const NewsRef = await db.collection('news').doc()
	const time = moment().format('x')
	await NewsRef.set({
		data: news.news,
		time,
		page,
	})
	res.json('Entry added to db')
})

module.exports = router
