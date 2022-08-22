import React from 'react'

const MainHeader = (props) => {
  return (
    <div>
      <h1>
        {props.headerText}
      </h1>
    </div>
  )
}
const CourseHeader = (props) => {
  return (
    <div>
      <h2>
        {props.course}
      </h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      {parts.map(part => <Part part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  const {parts} = props
  const numOfExercises = parts.map(part => part.exercises)
  const total = numOfExercises.reduce((a, b) => a + b)
  return (
    <div>
      <p>
        <strong>total of {total} exercises </strong>
      </p> 
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <CourseHeader course = {props.name} />
      <Content parts = {props.parts} />
      <Total parts = {props.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <MainHeader headerText = 'Web development curriculum' />
      {courses.map(course => <Course name={course.name} parts={course.parts} />)}
    </div>
  )
}


export default App