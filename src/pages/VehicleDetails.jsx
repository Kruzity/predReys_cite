import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import "./styles/VehicleDetails.css";

const VehicleDetails = () => {
  const location = useLocation();
  const { vehicle, trailer } = location.state; 

  const isTrailer = !!trailer; 

  return (
    <div className="vehicle-details-container">
      <NavigateHeader />
      <div className="vehicle-details-section">
        <h1 className="vehicle-details-title">
          {isTrailer ? trailer.trailertype : `${vehicle.sts.brandModel}`}
        </h1>

        {isTrailer ? (
          // Информация о прицепе
          <>
            <div className="vehicle-details-maininfo">
              <div className="row"><span>Марка</span><p>{trailer.brand}</p></div>
              <div className="row"><span>Модель</span><p>{trailer.model}</p></div>
              <div className="row"><span>Госномер</span><p>{trailer.licensePlate}</p></div>
            </div>
            <div className="vehicle-owner-card">
              <span>Собственник</span><p>{trailer.owner}</p>
            </div>
          </>
        ) : (
          // Информация о машине
          <>
            <div className="vehicle-details-maininfo">
              <div className="row"><span>Тип ТС</span><p>{vehicle.sts.vehicleType}</p></div>
              <div className="row"><span>Марка</span><p>{vehicle.sts.brandModel}</p></div>
              <div className="row"><span>Модель</span><p>{vehicle.sts.brandModel}</p></div>
              <div className="row"><span>Госномер</span><p>{vehicle.sts.registrationNumber}</p></div>
            </div>
            {/* {vehicle.trailer?.trailertype && (
              <div className="vehicle-details-trailerinfo">
                <h3 className="trailer-title">{vehicle.trailer.trailertype}</h3>
                <div className="vehicle-details-trailerinfo-description">
                  <div className="row"><span>Марка</span><p>{vehicle.trailer.brand}</p></div>
                  <div className="row"><span>Модель</span><p>{vehicle.trailer.model}</p></div>
                  <div className="row"><span>Госномер</span><p>{vehicle.trailer.licensePlate}</p></div>
                </div>
              </div>
            )} */}
            <div className="vehicle-owner-card">
              <span>Собственник</span><p>{vehicle.sts.company.name}</p>
            </div>
            {/* <ul className="vehicle-details-list">
              <h3 className="adress-send-title">Адреса выпусков на линию</h3>
              {vehicle.addresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul> */}
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
