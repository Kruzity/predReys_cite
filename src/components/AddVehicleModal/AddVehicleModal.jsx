import React, { useState } from 'react';
import './AddVehicleModal.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { API } from '../../requestAPI';

async function getBase64(file) {
  return new Promise((res, rej) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      res(reader.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      rej('Error: ', error);
    };
  })
}

const AddVehicleModal = ({ isOpen, onClose, onSubmit, companyId }) => {
  const [serialSts, setSerialSts] = useState('');
  const [NumberSts, setNumberSts] = useState('');
  const [frontScan, setFrontScan] = useState(null);
  const [backScan, setBackScan] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post('https://stagensi.predreysdoc.com/api/v1/Cars/FromStsNumber', {
      "TenantId": null,
      "CompanyId": companyId,
      "Series": serialSts,
      "Number": NumberSts,
      "FrontSideScanId": frontScan.fileRes.data.id,
      "BackSideScanId": backScan.fileRes.data.id
    })
    
    //onSubmit(formData);
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSerialSts('');
    setNumberSts('');
    setFrontScan(null);
    setBackScan(null);
    setError(null);
  };

  const handleFileChange = async (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      let file_ex = file.name.split(".")[1]
      let base64file = await getBase64(file)
      //console.log(file_ex, base64file)
      let fileResp = await API.post("https://stagensi.predreysdoc.com/api/v1/ScanImages", {
        Base64: base64file,
        CompanyId: companyId,
        Description: null,
        ImageType: file_ex,
        ScanType: 1, //Спросить почему 3
        TenantId: null,
      })
      console.log(fileResp)
      setFile({ file: file, fileRes: fileResp });
      setError(null);
    } else {
      setError({
        title: 'Ошибка',
        description: 'Разрешено добавлять только фотографии',
        errorBtnText: 'Продолжить'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <h2>Добавить ТС</h2>
        <form onSubmit={handleSubmit} className="add-modal-form">
          <div className="input-wrapper">
            <label className="delivery-form-label">
              <span className="delivery-span-text">Серия СТС</span>
            </label>
            <input
              className="form-delivery-input-field"
              type="text"
              placeholder="Введите серию СТС"
              value={serialSts}
              onChange={(e) => setSerialSts(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className="delivery-form-label">
              <span className="delivery-span-text">Номер СТС</span>
            </label>
            <input
              className="form-delivery-input-field"
              type="text"
              placeholder="Введите номер СТС"
              value={NumberSts}
              onChange={(e) => setNumberSts(e.target.value)}
              required
            />
          </div>
          <h2 className='second-modal-title'>Добавить фото</h2>
          {error && (
            <ErrorMessage
              title={error.title}
              description={error.description}
              errorBtnText={error.errorBtnText}
              onClose={() => setError(null)}
            />
          )}

          <div className="file-upload-wrapper">
            <input
              type="file"
              accept="image/*"
              id="front-scan"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setFrontScan)}
            />
            <button
              type="button"
              className="file-upload-btn"
              onClick={() => document.getElementById('front-scan').click()}
            >
              {frontScan ? frontScan.file.name : 'Передний скан'}
            </button>

            <input
              type="file"
              accept="image/*"
              id="back-scan"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setBackScan)}
            />
            <button
              type="button"
              className="file-upload-btn"
              onClick={() => document.getElementById('back-scan').click()}
            >
              {backScan ? backScan.file.name : 'Задний скан'}
            </button>
          </div>

          <div className="add-adress-modal-buttons">
            <button type="button" onClick={handleCancel} className="footer-btn-delete">Отмена</button>
            <button type="submit" className="footer-btn-confirm">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
