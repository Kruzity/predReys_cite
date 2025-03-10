import React, { useState } from 'react'
import PinnedIcon from "../../assets/icons/ButtonIcons/line-rounded-pin.svg";
import '../../pages/styles/RequestForm.css'

const messageTypes = [
  "Городское",
  "Пригородное",
  "Междугородное"
]

const FormSelectMessageType = ({ handleNext }) => {
  const [selectedMessageTypes, setSelectedMessageTypes] = useState([]);
  const [pinnedMessageTypes, setPinnedMessageTypes] = useState(() => {
    let pinnedMessageTypes = localStorage.getItem("pinnedMessageTypes");
    let tmp = pinnedMessageTypes ? JSON.parse(pinnedMessageTypes) : []
    if (tmp.length) setSelectedMessageTypes(tmp)
    return tmp;
  });

  const handleChangeMessageTypes = (messageType, e) => {
    if (e) {
      e.stopPropagation();
      setPinnedMessageTypes(prevPinned =>
        prevPinned.includes(messageType)
          ? prevPinned.filter(type => type !== messageType)
          : [...prevPinned, messageType]
      );
      localStorage.setItem("pinnedMessageTypes", JSON.stringify(
        pinnedMessageTypes.includes(messageType)
          ? pinnedMessageTypes.filter(type => type !== messageType)
          : [...pinnedMessageTypes, messageType]
      ));

      if (!pinnedMessageTypes.includes(messageType)) {
        setSelectedMessageTypes(selectedMessageTypes.includes(messageType)
          ? selectedMessageTypes.filter(s => s !== messageType)
          : [...selectedMessageTypes, messageType]
        );
      } else {
        setSelectedMessageTypes(selectedMessageTypes.includes(messageType)
          ? selectedMessageTypes.filter(s => s !== messageType)
          : [...selectedMessageTypes, messageType]
        );
      }
    }
    else {
      if (!pinnedMessageTypes.includes(messageType)) {
        setSelectedMessageTypes(selectedMessageTypes.includes(messageType)
          ? selectedMessageTypes.filter(s => s !== messageType)
          : [...selectedMessageTypes, messageType]
        );
      } else {
        setSelectedMessageTypes(selectedMessageTypes.includes(messageType)
          ? selectedMessageTypes.filter(s => s !== messageType)
          : [...selectedMessageTypes, messageType]
        );
      }
    }

  }

  const sortedMessageTypes = messageTypes.sort((a, b) => {
    if (pinnedMessageTypes.includes(a) && !pinnedMessageTypes.includes(b)) return -1;
    if (!pinnedMessageTypes.includes(a) && pinnedMessageTypes.includes(b)) return 1;
    return 0;
  });

  return (
    <div>
      <h1 className="form-title">Выберите тип сообщения</h1>
      <ul className="form-list">
        {sortedMessageTypes.map((messageType, index) => (
          <li
            key={index}
            className={`form-address-item ${selectedMessageTypes.includes(messageType) ? 'selected' : ''}`}
            style={{
              backgroundColor: selectedMessageTypes.includes(messageType) ? '#255328' : '',
            }}
            onClick={() => handleChangeMessageTypes(messageType)}
          >
            <div className="address-item-container">
              <p className="adress-title">{messageType}</p>
              <div className="adress-btn-container">
                <button onClick={(e) => handleChangeMessageTypes(messageType, e)}>
                  {pinnedMessageTypes.includes(messageType) ? 'Открепить' : 'Закрепить'}
                </button>
              </div>
            </div>
            {pinnedMessageTypes.includes(messageType) && (
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
          onClick={() => handleNext([{ transportationTypes: selectedMessageTypes }])}
          disabled={!selectedMessageTypes.length}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default FormSelectMessageType;
