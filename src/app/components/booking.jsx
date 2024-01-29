'use client';
import React, { useEffect, useState } from 'react';
import BookingDate from './bookingDate';
import { allBarber, bookingCreate, bookingSmsCode } from '../api/api';
import toast from '@/helper/toast';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Booking() {
	const router = useRouter();
	const [day, setDay] = useState('');
	const [freeHour, setFreeHour] = useState('');
	const [mobile, setMobile] = useState('');
	const [smsCodeStatus, setSmsCodeStatus] = useState(false);
	const [checkCode, setCheckCode] = useState('');
	const [barber, setBarber] = useState('');
	const [barberId, setBarberId] = useState('');

	const [user, setUser] = useState({
		service: null,
		customer_name: '',
		message: '',
		created_at: new Date(),
	});

	let myObg = {
		date: day,
		time: freeHour,
		sms_code: checkCode,
		customer_phone: mobile,
		barbery: barberId,
		...user,
	};

	let name, value;

	const data = e => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const sendSms = () => {
		try {
			if (bookingSmsCode(mobile)) {
				setSmsCodeStatus(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const finalSmsCode = () => {
		bookingCreate(myObg);
		Swal.fire({
			title: 'ჯავშანი მიღებულია',
			icon: 'success',
		}).then(result => {
			if (result.isConfirmed) {
				window.location = '/';
			}
		});
	};

	// Post request
	const handleBooking = () => {
		try {
			// bookingCreate(myObg);
			sendSms();
			toast('success', 'სმს კოდი გამოგზავნილია');
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	// Get barber
	useEffect(() => {
		const barberData = async () => {
			const res = await allBarber();

			setBarber(res);
		};
		barberData();
	}, []);
	return (
		<>
			{smsCodeStatus ? (
				<div className='row justify-content-center mt-5'>
					<div className='col-12 col-md-6 col-xl-3'>
						<h5 className='text-center'>შეიყვანეთ სმს კოდი</h5>
						<div className='input-group mb-3'>
							<input
								type='text'
								className='form-control'
								placeholder='Sms Code'
								aria-describedby='button-addon2'
								onChange={e => setCheckCode(e.target.value)}
							/>
							<button
								className='btn btn-outline-secondary'
								type='button'
								id='button-addon2'
								onClick={finalSmsCode}
							>
								გაგზავნა
							</button>
						</div>
					</div>
				</div>
			) : (
				<>
					<form
						className='row g-3 mb-5 needs-validation booking-form'
						onSubmit={handleBooking}
						novalidate
					>
						<div className='col-12 col-md-6 mt-3'>
							<div className='row g-2'>
								<h4 className='solid'>აირჩიეთ სერვისი</h4>
								<div className='col-md '>
									<div className='form-floating  '>
										<select
											className='form-select shadow-sm from-inputs '
											id='validationCustom01'
											name='service'
											onChange={data}
											required
										>
											<option value='0'>არჩევა</option>
											<option value='1'>თმის შეჭრა</option>
											<option value='2'>წვერის შეჭრა</option>
											<option value='3'>Three</option>
										</select>
										<label htmlFor='validationCustom01 '>სერვიზი</label>
										<div className='valid-feedback'>Looks good!</div>
									</div>
								</div>
							</div>

							<div className='row mt-3 g-2'>
								<h4 className='solid'>შენი ინფორმაცია</h4>
								<div className='col-md'>
									<div className='form-floating'>
										<input
											type='text'
											className='form-control from-inputs shadow-sm'
											id='validationDefault01'
											placeholder='სახელი'
											name='customer_name'
											onChange={data}
											required
										/>
										<label htmlFor='validationDefault01'>
											{' '}
											კლიენტის სახელი
										</label>
									</div>
								</div>
								<div className='col-md'>
									<div className='form-floating'>
										<input
											type='tel'
											className='form-control shadow-sm from-inputs'
											id='validationCustom01'
											placeholder='ნომერი'
											name='customer_phone'
											onChange={e => setMobile(e.target.value)}
											required
										/>
										<label htmlFor='validationCustom01'>
											კლიენტის ტელეფონი
										</label>
										<div className='valid-feedback'>Looks good!</div>
									</div>
								</div>
								<div className='col-md-12 mt-4'>
									<div className='form-floating'>
										<textarea
											className='form-control shadow-sm from-inputs'
											placeholder='Leave a comment here'
											id='floatingTextarea2'
											style={{ height: 100 }}
											name='message'
											onChange={data}
										></textarea>
										<label htmlFor='floatingTextarea2' className=''>
											Comments
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6  mt-3'>
							<div className='row g-2 '>
								<h4 className='solid'>აირჩიეთ ბარბერი</h4>

								<div className='col-md'>
									<div className='row'>
										<div className='col-md-12 '>
											<div className='mt-3 d-flex barber-radio'>
												{barber &&
													barber?.map(res => (
														// eslint-disable-next-line react/jsx-key
														<label key={res.id}>
															<input
																type='radio'
																name='bookmarked_images'
																value={res.id}
																onChange={e => setBarberId(e.target.value)}
															/>
															<img
																src='https://cdn4.vectorstock.com/i/1000x1000/53/48/trendy-barber-man-vector-35975348.jpg'
																alt='Image 1'
															/>
															{res.barber_name}
														</label>
													))}
											</div>
										</div>
									</div>
								</div>
							</div>
							<BookingDate
								setFreeHour={setFreeHour}
								setDay={setDay}
								barberId={barberId}
							/>
						</div>
						<div className='row'>
							<div className='col-md-6 col-12 mt-4'>
								<button type='submit' className='btn btn-success shadow-sm'>
									ჯავშანის გაკეთება
								</button>
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
}
