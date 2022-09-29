var express = require('express')
var router = express.Router()
const db = require('../config')
const moment = require('moment')
const axios = require('axios')
const { getLastTime } = require('../utils')

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

router.get('/', async (req, res) => {
	let response = {}
	const checkTime = getLastTime(5, 'minutes')
	const tweetsQuery = await db.collection('tweets').where('time', '>=', checkTime).get()
	const dbTweetsDocs = tweetsQuery.docs.map((doc) => ({ ...doc.data() }))

	if (dbTweetsDocs.length > 0) {
		response = {
			data: dbTweetsDocs[0].data,
			source: 'db',
		}
	} else {
		const tweetQuery = await axios.get(endpointUrl, {
			headers: {
				'User-Agent': 'v2RecentSearchJS',
				authorization: `Bearer ${process.env.BEARER_TOKEN}`,
			},
			params: {
				query: '#web3',
				max_results: 10,
			},
		})
		response = {
			data: tweetQuery.data.data,
			source: 'api',
		}
	}
	res.json(response)
})

router.post('/add', async (req, res) => {
	const { tweets } = req.body
	const tweetsRef = await db.collection('tweets').doc()
	const time = moment().format('x')
	await tweetsRef.set({
		data: tweets.tweets,
		time,
	})
	res.json('Entry added to db')
})

module.exports = router
