import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';

import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import DriverIcon from "../assets/icons/ButtonIcons/driver-icon.svg"; 
import ArrowIcon from "../assets/icons/ButtonIcons/list-icon-arrow.svg"; 
import "./styles/MyDrivers.css";
import LoaderComponent from '../components/LoaderComponent';

const MyDrivers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //const { drivers } = location.state; // Получаем список водителей
  const { data, isError, isPending } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = (await API.get("https://stagensi.predreysdoc.com/api/v1/Employees", { params: { isDriver: true } })).data.items
      return response.filter(r => r.person);
    }
  })

  // Функция для обработки клика по водителю и перехода на страницу деталей
  const handleSelectDriver = (driver) => {
    navigate(`/organization/${driver.person.company.id}/driver/${driver.personId}`, {
      state: { driver }
    });
  };

  if (isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

  return (
    <div className="my-drivers-container">
      <NavigateHeader />
      <div className="my-drivers-title-section">
        <h1 className="my-drivers-title">Мои водители</h1>
        <p className="my-drivers-title-description">
          Выберите водителя, чтобы узнать больше информации
        </p>
      </div>
      {/* Отображаем список водителей */}
      <ul className="my-drivers-list">
        {data.map((driver) => (
          <li key={driver.personId} onClick={() => handleSelectDriver(driver)}>
            <div className="driver-card-container">
              <div className="driver-icon">
                <img src={DriverIcon} alt="Driver" />
              </div>
              <div className="car-flex-container">
              <div className="my-drivers-info-container">
                <h2 className="driver-name">{driver.person.firstName + " " + driver.person.lastName}</h2>
                <p>
                  <span>Телефон:</span> {driver.notificationPhone || "Без номера телефона"}
                </p>
                <p>
                  <span>Telegram:</span> {driver.notificationTelegramChatId || "Без телеграма"}
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
