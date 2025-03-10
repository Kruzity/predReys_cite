import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import './styles/OrganizationsDetails.css'

const OrganizationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { organization } = location.state;

  return (
    <div className="organization-details">
      <NavigateHeader />
      <div className="org-details-title">
        <h1>{organization.company.name}</h1>
        <p><span>ИНН:</span> {organization.company.inn}</p>
        <p><span>ОГРН:</span> {organization.company.ogrn}</p>
        <p><span>Телефон:</span> {organization.phone}</p>
      </div>

      <div className="org-details-button-section">

        <button className='my-autopark-btn'
          onClick={() => navigate(`/organization/${organization.company.id}/autopark`)}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                <path className="icon" d="M29 15.5925C29 23.3245 22.732 29.5925 15 29.5925M29 15.5925C29 7.86054 22.732 1.59253 15 1.59253C7.26801 1.59253 1 7.86054 1 15.5925M29 15.5925H15M15 29.5925C7.26801 29.5925 1 23.3245 1 15.5925M15 29.5925V15.5925M1 15.5925H15" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            Мой автопарк
          </div>
        </button>

        <button className='my-drivers-btn'
          onClick={() => navigate(`/organization/${organization.company.id}/drivers`)}
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
            Мои водители
          </div>
        </button>

        <button className='sendout-btn'
          onClick={() => navigate(`/organization/${organization.company.id}/release-address`, { state: { companyId: organization.company.id } })}
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
            Выпуск на линию
          </div>
        </button>
        <button className='apply-btn'
          onClick={() => {
            localStorage.setItem("wayBills", null);
            localStorage.setItem("recipientData", null);
            navigate(`/organization/${organization.company.id}/request-form`, {
              state: {
                vehicles: organization.vehicles,
                drivers: organization.drivers,
                organization: organization,
              },
            })
          }}
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
                <path className="icon" d="M4.52 27.5925H19.48C21.4241 27.5925 23 25.987 23 24.0063V9.21322L15.52 1.59253H4.52C2.57596 1.59253 1 3.19813 1 5.17874V24.0063C1 25.987 2.57596 27.5925 4.52 27.5925Z" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M22 9.59253H15V1.59253" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            Сделать заявку на путевые листы
          </div>
        </button>

        {/* <button className='delivery-btn'
          onClick={() =>
            navigate(`/organization/${organization.id}/deliveries`, { state: { organization } })
          }
        >
          <div className="btn-header">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                <path className="icon" d="M20.375 4.70029L14 1.84253L1.25 7.55805L14 13.2736L26.75 7.55805L20.375 4.70029ZM20.375 4.70029L14 7.55805" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M1.25 21.627L7.625 24.4847M26.75 21.627L14 27.3425L7.625 24.4847M7.625 24.4847V16.0596" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M26.75 7.55811V21.6271" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M1.25 7.55811V21.6271" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path className="icon" d="M14 13.7131V26.9028" stroke="#9AE473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="image-container">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='arrow' fillRule="evenodd" clipRule="evenodd" d="M6.99995 0.592529C7.49426 0.592529 7.89498 0.993251 7.89498 1.48757V6.69789H13.105C13.5993 6.69789 14 7.09861 14 7.59293C14 8.08724 13.5993 8.48797 13.105 8.48797H7.89498V13.6975C7.89498 14.1918 7.49426 14.5925 6.99995 14.5925C6.50563 14.5925 6.10491 14.1918 6.10491 13.6975V8.48797H0.895036C0.400721 8.48797 0 8.08724 0 7.59293C0 7.09861 0.400721 6.69789 0.895036 6.69789H6.10491V1.48757C6.10491 0.993251 6.50563 0.592529 6.99995 0.592529Z" fill="white" />
              </svg>
            </div>
          </div>
          <div className="btn-footer-text">
            СДЭК. Мои доставки
          </div> 
      </button>*/}
      </div>
    </div >
  );
};

export default OrganizationDetails;
