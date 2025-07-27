import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import NavigateHeader from '../../components/NavigateHeader/NavigateHeader';
import LoaderComponent from '../../components/LoaderComponent';
import HelpBtn from "../../assets/icons/ButtonIcons/button-help.svg";
import '../styles/Accounting.css'
import { useCompanyContacts } from '../../hooks/useCompanyBalance';

const Accounting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { organization } = location.state;
  const balance = useCompanyContacts(organization.company.id)

  return(
    <div>
      <NavigateHeader />
      <div className="org-details-title">
          <h1>Бухгалтерия</h1> 
          <p><span>Баланс:</span> {balance}₽</p>
      </div>
      <div className='org-details-button-section'>
        <button className='my-autopark-btn'
          onClick={() => navigate(`/organization/${organization.company.id}/account-replenishment`, { state: { companyId: organization.company.id } })}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                <path className="icon" d="M10.043 8.87695L16.1981 14.5925L10.043 20.308" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M10.043 1.84253H23.2326C25.1752 1.84253 26.7499 3.41725 26.7499 5.35977V23.8253C26.7499 25.7679 25.1752 27.3425 23.2326 27.3425H10.043" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M15.7586 14.5925H1.25" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="image-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 5">
                  <path className='arrow' fillRule="evenodd" clipRule="evenodd" d="M6.46479 4.14629L13.5361 4.14614C13.97 4.14613 14.3218 4.49789 14.3217 4.93182L14.3216 12.0031C14.3216 12.437 13.9698 12.7888 13.5359 12.7888C13.1019 12.7888 12.7502 12.4371 12.7502 12.0031L12.7503 6.82869L5.20226 14.3767C4.89542 14.6836 4.39795 14.6836 4.09112 14.3768C3.78429 14.0699 3.7843 13.5725 4.09114 13.2656L11.6392 5.71757L6.46475 5.71769C6.03083 5.7177 5.67907 5.36594 5.67908 4.93201C5.67908 4.49808 6.03086 4.1463 6.46479 4.14629Z" fill="white" />
                </g>
              </svg>
            </div>
          </div>
          <div className="btn-footer-text">
            Пополнить баланс
          </div>
        </button>

        <button className='my-drivers-btn'
          
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
                <path className="icon" d="M14 13.196C17.3423 13.196 20.0517 10.4865 20.0517 7.14425C20.0517 3.80198 17.3423 1.09253 14 1.09253C10.6577 1.09253 7.94824 3.80198 7.94824 7.14425C7.94824 10.4865 10.6577 13.196 14 13.196Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M4.40563 28.0925H23.5943C25.7206 28.0925 27.3585 26.2641 26.3657 24.384C24.9049 21.6183 21.5749 18.3167 14 18.3167C6.42507 18.3167 3.09505 21.6183 1.63438 24.384C0.641387 26.2641 2.27929 28.0925 4.40563 28.0925Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="image-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 5">
                  <path className='arrow' fillRule="evenodd" clipRule="evenodd" d="M6.46479 4.14629L13.5361 4.14614C13.97 4.14613 14.3218 4.49789 14.3217 4.93182L14.3216 12.0031C14.3216 12.437 13.9698 12.7888 13.5359 12.7888C13.1019 12.7888 12.7502 12.4371 12.7502 12.0031L12.7503 6.82869L5.20226 14.3767C4.89542 14.6836 4.39795 14.6836 4.09112 14.3768C3.78429 14.0699 3.7843 13.5725 4.09114 13.2656L11.6392 5.71757L6.46475 5.71769C6.03083 5.7177 5.67907 5.36594 5.67908 4.93201C5.67908 4.49808 6.03086 4.1463 6.46479 4.14629Z" fill="white" />
                </g>
              </svg>
            </div>
          </div>
          <div className="btn-footer-text">
            Связаться с поддержкой
          </div>
        </button>
      </div>
    </div>
  );
};

export default Accounting;