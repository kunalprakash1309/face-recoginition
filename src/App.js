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
import { tsImportEqualsDeclaration } from '@babel/types';

const app = new Clarifai.App({
    apiKey: 'bfb45b53c1764e25a1ee93ce76b98959'
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
        }
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
        console.log(box)
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

        console.log('hello')
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err))
    }

    onRouteChange = (name) => {
        console.log(this.state.route)

        this.setState({
            route: name
        }, function() {
            if (this.state.route === 'home'){
                this.setState({
                    isSignedIn: true
                })
            }else if (this.state.route === 'signin' || this.state.route === 'register'){
                this.setState({
                    isSignedIn: false
                })
            }
        })

        console.log(this.state.route)
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
                        <Rank />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onSubmit={this.onSubmit}
                        />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                    </div>
                   : (
                       this.state.route === 'signin'?
                       <SignIn onRouteChange={this.onRouteChange} /> :
                       <Register onRouteChange={this.onRouteChange} />
                   )
                    
                }
            </div>
        )
    }
}

export default App;
