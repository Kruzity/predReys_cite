import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TruckIcon from "../assets/icons/ButtonIcons/list-icon-truck.svg";
import IconBack from "../assets/icons/ButtonIcons/action-icon-back.svg";
import IconMenu from "../assets/icons/ButtonIcons/action-icon-menu.svg";
import DriverIcon from "../assets/icons/ButtonIcons/driver-icon.svg";
import PinnedIcon from "../assets/icons/ButtonIcons/line-rounded-pin.svg";
import PlusIcon from "../assets/icons/ButtonIcons/action-icon-stroke.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/RequestForm.css';
import ru from "date-fns/locale/ru";
import DeleteMessage from "../components/DeleteMessage/DeleteMessage";

//Добавил для календарика, перевод дней и сортировка дней недели начиная с понедельника
registerLocale("ru", ru);

const RequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const organization = location.state?.organization || {};
  const vehicles = location.state?.vehicles || [];
  const drivers = location.state?.drivers || [];
  const schedules = location.state?.organization?.schedules || [];
  

  const [formData, setFormData] = useState({
    field1: '',
    field2: [],
    field3: null,
    field4: '', 
    field5: [], 
    field6: [], 
    field7: null, 
    field8: null, 
    field9: { startTime: "00:00", endTime: "00:00" }, 
    
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedTrailers, setSelectedTrailers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [pinnedForm, setPinnedForm] = useState(null); // Для хранения закрепленной формы
  const [pinnedMessageType, setPinnedMessageType] = useState(null); // Для хранения закрепленного типа сообщения
  const [pinnedTransportationType, setPinnedTransportationType] = useState(null);
  const [pinnedAddress, setPinnedAddress] = useState(null);
  const [pinnedSchedule, setPinnedSchedule] = useState(null);
  const [subStep, setSubStep] = useState(null);


  
  const totalSteps = 9;

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (subStep) {
      // Сбрасываем subStep и переходим обратно в основной поток
      setSubStep(null);
      setCurrentStep(9);
    } else if (currentStep < totalSteps - 1) {
      // Обычный переход на следующий шаг
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps - 1 && formData.field8) {
      // Переход на подстраничку при последнем шаге
      if (currentStep === totalSteps - 1 && formData.field8 === "Рабочие дни") {
        setSubStep("workingDays");
      } else if (currentStep === totalSteps - 1 && formData.field8 === "Командировка") {
        setSubStep("businessTrip");
      } else {
        setSubStep(null); 
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
    }else if(subStep !== null) {
      setSubStep(null)
      setFormData((prev) => ({ ...prev, field8: '' }));
    }else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setFormData((prev) => ({
      ...prev,
      field1: vehicle,
    }));
    setSelectedVehicleId(vehicle.id);
  };

  const handleSelectTrailer = (trailer) => {
    setFormData((prev) => {
      const field2 = prev.field2 || []; // Защищаем от undefined
      return {
        ...prev,
        field2: field2.includes(trailer) 
          ? field2.filter(t => t !== trailer) 
          : [...field2, trailer],
      };
    });
  
    setSelectedTrailers((prev) =>
      prev.includes(trailer)
        ? prev.filter((t) => t !== trailer)
        : prev.length < 4
        ? [...prev, trailer]
        : prev
    );
  };
  
  const handleSelectDriver = (driver) => {
    setFormData((prev) => ({
      ...prev,
      field3: driver,
    }));
    setSelectedDriver(driver.id);
  };
  const handleSelectForm = (form) => {
    
    setFormData((prev) => ({
      ...prev,
      field4: form,
    }));
  };
  const handleSelectAddress = (address) => {
    setFormData((prev) => ({
      ...prev,
      field7: address,
    }));
  };
  
  const handlePinForm = (form) => {
    // Можно закрепить только один элемент
    if (pinnedForm === form) {
      setPinnedForm(null); // Открепляем форму
    } else if (!pinnedForm) {
      // Если ничего не закреплено, закрепляем текущую форму
      setPinnedForm(form);
    }
  };
  const handlePinMessageType = (messageType) => {
    // Можно закрепить только один элемент
    if (pinnedMessageType === messageType) {
      setPinnedMessageType(null); // Открепляем тип сообщения
    } else if (!pinnedMessageType) {
      // Если ничего не закреплено, закрепляем текущий тип сообщения
      setPinnedMessageType(messageType);
    }
  };
  const handlePinTransportationType = (transportationType) => {
    // Можно закрепить только один элемент
    if (pinnedTransportationType === transportationType) {
      setPinnedTransportationType(null); // Открепляем тип перевозки
    } else if (!pinnedTransportationType) {
      // Если ничего не закреплено, закрепляем текущий тип перевозки
      setPinnedTransportationType(transportationType);
    }
  };  
  const handlePinAddress = (address) => {
    // Закрепляем только один адрес
    if (pinnedAddress === address) {
      setPinnedAddress(null); // Открепляем
    } else if (!pinnedAddress) {
      setPinnedAddress(address); // Закрепляем, если ничего не закреплено
    }
  };
  const handlePinSchedule = (schedule) => {
    // Закрепляем только одно расписание
    if (pinnedSchedule === schedule) {
      setPinnedSchedule(null); // Открепляем
    } else if (!pinnedSchedule) {
      setPinnedSchedule(schedule); // Закрепляем, если ничего не закреплено
    }
  };

  const sortedTravelForms = [...organization.travelForms].sort((a, b) => {
    if (pinnedForm === a) return -1; // Закрепленная форма на первом месте
    if (pinnedForm === b) return 1;  // Остальные формы идут после
    return 0;
  });
  
  const sortedMessageTypes = [...organization.messageTypes].sort((a, b) => {
    if (pinnedMessageType === a) return -1; // Закрепленный тип сообщения на первом месте
    if (pinnedMessageType === b) return 1;  // Остальные типы сообщений идут после
    return 0;
  });
  
  const sortedTransportationTypes = [...organization.transportationTypes].sort((a, b) => {
    if (pinnedTransportationType === a) return -1; // Закрепленный тип на первом месте
    if (pinnedTransportationType === b) return 1;  // Остальные типы после
    return 0;
  });
  
  const sortedAddresses = [...organization.addresses].sort((a, b) => {
    if (pinnedAddress === a) return -1; // Закрепленный адрес первым
    if (pinnedAddress === b) return 1;  // Остальные после
    return 0;
  });
  
  const sortedSchedules = [...organization.schedules].sort((a, b) => {
    if (pinnedSchedule === a) return -1; // Закрепленное расписание первым
    if (pinnedSchedule === b) return 1;  // Остальные после
    return 0;
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
    localStorage.removeItem('formData');
  };

  const [selectedDates, setSelectedDates] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempSelectedDates, setTempSelectedDates] = useState([]); 
  const [startDate, setStartDate] = useState(null); // Начало периода
  const [periods, setPeriods] = useState([{ startDate: null, endDate: null }]); // Окончание периода
  
  const handleSelectSchedule = (schedule) => { 
    setFormData((prev) => ({ ...prev, field8: schedule }));
  };
  


  // Открытие/закрытие календаря
  const toggleCalendar = () => {
    setTempSelectedDates(selectedDates); 
    setIsCalendarOpen(true);
  };
  // Закрытие календаря без сохранения
  const handleCancel = () => {
    setIsCalendarOpen(false);
  };
  // Сохранение выбранных дат
  const handleConfirm = () => {
    setSelectedDates(
      tempSelectedDates
        .slice() 
        .sort((a, b) => new Date(a) - new Date(b)) 
    );
    setIsCalendarOpen(false);
  };

  // Добавление/удаление даты
  const handleDateChange = (date) => {
    setTempSelectedDates((prev) =>
      prev.some((d) => d.toLocaleDateString("ru-RU") === date.toLocaleDateString("ru-RU"))
        ? prev.filter((d) => d.toLocaleDateString("ru-RU") !== date.toLocaleDateString("ru-RU"))
        : [...prev, date] // Сохраняем объект Date
    );
  };

 // Добавление всего рабочего месяца
  const handleAddWorkingMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDay = today.getDate();

    const workingDays = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = currentDay; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays.push(currentDate); // Сохраняем объект Date
      }
    }

    setTempSelectedDates((prev) => Array.from(new Set([...prev, ...workingDays])));
    setIsCalendarOpen(true);
  };
  // Удаление отдельной даты
  const handleRemoveDate = (date) => {
    setSelectedDates((prev) => prev.filter((d) => d !== date));
  };

  const handlePeriodChange = (index, field, date) => {
    setPeriods((prevPeriods) =>
      prevPeriods.map((period, i) =>
        i === index ? { ...period, [field]: date } : period
      )
    );
  };
  const addPeriod = () => {
    setPeriods((prevPeriods) => [...prevPeriods, { startDate: null, endDate: null }]);
  };
  // Кастомный компонент инпута
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      className="date-picker-input"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly 
    />
  ));

  //добавляю case 9
  const [requests, setRequests] = useState([]); 
  const [showPreview, setShowPreview] = useState(false);
  const [case9Step, setCase9Step] = useState('time'); 
  const totalSum = requests.reduce((sum, request) => sum + (request.price || 0), 0);
  const totalTripSheets = requests.reduce((sum, request) => sum + (request.tripSheets || 0), 0);

  const resetForm = () => {
    setFormData({
      field1: '',
      field2: [],
      field3: null,
      field4: '', 
      field5: [], 
      field6: [], 
      field7: null, 
      field8: null, 
      field9: { startTime: "00:00", endTime: "00:00" }
    });
  };

  const handleSkip = () => {
    if (case9Step === 'time') {
      setCase9Step('details');
    } else if (case9Step === 'details') {
      setCase9Step('summary');
    }
  };
  
  const handleCreateNewRequest = () => {
    
    const newRequest = { ...formData };
    setRequests((prev) => [...prev, newRequest]);
    resetForm(); 
    setSubStep(null);
    setCase9Step('time');
    setCurrentStep(1); 
  };
  const handleDeleteOrder = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmOrder = () => {
    // Логика подтверждения заказа
    console.log('Заказ подтвержден');
  };
  const handleTimeChange = (field, part, value) => {
    setFormData((prev) => {
      const [hour, minute] = prev.field9[field].split(":");
      const clampedValue = Math.max(0, Math.min(part === "hour" ? 23 : 59, parseInt(value || "0", 10)));
      const paddedValue = clampedValue.toString().padStart(2, "0");
      const newTime =
        part === "hour" ? `${paddedValue}:${minute}` : `${hour}:${paddedValue}`;
      return {
        ...prev,
        field9: {
          ...prev.field9,
          [field]: newTime,
        },
      };
    });
  };

  const handleFocus = (field, part) => {
    setFormData((prev) => {
      const defaultTime = "00:00";
      const [hour, minute] = prev.field9[field]?.split(":") || defaultTime.split(":");
      const clearedValue = part === "hour" ? `:${minute}` : `${hour}:`;
      return {
        ...prev,
        field9: {
          ...prev.field9,
          [field]: clearedValue,
        },
      };
    });
  };

  const handleBlur = (field, part) => {
    setFormData((prev) => {
      const defaultTime = "00:00";
      const [hour, minute] = prev.field9[field]?.split(":") || defaultTime.split(":");
      const finalHour = hour === "" ? "00" : hour.padStart(2, "0");
      const finalMinute = minute === "" ? "00" : minute.padStart(2, "0");
      return {
        ...prev,
        field9: {
          ...prev.field9,
          [field]: `${finalHour}:${finalMinute}`,
        },
      };
    });
  };
  const handleTimeKeyDown = (event) => {
    const { key, target } = event;
    // Разрешаем только числа и спец. клавиши
    if (!/^\d$/.test(key) && key !== "Backspace" && key !== "ArrowLeft" && key !== "ArrowRight") {
      event.preventDefault();
    }
  };
  const preventScroll = (event) => {
    event.preventDefault();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showDeleteMessage, setShowDeleteMessage] = useState(false); 


  // Обработчик для удаления заявки
  const confirmDelete = () => {
    setShowDeleteModal(false);
    resetForm(); 
    setShowDeleteMessage(true); 
    
  };
  const confirmDeleteOrder = () => {
    setShowDeleteModal(false);
    resetForm(); 
    setRequests([]); 
    setShowDeleteMessage(true); 
    
  };
  // Обработчик для закрытия модального окна удаления
  const cancelDelete = () => {
    setShowDeleteModal(false); 
  };

  const handleCustomAction = () => {
  setShowDeleteMessage(false); 
    setSubStep('summary');
  };
  const handleCustomBack = () => {
    setShowDeleteMessage(false); 
    setSubStep(null);
    setCase9Step('time');
    setCurrentStep(1); 
    navigate('/main');
    };
  const handleDeleteRequest = () => {
    setShowDeleteModal(true); 
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1 className="form-title">Выберите ТС</h1>
            <ul className="form-list-card">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  onClick={() => handleSelectVehicle(vehicle)}
                  className={`hover-form ${selectedVehicleId === vehicle.id ? 'selected' : ''}`}
                >
                  <div className="form-list-card-container">
                    <div className="form-img-icon">
                      <img src={TruckIcon} alt="" />
                    </div>
                    <div className="form-list-card-info-container">
                      <h2 className="form-list-card-title">
                        {vehicle.brand} {vehicle.model}
                      </h2>
                      <p>
                        <span>Гос. номер:</span> {vehicle.licensePlate}
                      </p>
                      <p>
                        <span>Собственник:</span> {vehicle.owner}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="footer-single-btn-container">
              <button className='footer-single-btn' disabled={!formData.field1} onClick={handleNext}>Далее</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="form-title-container">
              <h1 className="form-title-h1">Выберите прицеп</h1>
              <p className="form-title-description">
                Вы можете выбрать от одного до четырёх прицепов в одной заявке
              </p>
            </div>
      
            <ul className="form-list-card">
              {vehicles
                .filter((vehicle) => vehicle.trailer) // Фильтруем только те, у которых есть прицеп
                .map((vehicle) => (
                  <li
                    key={vehicle.trailer.id}
                    onClick={() => handleSelectTrailer(vehicle.trailer)}
                    className={`hover-form ${
                      selectedTrailers.includes(vehicle.trailer) ? 'selected' : ''
                    }`}
                  >
                    <div className="form-list-card-container">
                      <div className="form-img-icon">
                        <img src={TruckIcon} alt="" />
                      </div>
                      <div className="form-list-card-info-container">
                        <h2 className="form-list-card-title">
                          {vehicle.trailer.brand} {vehicle.trailer.model}
                        </h2>
                        <p>
                          <span>Гос. номер:</span> {vehicle.trailer.licensePlate}
                        </p>
                        <p>
                          <span>Собственник:</span> {vehicle.owner}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
      
            <div className="footer-btn-section-container">
              <button className="footer-form-skip-btn" onClick={handleNext}>
                Пропустить
              </button>
              <button
                className="footer-form-next-btn"
                disabled={selectedTrailers.length === 0}
                onClick={handleNext}
              >
                Далее
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h1 className="form-title">Выберите водителя</h1>
            <ul className="form-list-card">
              <li
                onClick={() => handleSelectDriver({ id: null, name: "Без ФИО" })}
                className={`hover-form ${selectedDriver === null ? 'selected' : ''}`}
              >
                <div className="form-list-card-container">
                  <div className="form-img-icon">
                    <img src={DriverIcon} alt="Driver" />
                  </div>
                  <div className="form-list-card-info-container">
                    <h2 className="driver-name-null">Без ФИО</h2>
                  </div>
                </div>
              </li>
              {drivers.map((driver) => (
                <li
                  key={driver.id}
                  onClick={() => handleSelectDriver(driver)}
                  className={`hover-form ${selectedDriver === driver.id ? 'selected' : ''}`}
                >
                  <div className="form-list-card-container">
                    <div className="form-img-icon">
                      <img src={DriverIcon} alt="Driver" />
                    </div>
                    <div className="form-list-card-info-container">
                      <h2 className="driver-name">{driver.name}</h2>
                      <p>
                        <span>Телефон:</span> {driver.phone}
                      </p>
                      <p>
                        <span>Telegram:</span> {driver.telegram}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="footer-single-btn-container">
              <button className='footer-single-btn' disabled={!formData.field3} onClick={handleNext}>Далее</button>
            </div>
          </div>
        );
      case 4: 
          return (
            <div>
              <h1 className="form-title">Выберите форму маршрута</h1>
              <ul className="form-list">
                {sortedTravelForms.map((form, index) => (
                  <li
                    key={index}
                    className={`form-address-item ${form === formData.field4 ? 'selected' : ''}`}
                    style={{
                      backgroundColor: form === formData.field4 ? '#255328' : '',
                    }}
                  >
                    <div className="address-item-container">
                      <p className="adress-title">{form}</p>
                      <div className="adress-btn-container">
                        <button
                          onClick={() => {
                            if (form === formData.field4) {
                              setFormData((prev) => ({
                                ...prev,
                                field4: '',
                              }));
                            } else {
                              handleSelectForm(form);
                            }
                          }}
                        >
                          {form === formData.field4 ? 'Отменить' : 'Выбрать'}
                        </button>
                        {pinnedForm === null && (
                          <button onClick={() => handlePinForm(form)}>
                            Закрепить
                          </button>
                        )}
                        {pinnedForm === form && (
                          <button onClick={() => handlePinForm(form)}>
                            Открепить
                          </button>
                        )}
                      </div>
                    </div>
                    {pinnedForm === form && (
                      <div className="pinned-icon">
                        <img src={PinnedIcon} alt="Pinned" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="footer-single-btn-container">
                <button
                  className="footer-single-btn"
                  disabled={!formData.field4}
                  onClick={handleNext}
                >
                  Далее
                </button>
              </div>
            </div>
          );
      case 5:
            return (
              <div>
                <h1 className="form-title">Выберите тип сообщения</h1>
                <ul className="form-list">
                  {/* Элемент "Все" для выбора всех типов */}
                  <li
                    key="all"
                    className={`form-address-item ${formData.field5.length === sortedMessageTypes.length ? 'selected' : ''}`}
                    style={{
                      backgroundColor: formData.field5.length === sortedMessageTypes.length ? '#255328' : '',
                    }}
                  >
                    <div className="address-item-container">
                      <p className="adress-title">Все</p>
                      <div className="adress-btn-container">
                        <button
                          onClick={() => {
                            if (formData.field5.length === sortedMessageTypes.length) {
                              setFormData((prev) => ({
                                ...prev,
                                field5: [], // Очищаем массив
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                field5: sortedMessageTypes, // Выбираем все элементы
                              }));
                            }
                          }}
                        >
                          {formData.field5.length === sortedMessageTypes.length ? 'Отменить' : 'Выбрать'}
                        </button>
                        {pinnedMessageType === null && (
                          <button onClick={() => handlePinMessageType('all')}>
                            Закрепить
                          </button>
                        )}
                        {pinnedMessageType === 'all' && (
                          <button onClick={() => handlePinMessageType('all')}>
                            Открепить
                          </button>
                        )}
                      </div>
                    </div>
                    {pinnedMessageType === 'all' && (
                      <div className="pinned-icon">
                        <img src={PinnedIcon} alt="Pinned" />
                      </div>
                    )}
                  </li>
                  {sortedMessageTypes.map((messageType, index) => (
                    <li
                      key={index}
                      className={`form-address-item ${formData.field5.includes(messageType) && formData.field5.length !== sortedMessageTypes.length ? 'selected' : ''}`}
                      style={{
                        backgroundColor: formData.field5.includes(messageType) && formData.field5.length !== sortedMessageTypes.length ? '#255328' : '',
                      }}
                    >
                      <div className="address-item-container">
                        <p className="adress-title">{messageType}</p>
                        <div className="adress-btn-container">
                          <button
                            onClick={() => {
                              if (formData.field5.includes(messageType)) {
                                setFormData((prev) => ({
                                  ...prev,
                                  field5: prev.field5.filter((item) => item !== messageType),
                                }));
                              } else if (formData.field5.length < sortedMessageTypes.length) {
                                setFormData((prev) => ({
                                  ...prev,
                                  field5: [...prev.field5, messageType],
                                }));
                              }
                            }}
                          >
                            {formData.field5.includes(messageType) ? 'Отменить' : 'Выбрать'}
                          </button>
                          {pinnedMessageType === null && (
                            <button onClick={() => handlePinMessageType(messageType)}>
                              Закрепить
                            </button>
                          )}
                          {pinnedMessageType === messageType && (
                            <button onClick={() => handlePinMessageType(messageType)}>
                              Открепить
                            </button>
                          )}
                        </div>
                      </div>
                      {pinnedMessageType === messageType && (
                        <div className="pinned-icon">
                          <img src={PinnedIcon} alt="Pinned" />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="footer-single-btn-container">
                  <button
                    className="footer-single-btn"
                    disabled={formData.field5.length === 0} 
                    onClick={handleNext}
                  >
                    Далее
                  </button>
                </div>
              </div>
            );
      case 6:
        return (
          <div>
            <h1 className="form-title">Выберите тип перевозки</h1>
            <ul className="form-list">
              <li
                className={`form-address-item ${formData.field6.length === sortedTransportationTypes.length ? 'selected' : ''}`}
                style={{
                  backgroundColor: formData.field6.length === sortedTransportationTypes.length ? '#255328' : '', // Фон только для "Все"
                }}
              >
                <div className="address-item-container">
                  <p className="adress-title">Все</p>
                  <div className="adress-btn-container">
                    <button
                      onClick={() => {
                        if (formData.field6.length === sortedTransportationTypes.length) {
                          setFormData((prev) => ({
                            ...prev,
                            field6: [], 
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            field6: sortedTransportationTypes, 
                          }));
                        }
                      }}
                    >
                      {formData.field6.length === sortedTransportationTypes.length ? 'Отменить' : 'Выбрать'}
                    </button>
                    {pinnedTransportationType === null && (
                      <button onClick={() => handlePinTransportationType('Все')}>
                        Закрепить
                      </button>
                    )}
                    {pinnedTransportationType === 'Все' && (
                      <button onClick={() => handlePinTransportationType('Все')}>
                        Открепить
                      </button>
                    )}
                  </div>
                </div>
                {pinnedTransportationType === 'Все' && (
                  <div className="pinned-icon">
                    <img src={PinnedIcon} alt="Pinned" />
                  </div>
                )}
              </li>
              {sortedTransportationTypes.map((transportationType, index) => (
                <li
                  key={index}
                  className={`form-address-item ${formData.field6.includes(transportationType) && formData.field6.length !== sortedTransportationTypes.length ? 'selected' : ''}`}
                  style={{
                    backgroundColor: formData.field6.includes(transportationType) && formData.field6.length !== sortedTransportationTypes.length ? '#255328' : '',
                  }}
                >
                  <div className="address-item-container">
                    <p className="adress-title">{transportationType}</p>
                    <div className="adress-btn-container">
                      <button
                        onClick={() => {
                          if (formData.field6.includes(transportationType)) {
                            setFormData((prev) => ({
                              ...prev,
                              field6: prev.field6.filter(t => t !== transportationType),
                            }));
                          } else {
                            if (formData.field6.length < sortedTransportationTypes.length) {
                              setFormData((prev) => ({
                                ...prev,
                                field6: [...prev.field6, transportationType],
                              }));
                            }
                          }
                        }}
                      >
                        {formData.field6.includes(transportationType) ? 'Отменить' : 'Выбрать'}
                      </button>
                      {pinnedTransportationType === null && (
                        <button onClick={() => handlePinTransportationType(transportationType)}>
                          Закрепить
                        </button>
                      )}
                      {pinnedTransportationType === transportationType && (
                        <button onClick={() => handlePinTransportationType(transportationType)}>
                          Открепить
                        </button>
                      )}
                    </div>
                  </div>
                  {pinnedTransportationType === transportationType && (
                    <div className="pinned-icon">
                      <img src={PinnedIcon} alt="Pinned" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="footer-single-btn-container">
              <button
                className="footer-single-btn"
                disabled={formData.field6.length === 0}
                onClick={handleNext}
              >
                Далее
              </button>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h1 className="form-title">Выберите адрес</h1>
            <ul className="form-list">
              {sortedAddresses.map((address, index) => (
                <li
                  key={index}
                  className={`form-address-item ${
                    address === formData.field7 ? 'selected' : ''
                  }`}
                  style={{
                    backgroundColor: address === formData.field7 ? '#255328' : '',
                  }}
                >
                  <div className="address-item-container">
                    <p className="adress-title">{address}</p>
                    <div className="adress-btn-container">
                      <button
                        onClick={() => {
                          if (address === formData.field7) {
                            setFormData((prev) => ({
                              ...prev,
                              field7: '',
                            }));
                          } else {
                            handleSelectAddress(address);
                          }
                        }}
                      >
                        {address === formData.field7 ? 'Отменить' : 'Выбрать'}
                      </button>
                      {pinnedAddress === null && (
                        <button onClick={() => handlePinAddress(address)}>
                          Закрепить
                        </button>
                      )}
                      {pinnedAddress === address && (
                        <button onClick={() => handlePinAddress(address)}>
                          Открепить
                        </button>
                      )}
                    </div>
                  </div>
                  {pinnedAddress === address && (
                    <div className="pinned-icon">
                      <img src={PinnedIcon} alt="Pinned" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="footer-single-btn-container">
              <button
                className="footer-single-btn"
                disabled={!formData.field7}
                onClick={handleNext}
              >
                Далее
              </button>
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            {subStep === null ? (
              <div>
                <h1 className="form-title">Выберите расписание</h1>
                <ul className="form-list">
                  {schedules.map((schedule, index) => (
                    <li
                      key={index}
                      className={`form-address-item ${schedule === formData.field8 ? "selected" : ""}`}
                      style={{
                        backgroundColor: schedule === formData.field8 ? "#255328" : "",
                      }}
                    >
                      <div className="address-item-container">
                        <p className="adress-title">{schedule}</p>
                        <div className="adress-btn-container">
                          <button
                            onClick={() => {
                              if (schedule === formData.field8) {
                                setFormData((prev) => ({ ...prev, field8: "" }));
                              } else {
                                handleSelectSchedule(schedule);
                              }
                            }}
                          >
                            {schedule === formData.field8 ? "Отменить" : "Выбрать"}
                          </button>
                          {pinnedSchedule === null && (
                            <button onClick={() => handlePinSchedule(schedule)}>Закрепить</button>
                          )}
                          {pinnedSchedule === schedule && (
                            <button onClick={() => handlePinSchedule(schedule)}>Открепить</button>
                          )}
                        </div>
                      </div>
                      {pinnedSchedule === schedule && (
                        <div className="pinned-icon">
                          <img src={PinnedIcon} alt="Pinned" />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="footer-single-btn-container">
                  <button
                    className="footer-single-btn"
                    disabled={!formData.field8}
                    onClick={handleNext}
                  >
                    Далее
                  </button>
                </div>
              </div>
            ) : subStep === "workingDays" ? (
                <div className="working-days-container">
                  <h1 className="date-title">Выберите даты</h1>
                  <p className="date-description">Рабочие дни</p>
                  {/* Список выбранных дат */}
                  <div className='date-chips-container'>
                  {selectedDates.map((date, index) => (
                  <span
                    className="date-chips"
                    key={index}
                    onClick={() => handleRemoveDate(date)}
                  >
                    {new Date(date).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }).replace(/\./g, "/")}
                  </span>
                ))}

                  </div>
                  {/* Кнопки добавления */}
                  <div className="add-work-days-btn-section">
                    <button className="add-workdays-btn workdays-btn-style" onClick={toggleCalendar}>
                      <div className="add-contact-img-container">
                        <img src={PlusIcon} alt="" />
                      </div>
                      <span className="add-contact-btn-text">Добавить дни</span>
                    </button>
                    <button className="add-workmonth-btn workdays-btn-style" onClick={handleAddWorkingMonth}>
                      <div className="add-contact-img-container">
                        <img src={PlusIcon} alt="" />
                      </div>
                      <span className="add-contact-btn-text">Добавить весь рабочий месяц</span>
                    </button>
                  </div>
                  {/* Календарь */}
                  {isCalendarOpen && (
                    <div className="calendar-container">
                      <DatePicker
                        selected={null} // Не выделяем текущую дату
                        onChange={handleDateChange}
                        inline
                        locale="ru"
                        highlightDates={tempSelectedDates} // highlightDates теперь принимает массив объектов Date
                        dayClassName={(date) =>
                          tempSelectedDates.some((d) => {
                            const parsedDate = typeof d === "string" ? new Date(d) : d; // Преобразуем строку в Date
                            return parsedDate.toLocaleDateString("ru-RU") === date.toLocaleDateString("ru-RU");
                          })
                            ? "selected-date"
                            : ""
                        }
                      />

                      <div className="calendar-controls">
                        <button className="calendar-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button className="calendar-btn calendar-btn-right-margin" onClick={handleConfirm}>
                          Ok
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="footer-single-btn-container">
                    <button
                      className="footer-single-btn"
                      disabled={selectedDates.length === 0}
                      onClick={handleNext}
                    >
                      Далее
                    </button>
                  </div>
                </div>
            ) : subStep === "businessTrip" ? ( 
              <div className="period-picker-container">
                <h1 className="date-title">Выберите даты</h1>
                <p className="date-description">Командировка</p>
                {periods.map((period, index) => (
                  <div key={index} className="date-picker-group">
                    <div className="date-picker-wrapper">
                      <label className="date-picker-label">
                        <span className="date-picker-span-text">Начало периода</span>
                      </label>
                      <DatePicker
                        selected={period.startDate}
                        onChange={(date) => handlePeriodChange(index, "startDate", date)}
                        customInput={
                          <CustomInput />
                        }
                        selectsStart
                        startDate={period.startDate}
                        endDate={period.endDate}
                        dateFormat="dd/MM/yyyy"
                        locale="ru"
                      />
                    </div>
                    <div className="date-picker-wrapper">
                      <label className="date-picker-label">
                        <span className="date-picker-span-text">Окончание периода</span>
                      </label>
                      <DatePicker
                        className='datepicker-z-index'
                        selected={period.endDate}
                        onChange={(date) => handlePeriodChange(index, "endDate", date)}
                        customInput={
                          <CustomInput />
                        }
                        selectsEnd
                        startDate={period.startDate}
                        endDate={period.endDate}
                        minDate={period.startDate}
                        dateFormat="dd/MM/yyyy"
                        locale="ru"
                      />
                    </div>
                  </div>
                ))}
                <button className="add-btn" onClick={addPeriod}>
                  <div className="add-img-container">
                    <img src={PlusIcon} alt="" />
                  </div>
                  <span className='add-btn-text'>Добавить промежуток</span>
                </button>
                <div className="footer-single-btn-container">
                    <button
                      className="footer-single-btn"
                      disabled={periods.length === 0 || !periods.every((period) => period.startDate && period.endDate)}
                      onClick={handleNext}
                    >
                      Далее
                    </button>
                  </div>
              </div>
            ) : null}
          </div>
        );
      case 9:
        switch (subStep) {
          case null: // Первая подстраница с выбором времени
            return (
              <div>
                <h1 className="form-title">Выберите время выезда на линию</h1>
                <div className="time-input-container">
                  <label className="time-label">
                  <span className='time-label-text'>С</span>
                    <div className="time-input-wrapper">
                      <input
                        type="number"
                        className="time-input-section"
                        value={formData.field9.startTime.split(":")[0]}
                        onFocus={() => handleFocus("startTime", "hour")}
                        onBlur={() => handleBlur("startTime", "hour")}
                        onChange={(e) => handleTimeChange("startTime", "hour", e.target.value)}
                        onKeyDown={handleTimeKeyDown}
                        onWheel={preventScroll}
                        min="0"
                        max="23"
                      />
                      <span className="time-separator">:</span>
                      <input
                        type="number"
                        className="time-input-section"
                        value={formData.field9.startTime.split(":")[1]}
                        onFocus={() => handleFocus("startTime", "minute")}
                        onBlur={() => handleBlur("startTime", "minute")}
                        onChange={(e) => handleTimeChange("startTime", "minute", e.target.value)}
                        onKeyDown={handleTimeKeyDown}
                        onWheel={preventScroll}
                        min="0"
                        max="59"
                      />
                    </div>
                  </label>
                  <label className="time-label">
                    <span className='time-label-text'>До</span>
                    <div className="time-input-wrapper">
                      <input
                        type="number"
                        className="time-input-section"
                        value={formData.field9.endTime.split(":")[0]}
                        onFocus={() => handleFocus("endTime", "hour")}
                        onBlur={() => handleBlur("endTime", "hour")}
                        onChange={(e) => handleTimeChange("endTime", "hour", e.target.value)}
                        onKeyDown={handleTimeKeyDown}
                        onWheel={preventScroll}
                        min="0"
                        max="23"
                      />
                      <span className="time-separator">:</span>
                      <input
                        type="number"
                        className="time-input-section"
                        value={formData.field9.endTime.split(":")[1]}
                        onFocus={() => handleFocus("endTime", "minute")}
                        onBlur={() => handleBlur("endTime", "minute")}
                        onChange={(e) => handleTimeChange("endTime", "minute", e.target.value)}
                        onKeyDown={handleTimeKeyDown}
                        onWheel={preventScroll}
                        min="0"
                        max="59"
                      />
                    </div>
                  </label>
                </div>
                <div className="footer-btn-section-container">
                  <button className="footer-form-skip-btn" onClick={handleSkip}>
                    Пропустить
                  </button>
                  <button
                    className="footer-form-next-btn"
                    disabled={!formData.field9.startTime || !formData.field9.endTime}
                    onClick={() => setSubStep('details')}
                  >
                    Далее
                  </button>
                </div>
              </div>
            );
          case 'details': // Вторая подстраница с информацией о заявке
            return (
              <div className='form-details-container'>
                <h1 className="form-details-title">Цена по заявке</h1>
                <div className="details-price-container">5000 ₽</div>{/* Временно фиксированная цена, замени число, оставь знак */}
                <div className="request-info">Количество путевых листов 3</div> {/* Временно фиксированное количество */}
                <button
                  className="preview-btn"
                  onClick={() => setShowPreview(true)}
                >
                  Предпросмотр заявки
                </button>
                {/* Модальное окно предпросмотра */}
                {showPreview && (
                  <div
                    className="modal-overlay"
                    onClick={() => setShowPreview(false)}
                  >
                    <div
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="modal-close"
                        onClick={() => setShowPreview(false)}
                      >
                        ×
                      </button>
                      <div className="modal-title">Предпросмотр заявки</div>
                      <div className="preview-content">
                        <div className="row-content"><span>ТС:</span><p>Сюда вывести введённую инфу</p></div> 
                        <div className="row-content"><span>Прицеп:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Водитель:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Форма путевого листа:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Вид сообщения:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Вид перевозок:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Адрес выпуска на линию:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Выбранные даты:</span><p>Сюда вывести введённую инфу</p></div>
                        <div className="row-content"><span>Время выезда на линию:</span><p>Сюда вывести введённую инфу</p></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Модальное окно подтверждения удаления */}
                {showDeleteModal && (
                  <div className="delete-message-container">
                    <div className="delete-message">
                      <h2 className="delete-message-title">Вы уверены?</h2>
                      <p className="delete-message-description">
                        Удаление заявки невозможно отменить. Продолжить?
                      </p>
                    </div>
                    <div className="delete-btn-section">
                      <button className="delete-btn-back" onClick={cancelDelete}>
                        Назад
                      </button>
                      <button className="delete-btn-accept" onClick={confirmDelete}>
                        Удалить
                      </button>
                    </div>
                  </div>
                )}
                {/* Модальное окно с сообщением об удалении */}
                {showDeleteMessage && (
                  <DeleteMessage onCustomAction={handleCustomAction} />
                )}
                <div className="footer-btn-section-container">
                  <button className="footer-btn-delete" onClick={handleDeleteRequest}>
                    Удалить заявку
                  </button>
                  <button
                    className="footer-btn-confirm"
                    onClick={() => setSubStep('summary')}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            );
      
          case 'summary': // Последняя подстраница с итогами
            return (
              <div>
                <h1 className="form-details-title">Сумма заказа по всем заявкам ({requests.length})</h1>
                <div className="details-price-container">{totalSum} ₽</div>{/* Временно фиксированная цена, замени число, оставь знак */}
                <div className="request-info">Количество путевых листов по всем заказам {totalTripSheets}</div>
                <button
                  className="preview-btn"
                  onClick={handleCreateNewRequest}
                >
                  Следующая заявка
                </button>
                {showDeleteModal && (
                  <div className="delete-message-container">
                    <div className="delete-message">
                      <h2 className="delete-message-title">Вы уверены?</h2>
                      <p className="delete-message-description">
                        Удаление заказа невозможно отменить. Продолжить?
                      </p>
                    </div>
                    <div className="delete-btn-section">
                      <button className="delete-btn-back" onClick={cancelDelete}>
                        Назад
                      </button>
                      <button className="delete-btn-accept" onClick={confirmDeleteOrder}>
                        Удалить
                      </button>
                    </div>
                  </div>
                )}
                {showDeleteMessage && (
                  <DeleteMessage onCustomAction={handleCustomBack} />
                )}
                <div className="footer-btn-section-container">
                  <button className="footer-btn-delete" onClick={handleDeleteOrder}>
                    Удалить заказ
                  </button>
                  <button
                    className="footer-btn-confirm"
                    onClick={handleConfirmOrder}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            );
      
          default:
            return <div>Неизвестный шаг</div>;
        }        
      default:
        return <div>Неизвестный шаг</div>;
    }
  };

  if (vehicles.length === 0) {
    return <p>Нет доступных транспортных средств.</p>;
  }

  return (
    <div className="request-form">
      <div className='header-navigate-container'>
        <button className='header-btn-back' onClick={handleBack}>
          <img src={IconBack} alt="Back" />
        </button>
        <button className='header-btn-menu' onClick={() => navigate('/main')}>
          <img src={IconMenu} alt="Menu" />
        </button>
      </div>
      <form className='waybills' onSubmit={handleSubmit}>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="page-number">{currentStep} - <span className="total-page-number">{totalSteps}</span></div>
        <div className="form-content">{renderStepContent()}</div>
      </form>
    </div>
  );
};

export default RequestForm;