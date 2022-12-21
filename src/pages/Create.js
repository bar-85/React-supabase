import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const Create = () => {
  const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [method, setMethod] = useState('')
	const [formError, setFormError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()

		if (!title || !method) {
			setFormError('Proszę uzupełnić wszystkie pola')
		}

		const { data, error } = await supabase
    .from('notebook')
    .insert([{ title, method }])
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

	return (
		<div className='page create'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>Tytuł:</label>
				<input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />

				<label htmlFor='method'>Opis:</label>
				<textarea id='method' value={method} onChange={e => setMethod(e.target.value)} />

				<button>Dodaj notatkę</button>

				{formError && <p className='error'>{formError}</p>}
			</form>
		</div>
	)
}

export default Create
