import { Link } from "react-router-dom"

const NotebookCard = ({ note }) => {
  return (
    <div className='note-card'>
      <h3>{note.title}</h3>
      <p>{note.method}</p>
      <div className="buttons">
        <Link to={'/' + note.id}>
          <button className="buttonEdit">📝 Edytuj</button>
        </Link>
      </div>
    </div>
  )
}

export default NotebookCard
