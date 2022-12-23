import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import NotebookCard from '../components/NotebookCard'

const Home = () => {
	const [fetchError, setFetchError] = useState(null)
	const [notebook, setNotebook] = useState(null)
	const [orderBy, setOrderBy] = useState('created_at') // created_at - supabase column
	const [toggle, setToggle] = useState(false)

	const toggleVisibility = () => setToggle(!toggle)

	const handleDelete = id => {
		setNotebook(prevNotebook => {
			return prevNotebook.filter(n => n.id !== id)
		})
	}

	useEffect(() => {
		const fetchNotebook = async () => {
			const { data, error } = await supabase.from('notebook').select().order(orderBy, { ascending: true })

			if (error) {
				setFetchError('Nie można pobrać notatek')
				setNotebook(null)
				console.log(error)
			}
			if (data) {
				setNotebook(data)
				setFetchError(null)
			}
		}
		fetchNotebook()
	}, [orderBy])

	return (
		<div className='page home'>
			{fetchError && <p>{fetchError}</p>}
			{notebook && (
				<div className='notebook'>
					<div className='order-by'>
						<button onClick={toggleVisibility}>Sortuj</button>
						{toggle && (
							<div className='order-button'>
								<button onClick={() => setOrderBy('created_at')}>Data dodania</button>
								<button onClick={() => setOrderBy('title')}>Tytuł</button>
							</div>
						)}
					</div>
					<div className='notebook-grid'>
						{notebook.map(note => (
							<NotebookCard key={note.id} note={note} onDelete={handleDelete} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Home
