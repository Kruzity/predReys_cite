import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';

import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import PinnedIcon from "../assets/icons/ButtonIcons/line-rounded-pin.svg";
import "./styles/ReleaseAddress.css";
import LoaderComponent from '../components/LoaderComponent';
import AddButton from '../components/AddButton/AddButton';
import AddAddressModal from '../components/AddAddressModal/AddAddressModal';

const ReleaseAddress = () => {
  const location = useLocation()
  const { companyId } = location.state;
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [pinnedAddress, setPinnedAddress] = useState(null); 
  //Новое
  const [showModal, setShowModal] = useState(false);
  const [customAddresses, setCustomAddresses] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["release_addresses" + companyId],
    queryFn: async () => {
      const response = (await API.get("https://stagensi.predreysdoc.com/api/v1/CompanyAddresses", { params: { "CompanyId": companyId } })).data.items
      console.log(response)
      //response = [];
      return ((response && response.length) ? response.map(r => `${r.city}, ${r.street}`) : []);
    }
  })
  //Новое
  const allAddresses = [...(data || []), ...customAddresses];
  //Новое (Переделал под новое)
  const sortedAddresses = pinnedAddress
    ? [pinnedAddress, ...allAddresses.filter((address) => address !== pinnedAddress)]
    : allAddresses;

  const handleAddAddress = (newAddress) => {
    setCustomAddresses(prev => [...prev, newAddress]);
  };

    if (isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

  return (
    <div className="release-address">
      <NavigateHeader />
      <h1 className='release-address-title'>Адреса выпуска на линию</h1>
      <AddButton 
        onClick={() => setShowModal(true)} 
        AddText="Добавить адрес" 
        />
      <AddAddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddAddress}
      />
      <ul className='address-container'>
        {sortedAddresses.map((address, index) => {
          const addressString = typeof address === 'object'
            ? `${address.city}, ${address.street}, ${address.house} ${address.room || ''}`  
            : address; 

          return (
            <li
              key={index}
              className={`address-item ${selectedAddresses.includes(addressString) ? 'selected' : ''}`}
              style={{
                backgroundColor: selectedAddresses.includes(addressString) ? '#255328' : '',
              }}
            >
              <div className="address-item-container">
                <p className='adress-title'>{addressString}</p>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default ReleaseAddress;
