import axios from 'axios';

const baseUrl = 'https://barbery.lumos.com.ge/booking';

export const usersBookings = async () => {
	try {
		const res = await axios.get(`${baseUrl}/bookings`);
		return res.data.results;
	} catch (err) {
		throw err;
	}
};

export const bookingTime = async time => {
	try {
		const res = await axios.get(`${baseUrl}/booking-times/?date=${time}`);
		return res.data.results;
	} catch (err) {
		throw err;
	}
};

export const bookingHours = async () => {
	try {
		const res = await axios.get(`${baseUrl}/time`);
		return res.data.results;
	} catch (err) {
		throw err;
	}
};
