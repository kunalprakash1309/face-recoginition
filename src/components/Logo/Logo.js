import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 nt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner" style={{padding:'40px'}}>
                    <img style={{textAlign:'center'}} alt='logo'
                    src={brain} />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;