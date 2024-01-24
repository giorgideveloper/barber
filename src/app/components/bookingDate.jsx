'use client';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { bookingTime } from '../api/api';
import moment from 'moment';
import Hours from './hours';

export default function BookingDate() {
	const [timeBooking, setTimeBooking] = useState('');
	const [time, setTime] = useState('');
	const [showHours, setShowHours] = useState(false);

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

	//Flatpickr options
	const options = {
		inline: true,
		altInputClass: 'hide',
		dateFormat: 'M d Y',
		minDate: new Date(),
		defaultDate: [],
		locale: {
			weekdays: {
				shorthand: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
				longhand: [
					'კვირა',
					'ორშაბათი',
					'სამშაბათი',
					'ოთხშაბათი',
					'ხუთშაბათი',
					'პარასკევი',
					'შაბათი',
				],
			},
			firstDayOfWeek: 1, // start week on Monday
		},
		onChange: (selectedDates, dateStr, instance) => {
			setTime(moment(dateStr).format().slice(-30, -15)), setShowHours(true);
		},
	};

	return (
		<div className='col-12 col-md-6  mt-3'>
			<h3>აირჩიე დრო</h3>
			<div className='row'>
				<div className='col-12 col-xl-6'>
					<Flatpickr hidden options={options} />
				</div>
				<div className='col-12 col-xl-6'>
					{' '}
					<Hours showHours={showHours} bookings={timeBooking} />
				</div>
			</div>
		</div>
	);
}
