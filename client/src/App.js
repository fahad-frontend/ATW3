import logo from './logo.svg'
import './App.css'
import NewsContainer from './Components/NewsContainer'
// import PriceContainer from './Components/PriceContainer'
import TweetsContainer from './Components/TweetsContainer'

function App() {
	return (
		<div className='h-full w-full'>
			{/* <NewsContainer /> */}
			{/* <PriceContainer /> */}
			<TweetsContainer />
		</div>
	)
}

export default App
