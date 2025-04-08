import React, { useEffect, useState } from 'react';
import LoaderComponent from '../../components/LoaderComponent';
import '../../pages/styles/DeliveryForm.css';
import { useOwners } from '../../hooks/useOwners';

const FormOwnerPlatform = ({ handleNext }) => {
    const owners = useOwners()
    const [selectedOwnerName, setSelectedOwnerName] = useState("");
    const [selectedOwner, setSelectedOwner] = useState(null);

    const handelSelectOwner = (e) => {
        let own = owners.find(o => o.id === e.target.value);

        setSelectedOwnerName(own.name)
        setSelectedOwner(own);
    }

    useEffect(()=>{
        console.log("selOwnName", selectedOwnerName)
        console.log("selOwn", selectedOwner)
    }, [selectedOwner, selectedOwnerName])

    if (!owners) return <div className='loader-page-spinner'><LoaderComponent /></div>

    return (
        <div>
            <div className="form-title">
                <h1 className="delivery-form-title">Выберите владельца платформы</h1>
            </div>
            <div className="form-content">
                <div className="input-container-owner">
                    <div className="input-wrapper-owner">
                        <label className="delivery-form-label">
                            <span className="delivery-span-text">Выбор владельца</span>
                        </label>
                        <select
                            className="form-delivery-input-field"
                            value={selectedOwner ? selectedOwner.id : ""}
                            onChange={handelSelectOwner}
                        >
                            <option value="" disabled>Выберите из списка</option>
                            {owners.map((owner, index) => (
                                <option key={index} value={owner.id}>{owner.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="footer-btn-section-container">
                <button className="footer-form-skip-btn" onClick={handleNext}>
                    Пропустить
                </button>
                <button
                    className="footer-form-next-btn"
                    disabled={!selectedOwner}
                    onClick={() => handleNext([{ ownerData: selectedOwner }])}>
                    Далее
                </button>
            </div>
        </div>
    );
};

export default FormOwnerPlatform;
