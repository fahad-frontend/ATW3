import { useEffect, useRef, useState, useCallback } from 'react'

const NewsContainer = () => {
	const [page, setPage] = useState(1)
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(false)
	console.log(window.location.hostname)
	const observer = useRef()

	const lastNewsElementRef = useCallback((node) => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setLoading(true)
				setPage((prev) => prev + 1)
			}
		})
		if (node) observer.current.observe(node)
	}, [])

	const normalNewsElementRef = useCallback()

	useEffect(() => {
		const controller = new AbortController()
		fetchNews(controller)
		return () => controller.abort()
	}, [page])

	const fetchNews = async (controller) => {
		const newsRequest = await fetch(`http://localhost:8080/news?page=${page}`, {
			signal: controller.signal,
		})
		const newsData = await newsRequest.json()
		console.log('newsData', newsData)
		if (newsData.data) {
			setLoading(false)
			setNews((prev) => [...prev, ...newsData.data])
			newsData.source === 'api' && saveNews({ news: newsData.data })
		}
	}

	const saveNews = async (news) => {
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
		<div
			className='flex items-center justify-between p-6 transition ease-in-out delay-100 hover:-translate-y-1 hover:-translate-x-2 hover:scale-30 hover:bg-indigo-300 cursor-pointer border-b-2 border-gray-800 rounded-lg'
			key={index}
			ref={index === news.length - 1 ? lastNewsElementRef : normalNewsElementRef}
			onClick={() => window.open(item.news_url, '_blank').focus()}
		>
			<div className='m-0 sm:mr-14'>
				<p className='font-bold'>{item.title}</p>
				<p>{item.text}</p>
				<div className='flex flex-row mt-2'>
					<p className='font-semibold italic mr-6'>{item.source_name}</p>
					<p>{item.date}</p>
				</div>
			</div>
			<img className='hidden md:flex sm:h-28 sm:w-34' src={`${item.image_url}`} />
		</div>
	)

	const loader = () => (
		<div className='rect'>
			<div className='rect1'></div>
			<div className='rect2'></div>
			<div className='rect3'></div>
			<div className='rect4'></div>
			<div className='rect5'></div>
		</div>
	)

	return (
		<div className='mt-4 p-4 border-2 border-meta-purple rounded-lg'>
			{news?.length > 0 ? (
				<div>
					<p className='text-3xl font-bold mr-4 text-center text-meta-purple'>In Other News </p>
					{news.map((item, index) => NewsItem(item, index))}
					{loading && loader()}
				</div>
			) : (
				loader()
			)}
		</div>
	)
}

export default NewsContainer
