import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './Admin.module.css';
import {
	getProductList,
	postProduct,
	deleteProduct,
	incrementProduct,
	decrementProduct,
} from '../../actions/productAction';
import Loading from '../../components/loading/Loading';

const Admin = (props) => {
	const [add, setAdd] = useState(false);
	const [update, setUpdate] = useState(false);
	const [category, setCategory] = useState('');
	const [photo, setPhoto] = useState('');
	const [desc, setDesc] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		props.getProductList();
	}, []);

	useEffect(() => {
		if (props.productError) {
			toast.error(props.productError);
			setUpdate(false);
		}
	}, [props.productError]);

	useEffect(() => {
		if (props.productSuccess && update) {
			toast.success('Product updated successfully');
			setUpdate(false);
		}
		if (props.productSuccess && add) {
			toast.success('Product Added successfully');
			setAdd(false);
		}
	}, [props.productSuccess]);

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(photo);
		setAdd(true);

		if (photo === '') {
			toast.error('choose a photo first');
			return;
		}

		props.postProduct({ photo, desc, quantity, price, category });
		setCategory('');
		setDesc('');
		setPhoto('');
		setPrice(0);
		setQuantity(0);
		document.getElementById('photo').value = null;
	};

	const increment = (productId) => {
		console.log('increase');
		setUpdate(true);
		props.incrementProduct(productId);
	};

	const decrement = (productId, quantity) => {
		console.log('decrease');
		setUpdate(true);
		console.log(quantity);
		if (quantity > 1) {
			props.decrementProduct(productId);
		} else {
			toast.info('cannot make the count 0');
		}
	};

	const deleteItem = (productId) => {
		console.log('delete');
		setUpdate(true);
		props.deleteProduct(productId);
	};

	return (
		<div className={classes.page}>
			<Navbar />
			{props.productLoading && <Loading />}
			<div className={` container `}>
				<ToastContainer />
				<div className={`${classes.addItem} shadow`}>
					<h5>Add an Item</h5>
					<hr />
					<form className='p-3 text-center ' onSubmit={onSubmit}>
						<input
							id='photo'
							type='file'
							className='form-control my-2'
							onChange={(e) => {
								setPhoto(e.target.files[0]);
							}}
							required
						/>
						<input
							type='text'
							placeholder='category of the product'
							className='form-control my-2'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
						/>
						<input
							type='text'
							placeholder='Description of the product'
							className='form-control my-2'
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							required
						/>
						<input
							type='number'
							placeholder='Quantity'
							className='form-control my-2'
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							required
						/>
						<input
							type='number'
							placeholder='Price of One piece'
							className='form-control my-2'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
						<button
							type='submit'
							className='btn btn-outline-success  my-3'
							disabled={props.productLoading}>
							{props.productLoading ? 'Loading...' : 'Add product'}
						</button>
					</form>
				</div>
				<div className={`${classes.items} shadow`}>
					<h5>Items List</h5> <hr />
					{props.productList &&
						props.productList.map((product) => (
							<div className={classes.orderItem} key={product._id}>
								<img src={product.thumbUrl} alt='' className={classes.image} />
								<h6>{product.desc}</h6>
								<div>
									Quantity:{' '}
									<h5>
										<i
											className='fas fa-plus-square fa-2'
											onClick={() => increment(product._id)}></i>{' '}
										{product.quantity}{' '}
										<i
											className='fas fa-minus-square fa-2'
											onClick={() =>
												decrement(product._id, product.quantity)
											}></i>
									</h5>
								</div>
								<div>
									Price: <h5>&#8377;{product.price}</h5>
								</div>
								<i
									className='fas fa-trash-alt text-danger'
									onClick={() => deleteItem(product._id)}
								/>
							</div>
						))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => ({
	productLoading: state.product.loading,
	productSuccess: state.product.success,
	productError: state.product.error,
	productList: state.product.products,
});

const mapDispatchToProps = (dispatch) => ({
	postProduct: (productInfo) => dispatch(postProduct(productInfo)),
	getProductList: () => dispatch(getProductList()),
	decrementProduct: (productId) => dispatch(decrementProduct(productId)),
	incrementProduct: (productId) => dispatch(incrementProduct(productId)),
	deleteProduct: (productId) => dispatch(deleteProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
