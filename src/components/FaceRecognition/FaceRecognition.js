import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => (
    <div className="face">
      <div className="absolute mt-2">
        <img id='inputimage' alt="" src={props.imageUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
      </div> 
    </div>  
);

export default FaceRecognition;