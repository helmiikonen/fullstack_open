import React, { useState } from 'react'

const Header = ({header}) => (
  <div>
    <h1>{header}</h1>
  </div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  if (sum === 0) {
    return <p>No feedback given</p>
  }
  const average = (good - bad) / sum
  const positive = 100 * good / sum
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={sum}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive + ' %'}/>
        </tbody>
      </table>
    </div> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mainHeader = 'Give feedback'
  const statisticsHeader = 'Statistics'

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Header header={mainHeader}/>
      <Button handleClick={goodFeedback} text='good'/>
      <Button handleClick={neutralFeedback} text='neutral'/>
      <Button handleClick={badFeedback} text='bad'/>
      <Header header={statisticsHeader}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App