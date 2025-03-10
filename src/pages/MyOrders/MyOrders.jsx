import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigateHeader from "../../components/NavigateHeader/NavigateHeader";
import ListIcon from "../../assets/icons/ButtonIcons/list-icon-arrow.svg";
import "../../pages/styles/MyOrders.css";
import { useWayBills } from "../../hooks/useWayBills";
import LoaderComponent from "../../components/LoaderComponent";

const MyOrders = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  //console.log("location state", location.state)
  const wayBills = useWayBills();
  const [selectedEntry, setSelectedEntry] = useState(state?.selectedEntry || null);

  if (!wayBills || wayBills.length === 0) {
    return <div className="loader-page-spinner"><LoaderComponent /></div>;
  }

  const ordersMap = wayBills.reduce((acc, bill) => {
    const key = bill.track || "Ожидает обработки";
    if (!acc[key]) acc[key] = [];
    acc[key].push(bill);
    return acc;
  }, {});

  const orderEntries = Object.entries(ordersMap);

  const handleBack = () => {
    console.log("selectedOrder", selectedEntry)
    if (selectedEntry) {
      setSelectedEntry(null);
    } else {
      navigate(-1);
    }
  };


  return (
    <div>
      <NavigateHeader onBack={handleBack} />
      <div className="my-orders-title-section">
        <h1 className="my-orders-title">
          {selectedEntry ? `Заказ ${selectedEntry.track}` : "Мои заказы"}
        </h1>
        <p className="my-orders-title-description">
          {selectedEntry ? "Заявки в выбранном заказе" : "Выберите заказ, чтобы узнать больше информации"}
        </p>
      </div>

      {!selectedEntry ? (
        <ul className="my-orders-list-card">
          {orderEntries.map(([track, bills], index) => (
            <li
              key={index}
              onClick={() => setSelectedEntry({ track, bills })}
              className="my-orders-list-content"
              style={{ cursor: "pointer", marginBottom: "8px" }}
            >
              <div>
                <h2>Заказ {track}</h2>
                <div className="my-orders-text-section">
                  <p><span>Количество заявок</span> {bills.length}</p>
                  <p><span>Организация</span> <div className="org-width">{bills[0].wayBillContent.customerName}</div></p>
                </div>
              </div>
              <img className="org-action-icon" src={ListIcon} alt="Подробнее" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="my-orders-list-card">
          {selectedEntry.bills.map((bill) => (
            <li
              key={bill.id}
              onClick={() => navigate(`/orders/${bill.id}/requests/${bill.id}`, {
                state: { billData: bill, selectedEntry: selectedEntry }
              })}
              className="my-orders-list-content"
              style={{ cursor: "pointer", marginBottom: "8px" }}
            >
              <div>
                <h2>Заявка №{bill.numberRequest} - {bill.track || "Ожидает обработки"}</h2>
                <div className="my-orders-text-section">
                  <p><span>Организация</span> <div className="org-width">{bill.wayBillContent.customerName}</div></p>
                  <p><span>Заявки</span> {bill.quantity}</p>
                  <p><span>Путевых листов</span> {bill.amount}</p>
                </div>
              </div>
              <img className="org-action-icon" src={ListIcon} alt="Подробнее" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
