import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Create from './pages/Create'
import Home from './pages/Home'
import Update from './pages/Update'

function App() {
	return (
		<BrowserRouter>
			<header>
        <div className='title'>
          <h1>Notatnik hodowcy</h1>
        </div>
			</header>
			<nav>
					<Link to='/'>Strona główna</Link>
					<Link to='/create'>Dodaj notatkę</Link>
			</nav>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/create' element={<Create />} />
				<Route path='/:id' element={<Update />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
