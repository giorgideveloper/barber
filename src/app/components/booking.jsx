'use client';
import React, { useEffect, useState } from 'react';
import BookingDate from './bookingDate';
import { allBarber, bookingCreate, bookingSmsCode, service } from '../api/api';
import toast from '@/helper/toast';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from './modal';

export default function Booking() {
	const [day, setDay] = useState('');
	const [freeHour, setFreeHour] = useState('');
	const [mobile, setMobile] = useState('');
	const [checkCode, setCheckCode] = useState('');
	const [barber, setBarber] = useState([]);
	const [barberId, setBarberId] = useState('');
	const [barberService, setBarberService] = useState([]);
	//modal
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('შეიიყვაანეთ სმს კოდი');

	const handleCloseModal = () => setShowModal(false);

	const [user, setUser] = useState({
		service: null,
		customer_name: '',
		message: '',
		created_at: new Date(),
	});

	let name, value;

	const data = e => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	//finally object
	let myObg = {
		date: day,
		time: freeHour,
		sms_code: checkCode,
		customer_phone: mobile,
		barbery: barberId,
		...user,
	};

	// Get barber
	const barberData = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarber(res.data.results);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	// Get service
	const getService = async () => {
		try {
			const res = await service();
			if (res.status === 200) {
				setBarberService(res.data.results);
			} else {
				console.log('error service');
			}
		} catch (error) {
			throw error;
		}
	};
	// Post request
	const handleBooking = e => {
		e.preventDefault();
		try {
			sendSms();
		} catch (error) {
			console.log(error);
		}
	};

	//Send sms code
	const sendSms = async () => {
		try {
			if (barberId && day && freeHour && user.service) {
				const res = await bookingSmsCode(mobile);

				if (res.status === 201) {
					setShowModal(true);
					toast('success', 'სმს კოდი გამოგზავნილია');
				} else {
					console.log('error sms code');
				}
			} else {
				toast('error', 'მონიშნეთ ყველა ველიი');
			}
		} catch (err) {
			console.log('error', 'სმს კოდის გამოგზავნა ვერ მოხერხდა');
		}
	};

	// SMS confirmation and booking reservation
	const finalSmsCode = async () => {
		try {
			const res = await bookingCreate(myObg);
			if (res.status === 201) {
				setShowModal(false);
				Swal.fire({
					title: 'ჯავშანი მიღებულია',
					icon: 'success',
				}).then(result => {
					if (result.isConfirmed) {
						window.location = '/';
					}
				});
			}
		} catch (error) {
			toast('error', 'სმს კოდი არასწორია');
		}
	};

	// Get barber
	useEffect(() => {
		barberData();
		getService();
	}, []);
	return (
		<>
			<MyModal
				showModal={showModal}
				handleCloseModal={handleCloseModal} //Todo
				modalTitle={modalTitle}
				setCheckCode={setCheckCode}
				finalSmsCode={finalSmsCode}
			/>
			<form
				className='row g-3 mb-5 needs-validation booking-form'
				onSubmit={handleBooking}
			>
				<div className='barber-checkbox'>
					<div className='row'>
						<h4 className='solid'>აირჩიეთ სერვისი</h4>
						{barberService &&
							barberService.map(result => (
								// eslint-disable-next-line react/jsx-key
								<div className='col-xl-3 col-md-6' key={result.id}>
									{' '}
									<input
										type='checkbox'
										className='btn-check'
										id={`res${result.id}`}
										autoComplete='off'
										onChange={data}
										name='service'
										value={result.id}
									/>
									<label
										className='btn btn-primary'
										htmlFor={`res${result.id}`}
									>
										{result.service_name}
									</label>
								</div>
							))}
					</div>
				</div>

				<div className='col-12 col-md-6 mt-3'>
					<div className='row g-2 '>
						<h4 className='solid'>აირჩიეთ ბარბერი</h4>

						<div className='col-md'>
							<div className='row g-2'>
								<div className='col-md-12'>
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
														required
													/>
													<img src={`${res.image}`} alt='Image 1' />
													{res.barber_name}
												</label>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-md-6 booking-date '>
					<BookingDate
						setFreeHour={setFreeHour}
						setDay={setDay}
						barberId={barberId}
						setCheckCode={setCheckCode}
					/>
				</div>

				<div className='col-12 col-md-6 mt-3'>
					<div className='row mt-3 g-2'>
						<h4 className='solid'>შენი ინფორმაცია</h4>
						<div className='col-md-12'>
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
								<label htmlFor='validationDefault01'> სახელი</label>
							</div>
						</div>
						<div className='col-md'>
							<div className='form-floating'>
								<input
									type='tel'
									className='form-control shadow-sm from-inputs mt-4'
									id='validationCustom01'
									placeholder='ნომერი'
									name='customer_phone'
									onChange={e => setMobile(e.target.value)}
									required
								/>
								<label htmlFor='validationCustom01'>ტელეფონი</label>
								<div className='valid-feedback'>Looks good!</div>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-6  text-area'>
					<div className='form-floating'>
						<textarea
							className='form-control shadow-sm from-inputs'
							placeholder='Leave a comment here'
							id='floatingTextarea2'
							style={{ height: 120 }}
							name='message'
							onChange={data}
						></textarea>
						<label htmlFor='floatingTextarea2' className=''>
							Comments
						</label>
					</div>
				</div>
				<div className='row justify-content-center text-center'>
					<div className='col-md-12 col-12 mt-4'>
						<button type='submit' className='btn btn-primary shadow-sm'>
							ჯავშანის გაკეთება
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
