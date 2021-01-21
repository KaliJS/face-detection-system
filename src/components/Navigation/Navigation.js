import React from 'react';
import './Navigation.css';

const Navigation = (props) => {
	if(props.isSignIn){
		return(
			<nav className="Navigation">
				<p id="signout" onClick={()=>{props.onRouteChange('signout')}}>Sign Out</p>
			</nav>
		);
	}
	else{
		return(
			<nav className="Navigation">
				<p id="signin" className="mr-4" onClick={()=>{props.onRouteChange('signin')}}>Sign In</p>
				<p id="register" onClick={()=>{props.onRouteChange('register')}}>Register</p>
			</nav>
		);
	}
	    
};

export default Navigation;