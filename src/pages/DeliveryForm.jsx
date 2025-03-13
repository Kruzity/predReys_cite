import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCompanyAddresses } from '../hooks/useCompanyAddresses';
import { useCompanyContacts } from '../hooks/useCompanyContacts';
import LoaderComponent from '../components/LoaderComponent';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import DeleteMessage from '../components/DeleteMessage/DeleteMessage';
import './styles/DeliveryForm.css';
import { DateTime } from "luxon"
import { API } from '../requestAPI';

const formatTimezoneOffset = () => {
  let offset = Math.abs(new Date().getTimezoneOffset());
  return `${String(offset / 60 | 0).padStart(2, '0')}:${String(offset % 60).padStart(2, '0')}:00`;
};

const formatDate = (date, isLocal) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(date, isLocal,timeZone)
  const parsedDate = DateTime.fromFormat(date, "dd.MM.yyyy", { zone: timeZone });
  return (isLocal ? parsedDate.toUTC().toISO() : parsedDate.toISO())
}

const travelForms = [
  "Т3 (легковые до 3,5 т)",
  "4С (грузовые >3,5 т)",
  "4П (грузовые >3,5 т)",
  "ЭСМ-2 (строительная)",
  "Форма 3 спец (специального авто)",
  "Ф412 (трактор)",
  "Т6 спец (автобус необщ пользования)",
  "ПГ-1 (для ИП)",
  "Автокран (стрелового самоходного)",
  "4М (международного)"
]

const DeliveryForm = () => {
  const location = useLocation();
  const { wayBills } = location.state;

  const navigate = useNavigate();
  const deliveryAddresses = useCompanyAddresses();
  const recipients = useCompanyContacts();

  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedRecipientName, setSelectedRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecipientChange = (e) => {
    const recipient = recipients.find(r => r.id === e.target.value)

    setSelectedRecipient(recipient)
    setSelectedRecipientName(recipient ? recipient.description : "");
    setRecipientPhone(recipient ? recipient.phone : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let promisesArray = wayBills.map(wb => {
        let data = {
          CompanyId: wb.companyData.companyId,
          EndDate: formatDate(wb.endDate, true),
          EndDateDt: formatDate(wb.endDate, false),
          OneWayBill: wb.oneWayBill,
          PostalAddress: selectedAddress,
          Recipient: selectedRecipientName,
          RecipientContactPhone: recipientPhone,
          RecipientId: selectedRecipient.id,
          StartDate: formatDate(wb.startDate, true),
          StartDateDt: formatDate(wb.startDate, false),
          TenantId: wb.companyData.tenantId,
          TransportationTypes: wb.transportationTypes,
          TypesOfTransportService: wb.typesOfTransportService,
          UtcOffset: formatTimezoneOffset(),
          WayBillContent: {
            CompanyContent: `${wb.companyData.company.name}  ${wb.companyData.company.postalCode}  г. ${wb.companyData.company.city} ул. ${wb.companyData.company.street} дом ${wb.companyData.company.house}, ком. ${wb.companyData.company.room} ОГРН ${wb.companyData.company.ogrn} Тел: ${wb.companyData.phone}`,
            CustomerAddress: wb.customerAddress,
            CustomerId: wb.companyData.companyId,
            CustomerName: wb.companyData.company.name,
            DispatcherId: wb.dispatcherData?.id,
            DispatcherNameContent: wb.dispatcherData ? `${wb.dispatcherData?.lastName} ${wb.dispatcherData?.firstName} ${wb.dispatcherData?.middleName}` : null,
            DriverId: wb.driverData?.id,
            DriverLicenseCategoriesContent: wb.driverData ? wb.driverData.driverLicenseCategories : null,
            DriverLicenseIssuedAtContent: wb.driverData ? new Date(wb.driverData.driverLicenseIssuedAt).toLocaleDateString("ru-RU") : null,
            DriverLicenseNumberContent: wb.driverData ? `${wb.driverData.driverLicenseNumber} ${wb.driverData.driverLicenseSeries}` : null,
            DriverNameContent: wb.driverData ? `${wb.driverData.lastName} ${wb.driverData.firstName} ${wb.driverData.middleName}` : null,
            DriverSnilsContent: wb.driverData ? wb.driverData.snils : null,
            FuelGrade: wb.vehicleData.fuelGrade,
            Id: "00000000-0000-0000-0000-000000000000",//?
            MedicalId: wb.medicData?.id,
            MedicalNameContent: wb.medicaData ? `${wb.medicData?.lastName} ${wb.medicData?.firstName} ${wb.medicData?.middleName}` : null,
            OwnerPlatformCompanyId: wb.ownerData?.id,
            OwnerPlatformContent: wb.ownerData ? `${wb.ownerData?.name} Лицензия № ${wb.ownerData?.licenceNumber} от ${new Date(wb.ownerData?.licenceIssuedDate).toLocaleDateString("ru-RU")}` : null,
            PostRaceTechnician: false,
            PostRaceTechnicianId: null,
            PostRaceTechnicianNameContent: null,
            RegistrationNumberContent: wb.vehicleData.sts.registrationNumber,
            TechInspectionCompanyContent: null,//?
            TechnicianId: wb.technicianData?.id,
            TechnicianNameContent: wb.technicianData ? `${wb.technicianData?.lastName} ${wb.technicianData?.firstName} ${wb.technicianData?.middleName}` : null,
            VehicleContent: `${wb.vehicleData.sts.vehicleType} ${wb.vehicleData.sts.brandModel}`,
            VehicleContractContent: null,//?
            VehicleId: wb.vehicleData.id
          },
          WayBillFormType: travelForms.indexOf(wb.wayBillFormType),
        }

        console.log(data)
        return API.post("https://stagewaybills.predreysdoc.com/api/v1/WayBillRequests", data)
      })

      let respData = await Promise.all(promisesArray)
      console.log(respData)
      if (respData.every(res => res.status === 201))
        setShowDeleteMessage(true);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomBack = () => {
    setShowDeleteMessage(false);
    navigate("/main");
  };

  if (!deliveryAddresses || !recipients) {
    return <div className='loader-page-spinner'><LoaderComponent /></div>;
  }

  return (
    <div className="delivery-form">
      {isLoading ? (
        <div className='loader-page-spinner'><LoaderComponent /></div>
      ) : (
        <div className="step-1">
          <NavigateHeader />
          <div className="delivery-form-title-section">
            <h1 className="delivery-form-title">Оформление доставки</h1>
            <p className="delivery-form-title-description">Введите нужные данные</p>
          </div>
          <form className="delivery-form-form" onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="input-container">
                <div className="input-wrapper">
                  <label className="delivery-form-label">
                    <span className="delivery-span-text">Адрес доставки</span>
                  </label>
                  <select
                    className="form-delivery-input"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  >
                    <option value="" disabled>Выберите адрес доставки</option>
                    {deliveryAddresses.map((address, index) => (
                      <option key={index} value={address}>{address}</option>
                    ))}
                  </select>
                </div>
                <div className="input-wrapper">
                  <label className="delivery-form-label">
                    <span className="delivery-span-text">Получатель</span>
                  </label>
                  <select
                    className="form-delivery-input"
                    value={selectedRecipientName}
                    onChange={handleRecipientChange}
                  >
                    <option value="" disabled>Выберите получателя</option>
                    {recipients.map((recipient, index) => (
                      <option key={index} value={recipient.id}>{recipient.description}</option>
                    ))}
                  </select>
                </div>
                {recipientPhone && (
                  <div className="input-wrapper-number">
                    <label className="delivery-form-label">
                      <span className="delivery-span-text">Телефон получателя</span>
                    </label>
                    <input
                      className="form-delivery-input"
                      type="text"
                      value={recipientPhone}
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="footer-delivery-btn-container">
              <button
                className="footer-delivery-btn"
                type="submit"
                disabled={!selectedAddress || !selectedRecipient || isLoading}
              >
                Подтвердить
              </button>
            </div>
          </form>
          {showDeleteMessage && (
            <DeleteMessage onCustomAction={handleCustomBack}
              title="Заказ подтверждён"
              description="Заказ сохранён и готов к обработке. Вы можете посмотреть детали заказа в разделе “Мои заказы”"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
