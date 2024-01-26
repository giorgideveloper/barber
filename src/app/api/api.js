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
export const allBarber = async () => {
	try {
		const res = await axios.get(`${baseUrl}/barbery/`);
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

export const workingHours = async () => {
	try {
		const res = await axios.get(`${baseUrl}/time`);
		return res.data.results;
	} catch (err) {
		throw err;
	}
};
export const bookingSmsCode = async mobile => {
	try {
		const res = await axios.post(
			`${baseUrl}/bookings/sms_code/`,
			{
				mobile_number: mobile,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const bookingCreate = async data => {
	try {
		const res = await axios.post(
			`${baseUrl}/bookings/create/`,
			{
				...data,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};
