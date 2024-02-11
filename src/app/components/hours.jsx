import React, { useEffect, useState } from 'react';
import { workingHours } from '../api/api';

export default function Hours({ bookings, setFreeHour }) {
	const [hours, setHours] = useState([]);

	useEffect(() => {
		const fetchTime = async () => {
			try {
				const response = await workingHours();
				if (response.status === 200) {
					setHours(response.data.results);
				} else {
					console.log('error workingHours');
				}
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
		<div className='mt-3 hours-checkbox  '>
			<h4 className='solid'>მონიშნე დრო</h4>
			{finalBookings &&
				finalBookings?.map((booking, index) => (
					// eslint-disable-next-line react/jsx-key
					<div className={`d-inline `} key={index}>
						<input
							key={index}
							type='radio'
							className={`btn-check  `}
							name='options' // TODO
							id={index} // TODO
							autoComplete='off'
							value={booking.id}
							disabled={booking.booked}
							onChange={e => setFreeHour(e.target.value)}
						/>
						{}

						<label
							className={`btn btn-primary my-radio ${
								booking.booked ? 'tooltips' : ''
							}`}
							htmlFor={index}

							// TODO
						>
							{booking.booked ? (
								<span className='tooltiptext'>დაკავებულია</span>
							) : (
								''
							)}
							{booking.time.slice(0, 5)}
						</label>
					</div>
				))}
		</div>
	);
}
