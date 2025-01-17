import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from './components/Notification'
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}
const App = () => {


  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('add a new note..')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])



  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.
      create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleImportant = () => {
    setShowAll(!showAll)
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.
      update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(
        error => {
          setErrorMessage(
            `${note.content} was removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      )
    setNotes(notes.filter(n => n.id !== id))
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ol>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ol>
      <button onClick={handleImportant}>Show {showAll ? 'Important' : 'All'}</button>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>SAVE</button>
      </form>
      <Footer />

    </div>
  )
}

export default App