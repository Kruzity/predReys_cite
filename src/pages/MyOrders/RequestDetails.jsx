import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigateHeader from "../../components/NavigateHeader/NavigateHeader";
import organizations from "../../Data/organizations";
import "../styles/RequestDetails.css"

const RequestDetails = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { billData, selectedEntry } = location.state;

  const handleBack = () => {
    navigate("/orders", { state: { selectedEntry: selectedEntry } })
  }

  return (
    <div>
      <NavigateHeader onBack={handleBack} />
      <div className="my-orders-details-title-section">
        <p className="my-orders-header-title">Заявка</p>
        <h1 className="my-orders-details-title">№<br />{billData.numberRequest}</h1>
      </div>
      <div className="request-vehicle-details request-flex-wrap">
        <div className="my-request-text-section">
          <p>
            <span>Марка ТС</span>
            <div className="req-width">{billData.wayBillContent.vehicleContent}</div>
          </p>
          <p>
            <span>Госномер ТС</span>
            <div className="req-width">{billData.wayBillContent.registrationNumberContent}</div>
          </p>
        </div>
      </div>
      {!billData.wayBillContent.trailerId && billData.wayBillContent.trailerModelContent && billData.wayBillContent.trailerNumberContent && (
        <div className="request-details-trailerinfo">
          <h3 className="trailer-title">{billData.wayBillContent.trailerModelContent}</h3>
          <div className="request-details-trailerinfo-description">
            <div className="my-request-text-section">
              <p>
                <span>Марка</span>
                <div className="req-width">{billData.wayBillContent.trailerModelContent}</div>
              </p>
              <p>
                <span>Госномер</span>
                <div className="req-width">{billData.wayBillContent.trailerNumberContent}</div>
              </p>
            </div>
          </div>
        </div>
      )}


      <div className="request-driver-card request-flex-wrap">
        <div className="row"><span>Водитель</span><p>{billData.wayBillContent.driverNameContent}</p></div>
      </div>
      <div className="request-tripsheets-container request-flex-wrap">
        <div className="row"><span>Форма путевого листа</span><p>{billData.wayBillFormType}</p></div>
        {/* <div className="row"><span>Кол-во путевых листов</span><p>{request.tripSheets}</p></div>
        <div className="row"><span>Сумма</span><p>{request.sum} ₽</p></div> */}
      </div>
      <div className="request-send-address-container flex-address-cont">
        <div className="request-send-address-title flex-address-title">Адрес выпуска на линию</div>
        <div className="request-send-address-card flex-address-card">{billData.wayBillContent.customerAddress}</div>
      </div>
      <div className="request-delivery-address-container flex-address-cont">
        <div className="request-delivery-address-title flex-address-title">Адрес доставки</div>
        <div className="request-delivery-address-card flex-address-card">{billData.postalAddress}  </div>
      </div>
      <div className="request-recipient-container">
        <h3 className="request-recipient-title">Получатель</h3>
        <div className="row"><span>ФИО</span><p>{billData.recipient}</p></div>
        <div className="row"><span>Телефон</span><p>{billData.recipientContactPhone}</p></div>
      </div>

    </div>
  );
};

export default RequestDetails;
