import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 apiKey: 'd1157d359ef04be0a6f4e190faca0bda'
});

const particlesOptions = {
  particles: {
    number: {
      value: 55,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001')
      .then(response => response.json())
      .then(console.log)
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data._id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
    console.log(this.state.user.id);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignIn:false})
    }else if(route === 'home'){
      this.setState({isSignIn:true})
    }
    this.setState({route: route})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChangeHandler = (event) => {
      //console.log(event.target.value);
      this.setState({input:event.target.value});
  }

  onPictureSubmit = (input) => {
      this.setState({imageUrl:this.state.input});
      console.log('currnet user id '+this.state.user.id);
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response=>{
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState(Object.assign(this.state.user, {entries: data.entries}))         
          }) 
        }
           this.displayFaceBox(this.calculateFaceLocation(response))
        }  
      ).catch(err=>{
        console.log(err);
      })     
  }
  render(){
    return (
      <div className="App">
          <Particles className='particles' params={particlesOptions}/>
           <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home'?
            <div>
                <Logo/>
                <Rank
                  activeUser={this.state.user.name} 
                  userEntries={this.state.user.entries} 
                    />
                <ImageLinkForm onInputChangeHandler={this.onInputChangeHandler}
                onPictureSubmit={this.onPictureSubmit}/>
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
              </div>
            
            :(
              this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
             )        
          }
             
      </div>
    );
  }
}

export default App;
