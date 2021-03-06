import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import vastr from './vastrLogo.png';
import classes from './Navbar.module.css';
import { logout } from '../../actions/authAction';

const Navbar = (props) => {
	const history = useHistory();

	const loginLogout = (e) => {
		e.preventDefault();

		if (props.token) {
			props.logout();
			history.push('/login');
		} else {
			history.push('/login');
		}
	};

	return (
		<div className='shadow '>
			<nav className={`navbar navbar-expand-lg navbar-light bg-light p-1`}>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						<img src={vastr} alt='logo' className={classes.logo} />
					</NavLink>
					<div className=' navbar-collapse'>
						<ul className='navbar-nav m-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/'>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/products/shirt'>
									Shirts
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/products/pant'>
									Pants
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/products/saree'>
									Saree
								</NavLink>
							</li>

							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/cart'>
									Cart
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' exact to='/profile'>
									Profile
								</NavLink>
							</li>
							{props.admin && (
								<li className='nav-item'>
									<NavLink className='nav-link' exact to='/admin'>
										Admin page
									</NavLink>
								</li>
							)}
						</ul>
						<form className='d-flex' onClick={loginLogout}>
							<button className='btn btn-outline-success' type='submit'>
								{props.token ? 'Logout' : 'Login'}
							</button>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = (state) => ({
	token: state.auth.token,
	admin: state.auth.admin,
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
