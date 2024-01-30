import styles from './page.module.css';
import Booking from './components/booking';

export default function Home() {
	return (
		<main className={styles.main}>
			<div className='container-fluid'>
				<div className='row'>
					<section className='booking-section'>
						<div className='row'>
							<div className=' booking-title '>
								<h1>BOOKING</h1>
								<div className='booking-solid'></div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className='container'>
				<div className='row justify-content-center'>
					<Booking />
				</div>
			</div>
		</main>
	);
}
