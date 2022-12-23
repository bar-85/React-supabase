import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import NotebookCard from '../components/NotebookCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [notebook, setNotebook] = useState(null)

  const handleDelete = (id) => {
    setNotebook(prevNotebook => {
      return prevNotebook.filter(n => n.id !== id)
    })
  }

  useEffect(() => {
    const fetchNotebook = async () => {
      const { data, error } = await supabase
      .from('notebook')
      .select()

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
  }, [])

  return (
    <div className='page home'>
      {fetchError && (<p>{fetchError}</p>)}
      {notebook && (
        <div className='notebook'>
          <div className='notebook-grid'>
          {notebook.map(note => (
            <NotebookCard key={note.id} note={note} onDelete={handleDelete}/>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

