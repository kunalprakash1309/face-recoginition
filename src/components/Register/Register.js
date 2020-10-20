import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }
    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitRegister = () => {
        fetch('https://pacific-fortress-76303.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            // this.props.loadUser(user)
        }).catch(err => console.log(err))    

        this.props.onRouteChange('signin')
    }

    render() { 
        return (
            <article className="br2 ba b--black-10 nv4 w-100 w-50-m w-25-l nw5 shadow-5 center">
                <main className="pa4 black-80 center">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name"  required/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"  required/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                            </div>
                            <div className="lh-copy mt3">
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}


export default Register