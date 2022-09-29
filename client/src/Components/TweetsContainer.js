import { useEffect, useState } from 'react'
import { Tweet } from 'react-twitter-widgets'

const TweetsContainer = () => {
	const [tweets, setTweets] = useState([])

	const fetchTweets = async (controller) => {
		const tweetsRequest = await fetch(`https://atw3.herokuapp.com/tweets`, {
			signal: controller.signal,
		})
		const tweetsData = await tweetsRequest.json()
		console.log('tweetsData', tweetsData)
		if (tweetsData.data) {
			setTweets((prev) => [...prev, ...tweetsData.data])
			tweetsData.source === 'api' && saveTweets({ tweets: tweetsData.data })
		}
	}

	const saveTweets = async (tweets) => {
		await fetch(`https://atw3.herokuapp.com/tweets/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				tweets,
			}),
		})
	}

	const showTweets = (tweet) => (
		<div key={tweet.id}>
			<Tweet tweetId={tweet.id} />
		</div>
	)

	const loader = () => (
		<div className='double'>
			<div className='double-bounce1'></div>
			<div className='double-bounce2'></div>
		</div>
	)

	useEffect(() => {
		const controller = new AbortController()
		fetchTweets(controller)
		return () => controller.abort()
	}, [])

	return (
		<div className='p-4 border-2 border-meta-purple rounded-lg bg-black'>
			<p className='text-white text-3xl font-bold text-center mb-4'>Latest Web3 related Tweets </p>
			{tweets.length > 0 ? tweets.map((tweet) => showTweets(tweet)) : loader()}
		</div>
	)
}

export default TweetsContainer
