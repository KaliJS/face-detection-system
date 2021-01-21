import React, {Component} from 'react';

class SignIn extends Component {
	state = {
		
		SignInEmail: '',
		SignInPassword: ''

	}

	onEmailChange = (event) => {
		this.setState({SignInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({SignInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3001/login', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.SignInEmail,
				password: this.state.SignInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user) {
				console.log(user);
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})	
	}


	render(){
		return(
			<div className="modal d-block text-center">
		      <div className="modal-dialog">
		        <div className="modal-content">
		          <div className="modal-header d-block">
		            <h5 className="modal-title text-dark ">Sign In</h5>
		          </div>
		          <div className="modal-body">
		            
		              <div className="form-group">
		                <label className="d-flex text-dark">Email</label>
		                <input type="email" placeholder="Enter Email" onChange={this.onEmailChange} className="form-control"/>
		              </div>
		              <div className="form-group">
		                <label className="d-flex text-dark">Password</label>
		                <input type="password" placeholder="Password" onChange={this.onPasswordChange} className="form-control"/>
		              </div>
		            
		          </div>
		          <div className="modal-footer d-block">
		            <button className="btn btn-primary mr-0" data-dismiss="modal"
		                    onClick={this.onSubmitSignIn}>Login</button>
		            <p className="text-dark ml-0 mt-2" id="regis" 
		               onClick={()=>this.props.onRouteChange('register')}>Register</p>
		          </div>
		        </div>
		      </div>
		    </div>
		);
	}
}

export default SignIn;