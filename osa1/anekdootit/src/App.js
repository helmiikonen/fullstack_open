import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))

  const nextAnecdote = () => setSelected(Math.floor(Math.random() * 7))
  const addVote = () =>  {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const maxPoints = Math.max(...points)
  const mostVoted = anecdotes[points.indexOf(maxPoints)]

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={addVote}/>
      <Button text='next anecdote' handleClick={nextAnecdote}/> 
      <Header text='Anecdote with most votes' />
      <p>{mostVoted} </p>
      <p>has {maxPoints} votes</p>
    </div>
  )
}

export default App
