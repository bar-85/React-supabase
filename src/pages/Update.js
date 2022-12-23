import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [method, setMethod] = useState('')
	const [formError, setFormError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()

		if (!title || !method) {
			setFormError('Proszę uzupełnić wszystkie pola')
			return
		}

		const { data, error } = await supabase
		.from('notebook')
		.update({ title, method })
		.eq('id', id)
		.select()

		if (error) {
			console.log(error)
			setFormError('Proszę uzupełnić wszystkie pola')
		}
		if (data) {
			console.log(data)
			setFormError(null)
			navigate('/')
		}
	}

	useEffect(() => {
		const fetchNotebook = async () => {
			const { data, error } = await supabase
			.from('notebook')
			.select()
			.eq('id', id)
			.single()

			if (error) {
				navigate('/', { replace: true })
			}
			if (data) {
				setTitle(data.title)
				setMethod(data.method)
				console.log(data)
			}
		}
		fetchNotebook()
	}, [id, navigate])

	return (
		<div className='page update'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>Tytuł:</label>
				<input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />

				<label htmlFor='method'>Opis:</label>
				<textarea id='method' value={method} onChange={e => setMethod(e.target.value)} />

				<button>Aktualizacja notatki</button>

				{formError && <p className='error'>{formError}</p>}
			</form>
		</div>
	)
}

export default Update
