import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteMessage from '../DeleteMessage/DeleteMessage';

const FormSummary = ({ handleCreateNewRequest, submitForm }) => {
  const navigate = useNavigate();
  let wayBillsArray = JSON.parse(localStorage.getItem("wayBills"));


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handleDeleteModalToggle = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteMessageClose = () => {
    setShowDeleteMessage(false);
    navigate('/main');
  };

  const handleDeleteAction = () => {
    localStorage.setItem("wayBills", null);
    setShowDeleteModal(false);
    setShowDeleteMessage(true);
    navigate("/main")
  };

  return (
    <div>
      <h1 className="form-details-title">Формирование заказа </h1>
      <div className="request-info">Количество путевых листов по всем заявкам {wayBillsArray.map(wb=>wb.amountPL).reduce((a, c) => a + c, 0)}</div>
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
            <button className="delete-btn-back" onClick={handleDeleteModalToggle}>
              Назад
            </button>
            <button className="delete-btn-accept" onClick={handleDeleteAction}>
              Удалить
            </button>
          </div>
        </div>
      )}


      {showDeleteMessage && (
        <DeleteMessage
          onCustomAction={handleDeleteMessageClose}
          title="Заказ удален"
          description="Данные по заказу больше недоступны. Вы можете создать новый заказ на главном экране."
        />
      )}

      <div className="footer-btn-section-container">
        <button
          className="footer-btn-delete"
          onClick={handleDeleteModalToggle}
        >
          Удалить заказ
        </button>
        <button
          className="footer-btn-confirm"
          onClick={submitForm}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default FormSummary;
