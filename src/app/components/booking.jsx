'use client';
import React, { useState } from 'react';
import BookingDate from './bookingDate';
import { bookingCreate } from '../api/api';

export default function Booking() {
	const [day, setDay] = useState('');
	const [freeHour, setFreeHour] = useState('');
	const [user, setUser] = useState({
		service: null,
		customer_name: '',
		customer_phone: '',
		message: '',
		barbery: '',
		created_at: new Date(),
	});

	let myObg = {
		date: day,
		time: freeHour,
		...user,
	};

	let name, value;

	const data = e => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const handleBooking = () => {
		try {
			const res = bookingCreate(myObg);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className='col-12 col-md-6 mt-3'>
				<div className='row g-2'>
					<h3>აირჩიეთ სერვისი</h3>
					<div className='col-md'>
						<div className='form-floating'>
							<select
								className='form-select shadow-sm'
								id='floatingSelectGrid'
								name='service'
								onChange={data}
							>
								<option value='0'>არჩევა</option>
								<option value='1'>თმის შეჭრა</option>
								<option value='2'>წვერის შეჭრა</option>
								<option value='3'>Three</option>
							</select>
							<label htmlFor='floatingSelectGrid'>სერვიზი</label>
						</div>
					</div>
					<div className='col-md'>
						<div className='form-floating'>
							<select
								className='form-select shadow-sm'
								id='floatingSelectGrid'
								name='barbery'
								onChange={data}
							>
								<option value='0'>არჩევა</option>
								<option value='1'>ნინო</option>
								<option value='2'>ჯონი</option>
								<option value='3'>რემბო</option>
							</select>
							<label htmlFor='floatingSelectGrid'>ბარბერი</label>
						</div>
					</div>
				</div>
				<div className='row mt-3 g-2'>
					<h3>შენი ინფორმაცია</h3>
					<div className='col-md'>
						<div className='form-floating'>
							<input
								type='text'
								className='form-control shadow-sm'
								id='floatingInputGrid'
								placeholder='სახელი'
								name='customer_name'
								onChange={data}
							/>
							<label htmlFor='floatingInputGrid'> კლიენტის სახელი</label>
						</div>
					</div>
					<div className='col-md'>
						<div className='form-floating'>
							<input
								type='tel'
								className='form-control shadow-sm'
								id='floatingInputGrid'
								placeholder='ნომერი'
								name='customer_phone'
								onChange={data}
							/>
							<label htmlFor='floatingInputGrid'>კლიენტის ტელეფონი</label>
						</div>
					</div>
					<div className='col-md-12 mt-4'>
						<div className='form-floating'>
							<textarea
								className='form-control shadow-sm'
								placeholder='Leave a comment here'
								id='floatingTextarea2'
								style={{ height: 100 }}
								name='message'
								onChange={data}
							></textarea>
							<label htmlFor='floatingTextarea2'>Comments</label>
						</div>
					</div>
				</div>
			</div>
			<BookingDate setFreeHour={setFreeHour} setDay={setDay} />
			<div className='row'>
				<div className='col-md-6 col-12 mt-4'>
					<button
						type='button'
						onClick={handleBooking}
						className='btn btn-success shadow-sm'
					>
						ჯავშანის გაკეთება
					</button>
				</div>
			</div>
		</>
	);
}
