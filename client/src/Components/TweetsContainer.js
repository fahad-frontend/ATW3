import { useEffect, useState } from 'react'
import { Tweet } from 'react-twitter-widgets'

const TweetsContainer = () => {
	const [tweets, setTweets] = useState([])

	const fetchTweets = async (controller) => {
		const tweetsRequest = await fetch(`http://localhost:8080/tweets`, {
			signal: controller.signal,
		})
		const tweetsData = await tweetsRequest.json()
		console.log(tweetsData)
		if (tweetsData.data) {
			setTweets((prev) => [...prev, ...tweetsData.data])
			tweetsData.source === 'api' && saveTweets({ tweets: tweetsData.data })
		}
	}

	const saveTweets = async (tweets) => {
		await fetch(`http://localhost:8080/tweets/add`, {
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
		<div class='double'>
			<div class='double-bounce1'></div>
			<div class='double-bounce2'></div>
		</div>
	)

	useEffect(() => {
		const controller = new AbortController()
		fetchTweets(controller)
		return () => controller.abort()
	}, [])

	return (
		<div className='p-4 border-2 border-meta-purple rounded-lg bg-black'>{tweets.length > 0 ? tweets.map((tweet) => showTweets(tweet)) : loader()}</div>
	)
}

export default TweetsContainer
