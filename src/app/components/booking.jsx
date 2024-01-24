import React from 'react';

export default function Booking() {
	return (
		<div className='col-12 col-md-6 mt-3'>
			<div className='row g-2'>
				<h3>აირჩიეთ სერვისი</h3>
				<div className='col-md'>
					<div className='form-floating'>
						<select className='form-select' id='floatingSelectGrid'>
							<option value='1'>თმის შეჭრა</option>
							<option value='2'>წვერის შეჭრა</option>
							<option value='3'>Three</option>
						</select>
						<label htmlFor='floatingSelectGrid'>სერვიზი</label>
					</div>
				</div>
				<div className='col-md'>
					<div className='form-floating'>
						<select className='form-select' id='floatingSelectGrid'>
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
							className='form-control'
							id='floatingInputGrid'
							placeholder='სახელი'
						/>
						<label htmlFor='floatingInputGrid'> კლიენტის სახელი</label>
					</div>
				</div>
				<div className='col-md'>
					<div className='form-floating'>
						<input
							type='tel'
							className='form-control'
							id='floatingInputGrid'
							placeholder='ნომერი'
						/>
						<label htmlFor='floatingInputGrid'>კლიენტის ტელეფონი</label>
					</div>
				</div>
				<div className='col-md-12 mt-4'>
					<div className='form-floating'>
						<textarea
							className='form-control'
							placeholder='Leave a comment here'
							id='floatingTextarea2'
							style={{ height: 100 }}
						></textarea>
						<label htmlFor='floatingTextarea2'>Comments</label>
					</div>
				</div>
			</div>
		</div>
	);
}
