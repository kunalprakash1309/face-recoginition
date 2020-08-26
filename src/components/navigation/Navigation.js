import React from 'react';

const Navigation = (props) => {
    if (props.isSignedIn){
        return (
            <nav className="nav">
                <p onClick={() => props.onRouteChange('signin')} className="link sign-in">Sign Out</p>
            </nav>
        )
    }else {
        return (
            <nav className="nav">
                <p onClick={() => props.onRouteChange('register')} className="link sign-in">Register</p>
                <p onClick={() => props.onRouteChange('signin')} className="link sign-in">Sign In</p>
            </nav>
        )
    }
}

export default Navigation;