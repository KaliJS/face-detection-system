import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => (
    <div className="inputgroup row text-center">
      <div className="col-md-5 m-auto">
        <p className="text-lead">we will predict the face in your picture......</p>
        <div className="input-group">
            <input className="form-control" type="text" placeholder="Paste Image URL" onChange={props.onInputChangeHandler}/>
            <span className="input-group-btn">     
                <button className="btn btn-primary" onClick={props.onPictureSubmit}>Detect</button>
            </span>
        </div>
      </div>
    </div>  
);

export default ImageLinkForm;