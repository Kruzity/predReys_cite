import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateHeader from "../../components/NavigateHeader/NavigateHeader";
import ListIcon from "../../assets/icons/ButtonIcons/list-icon-arrow.svg";
import CopyIcon from "../../assets/icons/ButtonIcons/copy-btn-img.svg";
import "../../pages/styles/OrderDetails.css";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { billData } = location.state;

  if (!order) return <p>Заказ не найден</p>;

  const handleCopy = (event, requestDetails) => {
    event.stopPropagation();
    // Здесь можно добавить логику копирования деталей заявки
    console.log("Скопированы детали заявки:", requestDetails);
  };

  return (
    <div>
      <NavigateHeader />
      <div className="my-orders-details-title-section">
        <p className="my-orders-header-title">Заказ</p>
        <h1 className="my-orders-details-title">{formattedDate}</h1>
      </div>
      <div className="my-orders-list-card" style={{ marginBottom: "32px" }}>
        <div>
          <div className="my-orders-text-section">
            <p><span>Заявок</span> {order.requests.length}</p>
            <p><span>Путевых листов</span> {totalTripSheets}</p>
            <p><span>Общая сумма</span> {totalSum} ₽</p>
          </div>
        </div>
      </div>

      <ul className="my-orders-list-card">
        {order.requests.map((request) => (
          <li
            key={request.id}
            className="my-orders-list-content"
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => navigate(`/orders/${orderId}/requests/${request.id}`)}
          >
            <div>
              <h2>Заявка #{request.id}</h2>
              <div className="orders-details-text-section">
                <p><span>Дата заявки</span> {request.date}</p>
                <p><span>Данные ТС</span> {request.vehicle.brand} {request.vehicle.model}, {request.vehicle.licensePlate}</p>
                <p><span>Путевых листов</span> {request.tripSheets}</p>
                <p><span>Сумма</span> {request.sum} ₽</p>
              </div>
              <button
                className="order-details-copy-btn"
                onClick={(e) => handleCopy(e, request)}
              >
                <img src={CopyIcon} alt="" />
                <span>Скопировать детали заявки</span>
              </button>
            </div>
            <img className="org-action-icon" src={ListIcon} alt=""/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
