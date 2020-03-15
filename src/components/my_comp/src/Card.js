import React from 'react';

const Card = ({ name, email,id, value1, value2 }) => {
	//const { name, email,id } = props;
	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
		<img alt='photo' src={`https://robohash.org/${id}?200x200`} />
		<div>
			<h2>{name}</h2>
			<p>{value1}</p>
			<p>{value2}</p>
			<p>value_3</p>
			<p>value_4</p>
			<p>value_5</p>
		</div>
		</div>
	);
}

export default Card;