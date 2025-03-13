import React, { useState } from 'react'
import PinnedIcon from "../../assets/icons/ButtonIcons/line-rounded-pin.svg";
import '../../pages/styles/RequestForm.css'
import { useAddresses } from '../../hooks/useAddresses';
import LoaderComponent from '../../components/LoaderComponent';

const FormSelectAddress = ({ companyId, handleNext }) => {
  const addresses = useAddresses(companyId)

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [pinnedAddress, setPinnedAddress] = useState(() => {
    let pinnedAddress = localStorage.getItem("pinnedAddress");
    setSelectedAddress(pinnedAddress)
    return pinnedAddress;
  });

  const handleAddressChange = (address, e) => {
    if (e) {
      e.stopPropagation();
      setPinnedAddress(pinnedAddress === address ? null : address);
      localStorage.setItem("pinnedAddress", (pinnedAddress === address ? null : address));

      setSelectedAddress(selectedAddress === address ? null : address);
    }
    else {
      setSelectedAddress(selectedAddress === address ? null : address);
    }
  }

  if (!addresses) return <div className='loader-page-spinner'><LoaderComponent /></div>

  const sortedAddresses = [...new Set(addresses)].sort((a, b) => {
    if (a === pinnedAddress) return -1;
    else return 0;
  })

  return (
    <div>
      <h1 className="form-title">Выберите адрес</h1>
      <ul className="form-list">
        {sortedAddresses.map((address, index) => (
          <li
            key={index}
            className={`form-address-item ${address === selectedAddress ? 'selected' : ''}`}
            style={{ backgroundColor: address === selectedAddress ? '#255328' : '' }}
            onClick={() => handleAddressChange(address)}
          >
            <div className="address-item-container">
              <p className="adress-title">{address}</p>
              <div className="adress-btn-container">
                <button onClick={(e) => handleAddressChange(address, e)}>
                  {pinnedAddress === address ? 'Открепить' : 'Закрепить'}
                </button>
              </div>
            </div>
            {pinnedAddress === address && (
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
          onClick={() => handleNext([{ customerAddress: selectedAddress }])}
          disabled={!selectedAddress}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default FormSelectAddress;
