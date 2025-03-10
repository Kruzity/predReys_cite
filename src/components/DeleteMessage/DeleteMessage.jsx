import React from "react";
import loaderImageEllipse5 from '../../assets/icons/DeleteMessageAnimation/Ellipse 5.svg';
import loaderImageEllipse4 from '../../assets/icons/DeleteMessageAnimation/Ellipse 4.svg';
import loaderImageEllipse3 from '../../assets/icons/DeleteMessageAnimation/Ellipse 3.svg';
import loaderImageEllipse2 from '../../assets/icons/DeleteMessageAnimation/Ellipse 2.svg';
import loaderImageEllipse1 from '../../assets/icons/DeleteMessageAnimation/Ellipse 1.svg';
import loaderImageKnob from '../../assets/icons/DeleteMessageAnimation/knob.svg';
import "./DeleteMessage.css";

const DeleteMessage = ({ onCustomAction, title, description }) => {

    return(
        <div className="error-message-container">
              <div className="error-message-img">
                <div className="error-img-5">
                  <img src={loaderImageEllipse5} alt="error" />
                </div>
                <div className="error-img-4">
                  <img src={loaderImageEllipse4} alt="error" />
                </div>
                <div className="error-img-3">
                  <img src={loaderImageEllipse3} alt="error" />
                </div>
                <div className="error-img-2">
                  <img src={loaderImageEllipse2} alt="error" />
                </div>
                <div className="error-img-1">
                  <img src={loaderImageEllipse1} alt="error" />
                </div>
                <div className="error-img-knob">
                  <img src={loaderImageKnob} alt="error" />
                </div>
              </div>
              <div className="error-message">
                <h2 className="error-message-title">{title}</h2>
                <p className="error-message-description">{description}</p>
              </div>
              <div className="error-support-button">
                <button className="error-support-btn" onClick={ onCustomAction }>
                  Продолжить
                </button>
              </div>
            </div>
    );
}

export default DeleteMessage;