import { useEffect } from 'react'

const PriceContainer = () => {
	const getPrices = async () => {
		const priceRequest = await fetch('http://localhost:8080/prices')
		const priceData = await priceRequest.json()
		console.log(priceData)
	}

	useEffect(() => {
		getPrices()
	}, [])

	return <p>Hmm</p>
}

export default PriceContainer
