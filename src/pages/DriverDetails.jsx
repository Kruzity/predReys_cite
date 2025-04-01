import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import "./styles/DriverDetails.css";

const DriverDetails = () => {
  const location = useLocation();
  const { driver } = location.state; // Получаем данные о водителе

  return (
    <div className="driver-details-container">
      <NavigateHeader />
      <div className="driver-details-section">
        <h1 className="driver-details-title">{driver.person.firstName + " " + driver.person.lastName}</h1>
        <div className="driver-details-maininfo">
          <div className="row"><span>Телефон</span><p>{driver.notificationPhone || "Без номера телефона"}</p></div>
          <div className="row"><span>Telegram</span><p>{driver.notificationTelegramChatId || "Без телеграма"}</p></div>
        </div>
        <div className="driver-license-info">
          <h3 className="license-title">Водительское удостоверение</h3>
          <div className="driver-license-info-description">
            <div className="row"><span>Серия, номер</span><p>{driver.person.driverLicense?.series} {driver.person.driverLicense?.number}</p></div>
            <div className="row"><span>Дата выдачи</span><p>{driver.person.driverLicense?.issuedAt ?? new Date(driver.person.driverLicense?.issuedAt.slice(0,10)).toLocaleDateString("ru-RU")}</p></div>
            <div className="row"><span>Категории прав</span><p>{driver.person.driverLicense?.categories}</p></div>
          </div>
        </div>
        <div className="driver-snils-card">
          <span>СНИЛС</span><p>{driver.person.snils?.value}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
