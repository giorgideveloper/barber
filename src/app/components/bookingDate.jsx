'use client';
import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.css';
import { bookingTime } from '../api/api';
import moment from 'moment';
import Hours from './hours';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ka from 'date-fns/locale/ka';

export default function BookingDate({ setFreeHour, setDay, barberId }) {
	const [timeBooking, setTimeBooking] = useState('');
	const [time, setTime] = useState('');
	const [showHours, setShowHours] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	console.log(
		'🚀 ~ BookingDate ~ startDate:',
		moment(startDate).format().slice(-30, -15)
	);
	useEffect(() => {
		setTime(moment(startDate).format().slice(-30, -15));
	}, [startDate]);

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
	// const options = {
	// 	altInputClass: 'hide',
	// 	dateFormat: 'M d Y',
	// 	minDate: new Date(),
	// 	defaultDate: [],
	// 	locale: {
	// 		weekdays: {
	// 			shorthand: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
	// 			longhand: [
	// 				'კვირა',
	// 				'ორშაბათი',
	// 				'სამშაბათი',
	// 				'ოთხშაბათი',
	// 				'ხუთშაბათი',
	// 				'პარასკევი',
	// 				'შაბათი',
	// 			],
	// 		},
	// 		firstDayOfWeek: 1, // start week on Monday
	// 	},
	// 	onChange: (selectedDates, dateStr, instance) => {
	// 		setTime(moment(dateStr).format().slice(-30, -15));
	// 	},
	// };

	return (
		<div>
			<h4 className='solid'>აირჩიე დრო</h4>
			<div className='row g-1'>
				<div className='col-12 col-xl-12 mt-4'>
					<DatePicker
						selected={startDate}
						onChange={date => setStartDate(date)}
						minDate={new Date()}
						withPortal
					/>
				</div>
				<div className='col-12 col-xl-12'>
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
