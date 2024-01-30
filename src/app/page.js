import styles from './page.module.css';
import Booking from './components/booking';

export default function Home() {
	return (
		<main className={styles.main}>
			<div class='container-fluid'>
				<div className='row'>
					<section className='booking-section'>
						<div
							className='row'
							style={{ backgroundSize: '100%; background-repeat: no-repeat;' }}
						>
							<div
								className=' booking-title '
								style={{
									backgroundSize: '100%; background-repeat: no-repeat;',
								}}
							>
								<h1>BOOKING</h1>
								<div
									className='booking-solid'
									style={{
										backgroundSize: '100%; background-repeat: no-repeat;',
									}}
								></div>
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
