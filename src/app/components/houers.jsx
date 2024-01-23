import React, { useEffect, useState } from 'react';
import { bookingHours } from '../api/api';

export default function Houers({ timeBooking }) {
	const [time, setTime] = useState('');

	useEffect(() => {
		const fetchTime = async () => {
			try {
				const response = await bookingHours();
				setTime(response);
			} catch (err) {
				console.log(err);
			}
		};
		fetchTime();
	}, []);
	console.log(timeBooking);
	return (
		<div>
			{timeBooking.length > 0
				? time &&
				  time?.map(res => (
						<>
							<input
								type='radio'
								className='btn-check my-radio'
								name='options'
								id='option2'
								autoComplete='off'
							/>
							<label className='btn btn-secondary my-radio' htmlFor='option2'>
								{res.time_for_booking.slice(0, 5)}
							</label>
						</>
				  ))
				: ''}
		</div>
	);
}
