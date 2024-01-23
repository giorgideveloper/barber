'use client';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { bookingTime } from '../api/api';
import moment from 'moment';
import Houers from './houers';

export default function BookingDate() {
	const [timeBooking, setTimeBooking] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		const fetchTime = async () => {
			try {
				const response = await bookingTime(time);
				setTimeBooking(response);
			} catch (err) {
				console.log(err);
			}
		};
		fetchTime();
	}, [time]);

	console.log(timeBooking);

	//Flatpickr options
	const options = {
		inline: true,
		altInputClass: 'hide',
		dateFormat: 'M d Y',
		minDate: new Date(),
		defaultDate: [],
		onChange: (selectedDates, dateStr, instance) =>
			setTime(moment(dateStr).format().slice(-30, -15)),
	};

	return (
		<div className='col-6 mt-3'>
			<h3>აირჩიე დრო</h3>
			<div className='row'>
				<div className='col-6'>
					<Flatpickr hidden options={options} />
				</div>
				<div className='col-6'>
					{' '}
					<Houers timeBooking={timeBooking} />
				</div>
			</div>
		</div>
	);
}
