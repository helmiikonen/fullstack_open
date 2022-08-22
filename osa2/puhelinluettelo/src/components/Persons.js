
const Persons = ({personsToShow, deletePerson}) => {

    return (
      <div>
        {personsToShow.map(person => 
          <p key={person.id}>
            {person.name} {person.number} 
            <button 
                onClick={() => {
                    if (window.confirm(`Do you want to delete ${person.name} from the phonebook?`)) {
                        deletePerson(person.id)
                    }
                }}>
                delete
            </button>
          </p>
        )}
      </div>
    )
}

export default Persons

