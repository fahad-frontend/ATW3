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
		const priceRequest = await fetch('https://atw3.herokuapp.com/prices', {
			signal: controller.signal,
		})
		const priceData = await priceRequest.json()
		console.log('pricesData', priceData)
		if (priceData?.data?.length > 0) {
			setPrices((prev) => [...prev, ...priceData.data])
			priceData?.source === 'api' && savePrices(priceData.data)
		}
	}

	const savePrices = async (prices) => {
		await fetch(`https://atw3.herokuapp.com/prices/add`, {
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
			<div className='loader loader-7'>
				<div className='line line1'></div>
				<div className='line line2'></div>
				<div className='line line3'></div>
			</div>
		</section>
	)

	const showBarChart = () => (
		<>
			<p className='text-3xl font-bold mb-2 text-meta-purple'>Compare currency data</p>
			<select className='mb-2 p-1 rounded-md border-2 border-black' name='property' onChange={handleChange} defaultValue={property}>
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

	return (
		<div className='flex flex-col justify-content items-center p-4 border-2 border-meta-purple rounded-lg'>
			{prices?.length > 0 ? showBarChart() : loader()}
		</div>
	)
}

export default PricesContainer
