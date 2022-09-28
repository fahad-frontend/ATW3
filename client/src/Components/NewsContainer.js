import { useEffect, useState } from 'react'

const NewsContainer = () => {
	const [page, setPage] = useState(1)
	const [news, setNews] = useState([])

	const fetchNews = async () => {
		const newsRequest = await fetch(`http://localhost:8080/news?page=${page}`)
		const newsData = await newsRequest.json()
		console.log(newsData)
		setNews((prev) => [...prev, ...newsData.data])
	}

	const NewsItem = (item, index) => (
		<div className='flex items-center justify-between p-4' key={index}>
			<div className='mr-14'>
				<p className='font-bold'>{item.title}</p>
				<p>{item.text}</p>
				<div className='flex flex-row mt-2'>
					<p className='font-semibold italic mr-6'>{item.source_name}</p>
					<p>{item.date}</p>
				</div>
			</div>
			<img className='h-28 w-34' src={`${item.image_url}`} />
		</div>
	)

	useEffect(() => {
		fetchNews()
	}, [])

	return <>{news.length > 0 ? <div className='p-6'>{news.map((item, index) => NewsItem(item, index))}</div> : <p>Loading BOI</p>}</>
}

export default NewsContainer
