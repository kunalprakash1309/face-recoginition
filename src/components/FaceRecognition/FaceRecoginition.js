import React from 'react';

const FaceRecognition = (props) => {
    return (
        <div className="center pt4">
            <div className="absolute nt2">
                <img id="inputimage" alt="img" src={props.imageUrl} width='500px' height='auto' />
                <div className="bounding-box" style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition