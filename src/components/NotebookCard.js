const NotebookCard = ({ note }) => {
  return (
    <div className='note-card'>
      <h3>{note.title}</h3>
      <p>{note.method}</p>
    </div>
  )
}

export default NotebookCard
