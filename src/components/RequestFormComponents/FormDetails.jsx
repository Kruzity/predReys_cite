import React, { useState } from 'react'
import DeleteMessage from '../DeleteMessage/DeleteMessage'

const FormDetails = ({ formData, handleNext, setShowPreview}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);


  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setShowDeleteMessage(true);
  };

  const handleCustomAction = () => {
    setShowDeleteMessage(false);
    setShowPreview(false);
    handleNext([], true);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowPreview(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-header">
          <div className="modal-details-title">Предпросмотр заявки</div>
          <button className="modal-close" onClick={() => setShowPreview(false)}>×</button>
        </div>
        <div className="preview-content">
          <div className="row-content"><span>ТС:</span><p>{formData.vehicleData ? formData.vehicleData.sts.car.value : '—'}</p></div>
          <div className="row-content"><span>Прицеп:</span><p>{formData.vehicleData?.trailer || '—'}</p></div>
          <div className="row-content"><span>Водитель:</span><p>{formData.driverData ? `${formData.driverData.firstName} ${formData.driverData.lastName}` : '—'}</p></div>
          <div className="row-content"><span>Медик:</span><p>{formData.medicData ? `${formData.medicData.firstName} ${formData.medicData.lastName}` : '—'}</p></div>
          <div className="row-content"><span>Диспетчер:</span><p>{formData.dispatcherData ? `${formData.dispatcherData.firstName} ${formData.dispatcherData.lastName}` : '—'}</p></div>
          <div className="row-content"><span>Техник:</span><p>{formData.technicianData ? `${formData.technicianData.firstName} ${formData.technicianData.lastName}` : '—'}</p></div>
          <div className="row-content"><span>Форма путевого листа:</span><p>{formData.wayBillFormType || '—'}</p></div>
          <div className="row-content"><span>Вид сообщения:</span><p>{formData.transportationTypes.length ? formData.transportationTypes.join(", ") : '—'}</p></div>
          <div className="row-content"><span>Вид перевозок:</span><p>{formData.typesOfTransportService.length ? formData.typesOfTransportService.join(', ') : '—'}</p></div>
          <div className="row-content"><span>Адрес выпуска на линию:</span><p>{formData.customerAddress}</p></div>
          <div className="row-content"><span>Выбранные даты:</span><p>{formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : '—'}</p></div>
          <div className="row-content"><span>Время выезда на линию:</span><p>{`${formData.startTime ?? " "} - ${formData.endTime ?? " "}`}</p></div>
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
          {showDeleteMessage && (
            <DeleteMessage
              onCustomAction={handleCustomAction}
              title="Заявка удалена"
              description="Данные по заявке больше недоступны. Вы можете создать новую заявку на главном экране"
            />
          )}
          <div className="footer-btn-section-container">
            <button className="footer-btn-delete" onClick={handleDeleteClick}>Удалить</button>
            <button className="footer-btn-confirm" onClick={handleNext}>Подтвердить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetails;
