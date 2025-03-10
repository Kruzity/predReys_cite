import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigateHeader.css'
import IconBack from "../../assets/icons/ButtonIcons/action-icon-back.svg"
import IconMenu from "../../assets/icons/ButtonIcons/action-icon-menu.svg"

const NavigateHeader = ({onBack}) => {
    const navigate = useNavigate();

    return (
        <div className='header-navigate-container'>
            <button className='header-btn-back' onClick={() => {onBack ? onBack() : navigate(-1)}}>
                <img src={IconBack} alt="Back" />
            </button>
            <button className='header-btn-menu' onClick={() => navigate('/main')}>
                <img src={IconMenu} alt="Menu" />
            </button>

        </div>
    );

};

export default NavigateHeader;