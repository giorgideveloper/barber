'use client';
import { Button, Modal } from 'react-bootstrap';

const MyModal = ({
	showModal,
	handleCloseModal,
	modalTitle,
	setCheckCode,
	finalSmsCode,
}) => {
	const generateModalContent = () => (
		<input
			type='text'
			className='form-control modal-input'
			placeholder='Sms Code'
			aria-describedby='button-addon2'
			onChange={e => setCheckCode(e.target.value)}
		/>
	);
	return (
		<Modal
			show={showModal}
			onHide={handleCloseModal}
			backdrop='static'
			keyboard={false}
			centered
		>
			<Modal.Header>
				<Modal.Title>{modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{generateModalContent()}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={finalSmsCode}>
					გაგზავნა
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;
