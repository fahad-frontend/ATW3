import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import get from 'lodash.get'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PricesContainer = () => {
	const [prices, setPrices] = useState([])
	const [property, setProperty] = useState('quote,USD,percent_change_30d')

	const chartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Compare Cryptocurrencies Price Data',
			},
		},
	}

	const selectOptions = [
		{ key: 'quote,USD,price', value: 'Price' },
		{ key: 'quote,USD,volume_24h', value: 'Volume in last day' },
		{ key: 'total_supply', value: 'Total Supply' },
		{ key: 'circulating_supply', value: 'Circulating Supply' },
		{ key: 'max_supply', value: 'Max Supply' },
		{ key: 'quote,USD,market_cap', value: 'Market Cap' },
		{ key: 'quote,USD,percent_change_1h', value: 'Δ% in last hour' },
		{ key: 'quote,USD,percent_change_7d', value: 'Δ% in last week' },
		{ key: 'quote,USD,percent_change_24h', value: 'Δ% in last day' },
		{ key: 'quote,USD,percent_change_30d', value: 'Δ% in last month' },
	]

	const getChartData = () => {
		const labels = prices.map((price) => price.symbol)
		const datasets = [
			{
				label: selectOptions.find((option) => option.key === property).value,
				data: prices.map((price) => get(price, property.split(','))),
				backgroundColor: prices.map((price) => (get(price, property.split(',')) < 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)')),
			},
		]
		return {
			labels,
			datasets,
		}
	}

	const getPrices = async (controller) => {
		const priceRequest = await fetch('http://localhost:8080/prices', {
			signal: controller.signal,
		})
		const priceData = await priceRequest.json()
		console.log(priceData)
		if (priceData?.data?.length > 0) {
			setPrices((prev) => [...prev, ...priceData.data])
			priceData?.source === 'api' && savePrices(priceData.data)
		}
	}

	const savePrices = async (prices) => {
		await fetch(`http://localhost:8080/prices/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prices,
			}),
		})
	}

	const handleChange = (event) => {
		setProperty(event.target.value)
	}

	const loader = () => (
		<section>
			<div class='loader loader-7'>
				<div class='line line1'></div>
				<div class='line line2'></div>
				<div class='line line3'></div>
			</div>
		</section>
	)

	const showBarChart = () => (
		<>
			<select className='bg-meta-purple p-1 rounded-md text-white' name='property' onChange={handleChange} defaultValue={property}>
				{selectOptions.map((option) => (
					<option key={option.key} value={option.key}>
						{option.value}
					</option>
				))}
			</select>
			<Bar options={chartOptions} data={getChartData()} />
		</>
	)

	useEffect(() => {
		const controller = new AbortController()
		getPrices(controller)
		return () => controller.abort()
	}, [])

	return <div className='p-4 border-2 border-meta-purple rounded-lg'>{prices?.length > 0 ? showBarChart() : loader()}</div>
}

export default PricesContainer
