import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const NotebookCard = ({ note, onDelete}) => {

  const handleDelete = async () => {
    const {data, error} = await supabase
    .from('notebook')
    .delete()
    .eq('id', note.id)
    .select()

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(note.id)
    }
  }

  return (
    <div className='note-card'>
      <h3>{note.title}</h3>
      <p>{note.method}</p>
      <div className="buttons">
        <Link to={'/' + note.id}>
          <button className="button-edit">📝 Edytuj</button>
        </Link>
        <button className="button-delete" onClick={handleDelete}>❌</button>
      </div>
    </div>
  )
}

export default NotebookCard
