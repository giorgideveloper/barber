'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { allBarber, service, usersBookings } from '../api/api';
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
	const [booking, setBookings] = useState([]);
	const [barber, setBarbers] = useState([]);
	const [barberService, setBarberService] = useState([]);
	console.log('🚀 ~ BigCalendar ~ barber:', barber);

	console.log('🚀 ~ BigCalendar ~ booking:', booking);

	const getBookingFc = async () => {
		const res = await usersBookings();
		setBookings(res);
		// const result = res.result;
	};
	const getBarbers = async () => {
		const res = await allBarber();
		setBarbers(res);
	};

	const getService = async () => {
		const res = await service();
		setBarberService(res);
	};
	useEffect(() => {
		getBookingFc();
		getBarbers();
		getService();
	}, []);

	for (const b in booking) {
		for (const n in barberService) {
			if (booking[b].service === barber[n].id) {
				booking[b].barbery = barber[n].barber_name;
			}
		}
	}
	for (const b in booking) {
		for (const n in barber) {
			if (booking[b].service === barberService[n].id) {
				booking[b].service = barberService[n].service_name;
			}
		}
	}
	return (
		<div>
			<Calendar
				localizer={localizer}
				events={booking}
				titleAccessor={booking =>
					`${booking.barbery} - ${booking.service} - ${booking.customer_phone} `
				}
				startAccessor={booking => new Date(booking.date)}
				endAccessor={booking => new Date(booking.date)}
				style={{ height: 500 }}
			/>
		</div>
	);
}
