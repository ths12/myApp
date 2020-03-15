import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
	return (
	<div>
		{
		robots.map((user, i) => {
		return (
			<Card 
			key={i} 
			id={robots[i].id} 
			name={robots[i].name} 
			email={robots[i].email}
			value1={robots[i].value1}
			value2={robots[i].value2}
			/>
		)
		})
		}
	</div>
	);
};

export default CardList;