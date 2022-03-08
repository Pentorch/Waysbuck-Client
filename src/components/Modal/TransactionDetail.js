import React from 'react';
import { Col, ListGroup, Modal, Row, Image } from 'react-bootstrap';
import QRCode from 'qrcode.react';

const TransactionDetail = ({ show, payload, handleClose }) => {
	const formatPrice = (price) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	}

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const date = !payload ? null : new Date(payload.createdAt);
	return !payload ? (
		''
	) : (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header className='d-flex justify-content-center'>
				<Modal.Title>
					<strong className='text-overide'>{days[date.getDay()]}</strong>, {date.getDate()}{' '}
					{months[date.getMonth()]} {date.getFullYear()}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='p-5'>
				<Row>
					<Col md={8} style={{ height: '500px', overflowY: 'auto' }}>
						<h1 className='text-overide'>Transaction Detail</h1>
						<h3 className='mt-4 text-overide'>Buyer Account</h3>
						<hr />
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<strong className='text-overide-2'>Full Name : </strong>
								{payload.User.fullName}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Email : </strong>
								{payload.User.email}
							</ListGroup.Item>
						</ListGroup>
						<h3 className='mt-4 text-overide'>Shipping Detail</h3>
						<hr />
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<strong className='text-overide-2'>Name : </strong>
								{payload.name}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Email : </strong>
								{payload.email}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Phone : </strong>
								{payload.phone}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Address : </strong>
								{payload.address}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Zip Code : </strong>
								{payload.postCode}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Status : </strong>
								{payload.status}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-overide-2'>Total : </strong>
								{formatPrice(payload.income)}
							</ListGroup.Item>
						</ListGroup>
						<h3 className='mt-4 text-overide'>Products Detail</h3>
						<hr />
						<div className='px-2'>
							{!payload
								? ''
								: payload.TransactionProducts.map((transactionProduct) => (
										<Row
											style={{
												borderRadius: '10px',
												backgroundColor: '#F6DADA',
											}}
											className='d-flex align-items-center mb-3 p-2'
											id='transaction'
											key={transactionProduct.id}
										>
											<Col className='d-flex flex-column text-overide'>
												<Row id='product' key={transactionProduct.id} className='my-1'>
													<Col md={3}>
														<Image
															src={transactionProduct.Product.image}
															style={{
																width: '80px',
																height: '100px',
																objectFit: 'cover',
																objectPosition: 'center',
																borderRadius: '5px',
															}}
														/>
													</Col>
													<Col md={9}>
														<h5 className=''>{transactionProduct.Product.name}</h5>
														<p className='mb-0' style={{ fontSize: '13px' }}>
															{transactionProduct.TransactionToppings.length < 1 ? (
																<>
																	<span className='text-overide-2'>No Topping</span>
																</>
															) : (
																<>
																	<span className='fw-bold text-overide-2'>Topping: </span>
																	{transactionProduct.TransactionToppings.map(
																		(topping) => topping.Topping.name
																	).join(', ')}
																</>
															)}
														</p>
														<p
															className='text-overide-2 d-flex justify-content-between'
															style={{ fontSize: '14px' }}
														>
															<span>Qty : {transactionProduct.qty}</span>
															<span>
																Subtotal :{' '}
																{formatPrice(
																	transactionProduct.TransactionToppings.map(
																		(selectedTopping) => selectedTopping.Topping.price
																	).reduce((prev, curr) => prev + curr, transactionProduct.Product.price) *
																		transactionProduct.qty
																)}
															</span>
														</p>
													</Col>
												</Row>
											</Col>
										</Row>
								  ))}
						</div>
						<h3 className='mt-4 text-overide'>Transaction Attachment</h3>
						<hr />
						<Image src={payload.attachment} width='100%' />
					</Col>
					<Col md={4} className='d-flex flex-column align-items-center justify-content-evenly'>
						<Image src={`${process.env.PUBLIC_URL}/assets/img/Logo.svg`} className='mb-2' width='180px' />
						<QRCode
							value={`http://localhost:5000/api/v1/transaction/${payload.id}`}
							className='mb-2 p-1 bg-white rounded'
							size={200}
							renderAs='svg'
						/>
						<div
							style={{
								fontSize: '20px',
								borderRadius: '10px',
								width: '100%',
							}}
							className={
								payload.status === 'Waiting Approval'
									? 'text-wa bg-wa p-1 mb-1 text-center text-nowrap'
									: payload.status === 'On The Way'
									? 'text-otw bg-otw p-1 mb-1 text-center text-nowrap'
									: payload.status === 'Success'
									? 'text-scs bg-scs p-1 mb-1 text-center text-nowrap'
									: 'text-cancel bg-cancel p-1 mb-1 text-center text-nowrap'
							}
						>
							{payload.status}
							{ {payload.status === 'On The Way' ? (
								<div className='my-1'>
									{
										<Button variant='success' onClick={(e) => handleReceive(payload.id, e)}>
											Confirm Receive
										</Button>
									}
								</div>
							) : (
								''
							)}}
						</div>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}

export default TransactionDetail;
