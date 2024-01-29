'use client';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { bookingTime } from '../api/api';
import moment from 'moment';
import Hours from './hours';

export default function BookingDate({ setFreeHour, setDay, barberId }) {
	const [timeBooking, setTimeBooking] = useState('');
	const [time, setTime] = useState('');
	const [showHours, setShowHours] = useState(false);

	useEffect(() => {
		const fetchTime = async () => {
			try {
				if (barberId) {
					const response = await bookingTime(time, barberId);
					setTimeBooking(response);
				}
			} catch (err) {
				console.log(err);
			}
		};
		setDay(time);
		fetchTime();
	}, [time, barberId, setDay]);

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
		<div>
			<h4 className='solid'>აირჩიე დრო</h4>
			<div className='row'>
				<div className='col-12 col-xl-6 '>
					<Flatpickr hidden options={options} />
				</div>
				<div className='col-12 col-xl-6'>
					{' '}
					<Hours
						showHours={showHours}
						bookings={timeBooking}
						setFreeHour={setFreeHour}
					/>
				</div>
			</div>
		</div>
	);
}
