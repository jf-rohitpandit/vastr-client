import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import classes from './Login.module.css';
import { login } from '../../actions/authAction';
import Loading from '../../components/loading/Loading';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (props.authError) {
			toast.error(props.authError);
		}

		if (props.authSuccess) {
			props.history.push('/');
		}
	}, [props.authError, props.authSuccess]);

	const onSubmit = (e) => {
		e.preventDefault();

		//removing spaces from email and password
		setEmail((email) => email.trim());
		setPassword((password) => password.trim());

		if (!email || !password) {
			toast.error('Enter email and password');
		}

		props.login({ email, password });
	};

	const togglePassword = () => {
		setShowPassword((state) => !state);
	};

	return (
		<div className={classes.page}>
			<Navbar />
			<div className=''>
				<ToastContainer />
				{props.authLoading && <Loading />}
				<div className='p-5'>
					<div className='container bg-white p-3 w-50 shadow '>
						<div className='d-flex justify-content-center'>
							<i className='far fa-user fa-5x m-auto p-4 text-white bg-dark border rounded-circle'></i>
						</div>
						<h2 className='text-center'>Login</h2>
						<hr />
						<form className='p-3' onSubmit={onSubmit}>
							<input
								type='email'
								className='form-control my-3'
								placeholder='example@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<div className={classes.password}>
								<input
									type={showPassword ? 'text' : 'password'}
									className={`form-control my-3  `}
									placeholder='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									minLength='6'
								/>
								{showPassword ? (
									<i
										className={`fas fa-eye  my-3 ${classes.eye}`}
										onClick={togglePassword}
									/>
								) : (
									<i
										className={`fas fa-eye-slash my-3   ${classes.eye}`}
										onClick={togglePassword}
									/>
								)}
							</div>
							<button type='submit' className='btn btn-success btn-block'>
								Login
							</button>
						</form>
						<p className='text-center'>
							New user? <Link to='/signup'>Register here!</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => ({
	authLoading: state.auth.loading,
	authSuccess: state.auth.success,
	authError: state.auth.error,
	authtoken: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
	login: (userInfo) => dispatch(login(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
