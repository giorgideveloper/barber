import styles from './page.module.css';
import Booking from './components/booking';
import BookingDate from './components/bookingDate';

export default function Home() {
	return (
		<main className={styles.main}>
			<div className='container'>
				<div className='row'>
					<h2 className='text-center mt-3'>Booking Barber</h2>
					<Booking />
					<BookingDate />
				</div>
			</div>
		</main>
	);
}
