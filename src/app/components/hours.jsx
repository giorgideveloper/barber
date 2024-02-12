import React, { useEffect, useState } from 'react';
import { workingHours } from '../api/api';
import DisabledTooltip from './tooltip';

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
					<div className='d-inline ' key={index}>
						<DisabledTooltip
							booking={booking}
							setFreeHour={setFreeHour}
							index={index}
						/>
					</div>
				))}
		</div>
	);
}
