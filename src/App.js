import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
//import FaceRecognition from './components/FaceRecognition/FaceRecognition';
//import Logo from './components/Logo/Logo';
//import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
//import Rank from './components/Rank/Rank';
import './App.css';
import MyComp from './components/my_comp/my_comp';
import CardList from './components/my_comp/src/CardList';
import SearchBox from './components/my_comp/src/SearchBox';
//import Scroll from './components/my_comp/src/Scroll';
import {robots} from './components/my_comp/src/robots';

const app = new Clarifai.App({
 apiKey: '880b1faefee04bec944fc09483d962d3'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    move: {
      speed: 7
    },
    size: {
      value: 2.5
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '' 
      },
      robots: robots,
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined       
    }})
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

  displayFaceBox = (box) => {
    this.setState({box: box});
  } 

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    return (
      <div className="App">
            <Particles className='particles'
              params={particlesOptions}
            />     
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              {/*<Logo />*/}
              {/*<MyComp />*/}
              <h1 className='f1'>Value</h1>
              <h1 className='f3 navy'>This app shows list of companies and their competitive advantages.</h1>
              <SearchBox searchchange={this.onSearchChange} />
              {/*<Scroll>*/}
              <CardList robots={filteredRobots}/>
              {/*</Scroll>*/}
              {/*<Rank name={this.state.user.name} entries={this.state.user.entries}/>*/}
              {/*<ImageLinkForm
               onInputChange={this.onInputChange}
               onButtonSubmit={this.onButtonSubmit} />*/}
              {/*<FaceRecognition box={box} imageUrl={imageUrl}/>*/}
            </div>
            : (
                route === 'signin'
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )        
        }
      </div>
    );
  }
}

export default App;
