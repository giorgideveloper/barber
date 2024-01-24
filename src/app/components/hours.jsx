import React, { useEffect, useState } from 'react';
import { workingHours } from '../api/api';

export default function Hours({ showHours, bookings, setFreeHour }) {
	const [hours, setHours] = useState([]);

	useEffect(() => {
		const fetchTime = async () => {
			try {
				const response = await workingHours();
				setHours(response);
			} catch (err) {
				console.log(err);
			}
		};
		fetchTime();
	}, []);

	let finalBookings = [];

	for (const hour in hours) {
		let isBooked = false;
		for (const booking in bookings) {
			if (hours[hour].time == bookings[booking].time_for_booking) {
				isBooked = true;
			}
		}

		finalBookings.push({
			id: hours[hour].id,
			time: hours[hour].time,
			booked: isBooked,
		});
	}

	return (
		<div>
			{showHours
				? finalBookings &&
				  finalBookings?.map((booking, index) => (
						<>
							<input
								type='radio'
								className='btn-check my-radio'
								name='options' // TODO
								id={index} // TODO
								autoComplete='off'
								value={booking.id}
								disabled={booking.booked}
								onChange={e => setFreeHour(e.target.value)}
							/>
							<label
								className='btn btn-secondary my-radio'
								htmlFor={index}
								// TODO
							>
								{booking.time.slice(0, 5)}
							</label>
						</>
				  ))
				: ''}
		</div>
	);
}
