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

export default Course;
