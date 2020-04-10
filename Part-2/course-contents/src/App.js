import React from 'react';

const Total = ({ parts }) => {

  return <b>Number of exercises {parts[0].exercises 
    + parts[1].exercises 
    + parts[2].exercises
    + parts[3].exercises}</b>;
}

const Part = ({ name, number }) => {

  return <p>{name} {number}</p>;
}


const Content = ({ parts }) => {

  return (
    <>
      <Part name={parts[0].name} number={parts[0].exercises} />
      <Part name={parts[1].name} number={parts[1].exercises} />
      <Part name={parts[2].name} number={parts[2].exercises} />
      <Part name={parts[3].name} number={parts[3].exercises} />
    </>
  );
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
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
