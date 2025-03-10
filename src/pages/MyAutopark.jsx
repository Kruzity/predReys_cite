import { useLocation, useNavigate } from 'react-router-dom';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import ListIcon from "../assets/icons/ButtonIcons/list-icon-arrow.svg";
import TruckIcon from "../assets/icons/ButtonIcons/list-icon-truck.svg";
import "./styles/MyAutopark.css";
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';
import { useCars } from '../hooks/useCars';
import LoaderComponent from '../components/LoaderComponent';

const MyAutopark = () => {
  const navigate = useNavigate();
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["autopark"],
  //   queryFn: async () => {
  //     let response = (await API.get("https://stagensi.predreysdoc.com/api/v1/Cars")).data.items
  //     console.log(response);
  //     return response.filter(r=>r.sts);
  //   }
  // })

  const data = useCars();

  // Функция для обработки клика по автомобилю и перехода на страницу деталей
  const handleSelectVehicle = (vehicle) => {
    navigate(`/organization/${vehicle.company.id}/vehicle/${vehicle.sts.car.id}`, {
      state: { vehicle } // Передаём данные о машине
    });
  };

  // const handleSelectTrailer = (trailer) => {
  //   navigate(`/organization/${trailer.organizationId}/vehicle/${trailer.id}`, {
  //     state: { trailer } // Передаём данные о прицепе
  //   });
  // };

  if (!data) return <div className='loader-page-spinner'><LoaderComponent /></div>

  return (
    <div className="my-autopark-container">
      <NavigateHeader />
      <div className="my-autopark-title-section">
        <h1 className="my-autopark-title">Мой автопарк</h1>
        <p className="my-autopark-title-description">
          Выберите ТС, чтобы узнать больше информации
        </p>
      </div>
      {/* Отображаем транспортные средства */}
      <ul className="my-autopark-list-card">
        {data.map((vehicle) => (
          <li key={vehicle.sts.car.id} onClick={() => handleSelectVehicle(vehicle)}>
              <div className="list-card-container">
                <div className="car-icon">
                  <img src={TruckIcon} alt="" />
                </div>
                <div className="car-flex-container">
                <div className="my-autopark-info-container">
                  <h2 className="list-card-title">
                    {vehicle.sts.car.value}
                  </h2>
                  <p>
                    <span>Гос. номер:</span> {vehicle.sts.registrationNumber}
                  </p>
                  <p>
                    <span>Собственник:</span> {vehicle.sts.company.name}
                  </p>
                  {/* {vehicle.trailer?.trailertype && (
                    <p>
                      <span>{vehicle.trailer.trailertype}:</span> {vehicle.trailer.brand} {vehicle.trailer.model}
                    </p>
                  )} */}
                </div>
                <div className="my-autopark-action-icon">
                  <img src={ListIcon} alt="" />
                </div>
                </div>
              </div>
            
          </li>
        ))}
        {/* Добавляем прицепы как отдельные элементы списка */}
        {/* {vehicles
          .filter((vehicle) => vehicle.trailer) // Фильтруем только те, у которых есть прицеп
          .map((vehicle) => (
            <li key={`trailer-${vehicle.trailer.id}`} onClick={() => handleSelectTrailer(vehicle.trailer)}>
              <div className="auto-list-card-container">
                <div className="list-card-container">
                  <div className="car-icon">
                    <img src={TruckIcon} alt="" />
                  </div>
                  <div className="my-autopark-info-container">
                    <h2 className="list-card-title">{vehicle.trailer.trailertype}</h2>
                    <p>
                      <span>{vehicle.trailer.trailertype}:</span> {vehicle.trailer.brand} {vehicle.trailer.model}
                    </p>
                  </div>
                  <div className="my-autopark-action-icon">
                    <img src={ListIcon} alt="" />
                  </div>
                </div>
              </div>
            </li>
          ))} */}
      </ul>
    </div>
  );
};

export default MyAutopark;
