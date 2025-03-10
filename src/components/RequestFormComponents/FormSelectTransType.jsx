import React, { useState } from 'react'
import PinnedIcon from "../../assets/icons/ButtonIcons/line-rounded-pin.svg";
import '../../pages/styles/RequestForm.css'

const transportationTypes = [
  "Коммерческие перевозки",
  "Перевозки для собственных нужд",
  "Передвижение и работа специальных ТС"
]

const FormSelectTransType = ({ handleNext }) => {
  const [selectedTransportationType, setSelectedTransportationType] = useState([]);
  const [pinnedTransportationTypes, setPinnedTransportationTypes] = useState(() => {
    let pinnedTransportationTypes = localStorage.getItem("pinnedTransportationTypes");
    let tmp = pinnedTransportationTypes ? JSON.parse(pinnedTransportationTypes) : []
    if (tmp.length) setSelectedTransportationType(tmp)
    return tmp;
  });

  const handleChangeSelectedTransportationType = (transportationType, e) => {
    if (e) {
      e.stopPropagation()
      setPinnedTransportationTypes(prevPinned =>
        prevPinned.includes(transportationType)
          ? prevPinned.filter(type => type !== transportationType)
          : [...prevPinned, transportationType]
      );
      localStorage.setItem("pinnedTransportationTypes", JSON.stringify(
        pinnedTransportationTypes.includes(transportationType)
          ? pinnedTransportationTypes.filter(type => type !== transportationType)
          : [...pinnedTransportationTypes, transportationType]
      ));

      if (!pinnedTransportationTypes.includes(transportationType)) {
        setSelectedTransportationType(
          selectedTransportationType.includes(transportationType) ?
            selectedTransportationType.filter(s => s !== transportationType) :
            [...selectedTransportationType, transportationType]
        );
      } else {
        setSelectedTransportationType(
          selectedTransportationType.includes(transportationType) ?
            selectedTransportationType.filter(s => s !== transportationType) :
            [...selectedTransportationType, transportationType]
        );
      }
    }
    else {
      if (!pinnedTransportationTypes.includes(transportationType)) {
        setSelectedTransportationType(
          selectedTransportationType.includes(transportationType) ?
            selectedTransportationType.filter(s => s !== transportationType) :
            [...selectedTransportationType, transportationType]
        );
      } else {
        setSelectedTransportationType(
          selectedTransportationType.includes(transportationType) ?
            selectedTransportationType.filter(s => s !== transportationType) :
            [...selectedTransportationType, transportationType]
        );
      }
    }

  }

  const sortedTransportationTypes = transportationTypes.sort((a, b) => {
    if (pinnedTransportationTypes.includes(a) && !pinnedTransportationTypes.includes(b)) return -1;
    if (!pinnedTransportationTypes.includes(a) && pinnedTransportationTypes.includes(b)) return 1;
    return 0;
  });

  return (
    <div>
      <h1 className="form-title">Выберите тип перевозки</h1>
      <ul className="form-list">
        {sortedTransportationTypes.map((transportationType, index) => (
          <li
            key={index}
            className={`form-address-item ${selectedTransportationType.includes(transportationType) ? 'selected' : ''}`}
            style={{
              backgroundColor: selectedTransportationType.includes(transportationType) ? '#255328' : '',
            }}
            onClick={() => handleChangeSelectedTransportationType(transportationType)}
          >
            <div className="address-item-container">
              <p className="adress-title">{transportationType}</p>
              <div className="adress-btn-container">
                <button onClick={(e) => handleChangeSelectedTransportationType(transportationType, e)}>
                  {pinnedTransportationTypes.includes(transportationType) ? 'Открепить' : 'Закрепить'}
                </button>
              </div>
            </div>
            {pinnedTransportationTypes.includes(transportationType) && (
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
          onClick={() => handleNext([{ typesOfTransportService: selectedTransportationType }])}
          disabled={!selectedTransportationType.length}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default FormSelectTransType;
