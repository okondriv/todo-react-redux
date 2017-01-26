import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
	return (
		<nav>
			<div className="main-menu">
				<IndexLink to="/" activeClassName="active">Home</IndexLink>
				{" | "}
				<Link to="/items" activeClassName="active">ToDo Items</Link>
				{" | "}
				<Link to="/about" activeClassName="active">About</Link>
				{loading && <LoadingDots interval={100} dots={20} />}
			</div>
			<div className="register-block">
				<Link to="/registration" activeClassName="active">Registration</Link>
				{" | "}
				<Link to="/login" activeClassName="active">Login</Link>
			</div>
		</nav>
	);
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;