import React, {Component} from 'react';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	}


	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () => {
		fetch('http://localhost:3001/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user) {
				this.props.loadUser(user);
				this.props.onRouteChange('signin');
			}
		})	
	}


	render(){
		return(
			<div className="modal d-block text-center">
		      <div className="modal-dialog">
		        <div className="modal-content">
		          <div className="modal-header d-block">
		            <h5 className="modal-title text-dark ">Register</h5>
		          </div>
		          <div className="modal-body">
		            
		              <div className="form-group">
		                <label className="d-flex text-dark">Username</label>
		                <input type="text" placeholder="Username" onChange={this.onNameChange} className="form-control"/>
		              </div>
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
		            <button className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmitRegister}>Register</button>
		          </div>
		        </div>
		      </div>
		    </div>
		);
	}
}

export default Register;