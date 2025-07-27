import React, { useState } from 'react';
import './AddAddressModal.css';

const AddAddressModal = ({ isOpen, onClose, onAdd }) => {
    const [type, setType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('РФ');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [room, setRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAddress = {
            type,
            postalCode,
            country,
            region,
            city,
            street,
            house,
            room
        };
        onAdd(newAddress);

        setType('');
        setPostalCode('');
        setCountry('РФ');
        setRegion('');
        setCity('');
        setStreet('');
        setHouse('');
        setRoom('');

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
               <h2>Добавить новый адрес</h2>
                <form onSubmit={handleSubmit} className="add-modal-form">
                    <div className="input-wrapper-address">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Тип адреса</span>
                        </label>
                        <select
                            className="form-delivery-input-field"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="" disabled hidden>Выберите из списка</option>
                            <option value="0">Юридический</option>
                            <option value="1">Почтовый</option>
                            <option value="2">Дополнительный</option>
                            <option value="3">Обособленное подразделение</option>
                            <option value="4">Выпуск на линию</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Индекс</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="number"
                            placeholder="Введите индекс"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Страна</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Область</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            placeholder="Введите область"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Город</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            placeholder="Введите город"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Улица</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            placeholder="Введите улицу"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Дом</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            placeholder="Введите номер дома"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Офис / помещение / квартира</span>
                        </label>
                        <input
                            className="form-delivery-input-field"
                            type="text"
                            placeholder="Например: кв. 23 или офис 15"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                    <div className="add-adress-modal-buttons">
                        <button type="button" onClick={onClose} className="footer-btn-delete">Отмена</button>
                        <button type="submit" className="footer-btn-confirm">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressModal;