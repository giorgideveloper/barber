import styles from './page.module.css';
import Booking from './components/booking';

export default function Home() {
	return (
		<main className={styles.main}>
			<Booking />
		</main>
	);
}
