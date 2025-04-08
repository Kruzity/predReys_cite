import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';
import { useState } from 'react';

import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import DriverIcon from "../assets/icons/ButtonIcons/driver-icon.svg"; 
import ArrowIcon from "../assets/icons/ButtonIcons/list-icon-arrow.svg"; 
import "./styles/MyDrivers.css";
import LoaderComponent from '../components/LoaderComponent';
import AddButton from '../components/AddButton/AddButton';
import AddDriverModal from '../components/AddDriverModal/AddDriverModal';

const MyDrivers = () => {
  const navigate = useNavigate();

  const { data, isError, isPending } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = (await API.get("https://stagensi.predreysdoc.com/api/v1/Employees", { params: { isDriver: true } })).data.items
      return response.filter(r => r.person);
    }
  })

  const [addedDrivers, setAddedDrivers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleAddDriver = (formData) => {
    console.log("Данные для отправки:", formData);

    const newDriver = {
      personId: formData.phone,
      person: {
        firstName: formData.fullName.split(' ')[0],
        lastName: formData.fullName.split(' ')[1],
        notificationPhone: formData.phone
      }
    };

    setAddedDrivers(prev => [...prev, newDriver]);
    setShowModal(false);
  };

  const handleSelectDriver = (driver) => {
    navigate(`/organization/${driver.person.company?.id || "manual"}/driver/${driver.personId}`, {
      state: { driver }
    });
  };

  if (isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>;

  const allDrivers = [...(data || []), ...addedDrivers];

  return (
    <div className="my-drivers-container">
      <NavigateHeader />
      <div className="my-drivers-title-section">
        <h1 className="my-drivers-title">Мои водители</h1>
        <p className="my-drivers-title-description">
          Выберите водителя, чтобы узнать больше информации
        </p>
      </div>
      <AddButton 
        onClick={() => setShowModal(true)} 
        AddText="Добавить водителя" 
      />
      <AddDriverModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDriver}
      />
      <ul className="my-drivers-list">
        {allDrivers.map((driver) => (
          <li key={driver.personId} onClick={() => handleSelectDriver(driver)}>
            <div className="driver-card-container">
              <div className="driver-icon">
                <img src={DriverIcon} alt="Driver" />
              </div>
              <div className="car-flex-container">
                <div className="my-drivers-info-container">
                  <h2 className="driver-name">
                    {driver.person.firstName} {driver.person.lastName}
                  </h2>
                  <p>
                    <span>Телефон:</span> {driver.person.notificationPhone || driver.notificationPhone || "Без номера телефона"}
                  </p>
                  <p>
                    <span>Telegram:</span> {driver.person.notificationTelegramChatId || driver.notificationTelegramChatId || "Без телеграма"}
                  </p>
                </div>
                <div className="my-drivers-action-icon">
                  <img src={ArrowIcon} alt="Action" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyDrivers;
