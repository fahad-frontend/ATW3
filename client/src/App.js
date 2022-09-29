import './App.css'
import NewsContainer from './Components/NewsContainer'
import PricesContainer from './Components/PriceContainer'
import TweetsContainer from './Components/TweetsContainer'
import logo from './assets/logo.gif'

function App() {
	return (
		<div className='flex flex-col justify-center items-center'>
			<img className='h-36' src={logo} />
			<div className='flex flex-col sm:flex-row h-full w-full'>
				<div className='w-full sm:w-2/3 p-4'>
					<PricesContainer />
					<NewsContainer />
				</div>
				<div className='w-full sm:w-1/3 p-4'>
					<TweetsContainer />
				</div>
			</div>
		</div>
	)
}

export default App
