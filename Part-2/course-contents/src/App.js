import React from 'react';

const Total = ({ parts }) => {

const reducer = (acc, curr) => acc + curr;
const totalValue = parts.map(el => el.exercises).reduce(reducer)

return <b>Number of exercises {totalValue}</b>;
}

const Part = ({ name, number }) => {

  return <p>{name} {number}</p>;
}


const Content = ({ parts }) => {

  const content = () => parts.map(part => {
    return <Part key={part.id} name={part.name} number={part.exercises} />;
  })

  return content();
}


const Header = ({ name }) => {

  return <h2>{name}</h2>;
}


const Course = ({ course }) => {

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
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
      <h1>Web development curriculum</h1>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  )
}

export default App;
