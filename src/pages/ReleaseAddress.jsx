import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';

import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import PinnedIcon from "../assets/icons/ButtonIcons/line-rounded-pin.svg";
import "./styles/ReleaseAddress.css";
import LoaderComponent from '../components/LoaderComponent';

const ReleaseAddress = () => {
  const location = useLocation()
  const { companyId } = location.state;
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [pinnedAddress, setPinnedAddress] = useState(null); 

  const { data, isPending, isError } = useQuery({
    queryKey: ["release_addresses" + companyId],
    queryFn: async () => {
      const response = (await API.get("https://stagensi.predreysdoc.com/api/v1/CompanyAddresses", { params: { "CompanyId": companyId } })).data.items
      console.log(response)
      //response = [];
      return ((response && response.length) ? response.map(r => `${r.city}, ${r.street}`) : []);
    }
  })

  // const handleSelect = (address) => {
  //   if (!selectedAddresses.includes(address)) {
  //     setSelectedAddresses([...selectedAddresses, address]);
  //   } else {
  //     setSelectedAddresses(selectedAddresses.filter((item) => item !== address));
  //   }
  // };

  // const handlePin = (address) => {
  //   if (pinnedAddress === address) {
  //     setPinnedAddress(null);
  //     setSelectedAddresses(selectedAddresses.filter((item) => item !== address));
  //   } else {
  //     setPinnedAddress(address);
  //     if (!selectedAddresses.includes(address)) {
  //       setSelectedAddresses([...selectedAddresses, address]);
  //     }
  //   }
  // };

  const sortedAddresses = pinnedAddress
    ? [pinnedAddress, ...data.filter((address) => address !== pinnedAddress)]
    : data;

    if (isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

  return (
    <div className="release-address">
      <NavigateHeader />
      <h1 className='release-address-title'>Выберите адрес выпуска на линию</h1>
      
      <ul className='address-container'>
        {sortedAddresses.map((address, index) => (
          <li
            key={index}
            className={`address-item ${selectedAddresses.includes(address) ? 'selected' : ''}`}
            style={{
              backgroundColor: selectedAddresses.includes(address) ? '#255328' : '',
            }}
          >
            <div className="address-item-container">
              <p className='adress-title'>{address}</p>
              {/* <div className="adress-btn-container">
                <button onClick={() => handleSelect(address)}>
                  {selectedAddresses.includes(address) ? 'Отменить' : 'Выбрать'}
                </button>
                
                {pinnedAddress === address ? (
                  <button onClick={() => handlePin(address)}>Открепить</button>
                ) : (
                  !pinnedAddress && (
                    <button onClick={() => handlePin(address)}>Закрепить</button>
                  )
                )}
              </div> */}
            </div>
            
            {/* {pinnedAddress === address && (
              <div className="pinned-icon">
                <img src={PinnedIcon} alt="Pinned" />
              </div>
            )} */}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ReleaseAddress;
