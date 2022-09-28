import { useEffect, useRef, useState, useCallback } from 'react'
// import { useQuery } from 'react-query'

const NewsContainer = () => {
	const [page, setPage] = useState(1)
	const [news, setNews] = useState([])
	// const { data: news } = useQuery('news', () => fetch(`http://localhost:8080/news?page=${page}`).then((res) => res.json()))

	const observer = useRef()
	const lastNewsElementRef = useCallback((node) => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setPage((prev) => prev + 1)
			}
		})
		if (node) observer.current.observe(node)
	}, [])
	const normalNewsElementRef = useCallback()

	const fetchNews = async (controller) => {
		const newsRequest = await fetch(`http://localhost:8080/news?page=${page}`, {
			signal: controller.signal,
		})
		const newsData = await newsRequest.json()
		console.log(newsData)
		if (newsData.data) {
			setNews((prev) => [...prev, ...newsData.data])
			newsData.source === 'api' && saveNews({ news: newsData.data })
		}
	}

	const saveNews = async (news) => {
		console.log(news)
		await fetch(`http://localhost:8080/news/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				news,
				page,
			}),
		})
	}

	const NewsItem = (item, index) => (
		<div className='flex items-center justify-between p-4' key={index} ref={index === news.length - 1 ? lastNewsElementRef : normalNewsElementRef}>
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
		const controller = new AbortController()
		fetchNews(controller)
		return () => controller.abort()
	}, [page])

	return <>{news?.length > 0 ? <div className='p-6'>{news.map((item, index) => NewsItem(item, index))}</div> : <p>Loading BOI</p>}</>
}

export default NewsContainer
