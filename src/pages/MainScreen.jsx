import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainScreenHeader from "../components/MainScreenHeader/MainScreenHeader";
import './styles/MainScreen.css';


const MainScreen = () => {
  const navigate = useNavigate();
  
  return (
    <div className='main-screen-container'>
      <div className='main-logo'>
        <MainScreenHeader />
      </div>
      <div className="main-description">
        <h1>Добро пожаловать</h1>
        <p>Выберите нужный раздел, чтобы начать работу</p>
      </div>
      <div className="main-screen-btn-section">

        <button className="my-organisations-btn"
          onClick={() => navigate('/organizations')}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="icon" d="M4.76725 26.75H23.2327C25.1753 26.75 26.75 25.1753 26.75 23.2327V10.0431L14 1.25L1.25 10.0431V23.2327C1.25 25.1753 2.82474 26.75 4.76725 26.75Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M10.0421 20.5934C10.0421 18.6508 11.6169 17.0762 13.5593 17.0762H14.4386C16.3812 17.0762 17.9559 18.6508 17.9559 20.5934V26.7486H10.0421V20.5934Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <span>Мои организации</span>
          </div>
        </button>

        <button className='my-orders-btn'
          onClick={() => navigate('/orders')}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Folder">
                  <path className="icon" d="M26.75 23.2328V10.0431C26.75 8.1006 25.1753 6.52588 23.2328 6.52588H1.25V23.2328C1.25 25.1753 2.82472 26.75 4.76724 26.75H23.2328C25.1753 26.75 26.75 25.1753 26.75 23.2328Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path className="icon" d="M16.6379 6.08621L14.9998 3.08301C14.3836 1.95304 13.1991 1.25 11.912 1.25H4.76724C2.82472 1.25 1.25 2.82472 1.25 4.76724V12.2414" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
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
            <span>Мои заказы</span>
          </div>
        </button>
        <button className='form-orders-btn'
          onClick={() => {
            localStorage.setItem("wayBills", null);
            localStorage.setItem("recipientData", null);
            navigate('/organizations', {
              state: {
                redirectToForm: true,
              },
            })
          }}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="File">
                  <g id="Group 1000004612">
                    <path className="icon" d="M4.52 27.5925H19.48C21.4241 27.5925 23 25.987 23 24.0063V9.21322L15.52 1.59253H4.52C2.57596 1.59253 1 3.19813 1 5.17874V24.0063C1 25.987 2.57596 27.5925 4.52 27.5925Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <path className="icon" d="M22 9.59253H15V1.59253" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
            <div className="image-container">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='arrow' fillRule="evenodd" clipRule="evenodd" d="M6.99995 0.592529C7.49426 0.592529 7.89498 0.993251 7.89498 1.48757V6.69789H13.105C13.5993 6.69789 14 7.09861 14 7.59293C14 8.08724 13.5993 8.48797 13.105 8.48797H7.89498V13.6975C7.89498 14.1918 7.49426 14.5925 6.99995 14.5925C6.50563 14.5925 6.10491 14.1918 6.10491 13.6975V8.48797H0.895036C0.400721 8.48797 0 8.08724 0 7.59293C0 7.09861 0.400721 6.69789 0.895036 6.69789H6.10491V1.48757C6.10491 0.993251 6.50563 0.592529 6.99995 0.592529Z" fill="white" />
              </svg>
            </div>
          </div>
          <div className="btn-footer-text">
            <span>Сформировать заказ</span>
          </div>
        </button>
      </div>
    </div>

  );
};

export default MainScreen;
