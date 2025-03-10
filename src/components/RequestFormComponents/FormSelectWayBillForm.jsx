import React, { useState } from 'react'
import PinnedIcon from "../../assets/icons/ButtonIcons/line-rounded-pin.svg";
import '../../pages/styles/RequestForm.css'

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

const FormSelectWayBillForm = ({ handleNext }) => {
  const [wayBillForm, setWayBillForm] = useState("");
  const [pinnedWayBillForm, setPinnedWayBillForm] = useState(() => {
    let pinnedWayBillForm = localStorage.getItem("pinnedWayBillForm");
    if(pinnedWayBillForm !== null) setWayBillForm(pinnedWayBillForm)
    return pinnedWayBillForm;
  })

  const handleSelectForm = (form) => {
    if (pinnedWayBillForm !== form) {
      setWayBillForm(wayBillForm === form ? "" : form);
    } else {
      setWayBillForm(wayBillForm === form ? "" : form);
    }
  };

  const handlePinForm = (form, e) => {
    e.stopPropagation(); 
    setPinnedWayBillForm((pinnedWayBillForm === form ? null : form))
    localStorage.setItem("pinnedWayBillForm", (pinnedWayBillForm === form ? null : form))
  };

  const sortedTravelForms = travelForms.sort((a, b) => {
    if (pinnedWayBillForm === a) return -1; // Закрепленная форма на первом месте
    if (pinnedWayBillForm === b) return 1;  // Остальные формы идут после
    return 0;
  });

  return (
    <div>
      <h1 className="form-title">Выберите форму путевого листа</h1>
      <ul className="form-list-waybill">
        {sortedTravelForms.map((form, index) => (
          <li
            key={index}
            className={`form-address-item ${form === wayBillForm ? 'selected' : ''}`}
            style={{
              backgroundColor: form === wayBillForm ? '#255328' : '',
            }}
            onClick={() => handleSelectForm(form)}
          >
            <div className="address-item-container">
              <p className="adress-title">{form}</p>
              <div className="adress-btn-container">
                <button onClick={(e) => handlePinForm(form, e)}>
                  {pinnedWayBillForm === form ? 'Открепить' : 'Закрепить'}
                </button>
              </div>
            </div>
            {pinnedWayBillForm === form && (
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
          onClick={() => handleNext([{ wayBillFormType: wayBillForm }])}
          disabled={!wayBillForm}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default FormSelectWayBillForm;
