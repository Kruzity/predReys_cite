import React from 'react';
import './AddButton.css';
import PlusIcon from "../../assets/icons/ButtonIcons/action-icon-stroke.svg";

const AddButton = ({ onClick, AddText }) => {
    return (
        <button className='delivery-add-contact-btn' type="button" onClick={onClick}>
            <div className="add-contact-img-container">
                <img src={PlusIcon} alt="" />
            </div>
            <span className='add-contact-btn-text'>{AddText}</span>
        </button>
    );
};

export default AddButton;