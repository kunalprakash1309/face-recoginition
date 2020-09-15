import React from 'react';
import 'tachyons'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/SingIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecoginition.js'
import './App.css';

const app = new Clarifai.App({
    apiKey: 'abf02afd47ae423d8e7f6eb860ab7956'
});

const particlesProperties = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 600
            }
        }
    }
}

class App extends React.Component {
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
            }
        }
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
            rightCol: width - (clarifaiFace.right_col *width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {

        this.setState({
            box: box
        })
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    onSubmit = () => {
        this.setState({
            imageUrl: this.state.input
        })
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => {
                if(response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}))
                    })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
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
        return(
            <div>
                <Particles 
                    className="particles" 
                    params={particlesProperties}     
                />
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                { this.state.route === 'home' ?
                    <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onSubmit={this.onSubmit}
                        />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                    </div>
                   : (
                       this.state.route === 'signin'?
                       <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                       <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                   )
                    
                }
            </div>
        )
    }
}

export default App;
