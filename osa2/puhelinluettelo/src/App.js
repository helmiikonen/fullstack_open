import { useState, useEffect } from 'react'

import personService from './services/personService'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('normal')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(({name}) => name === newName) !== undefined) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const personObject = {...person, number: newNumber}
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id 
              ? person 
              : returnedPerson))
            setMessage(`Updated ${newName}`)
            setMessageType('normal')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    }
    else if (newName !== '' && newNumber !== '') {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setMessageType('normal')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(`Failed to add ${newName}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const name = person.name
    personService
      .remove(id)
      .then(() =>
        personService
        .getAll()
        .then(response => {
          setPersons(response)
          setMessage(`Deleted ${name}`)
          setMessageType('normal')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      )
      .catch(error => {
        personService
          .getAll()
          .then(response => {
            setPersons(response)
          })
        setMessage(`Error: contact has already been deleted from the server`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (filter !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new contact</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/> 
    </div>
  )
}

export default App
