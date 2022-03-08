import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

function CartModal(props) {
	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			backdrop='static'
			keyboard={false}
			centered
		>
			<Modal.Body className='d-flex flex-column justify-content-center align-items-center text-success'>
				Thank you for ordering, please wait while we verify your order
				<Spinner animation='border' variant='success' />
			</Modal.Body>
		</Modal>
	);
}

export default CartModal;
