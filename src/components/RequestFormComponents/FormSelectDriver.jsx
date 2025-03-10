import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useDrivers } from '../../hooks/useDrivers';
import DriverIcon from "../../assets/icons/ButtonIcons/driver-icon.svg";
import LoaderComponent from '../../components/LoaderComponent';

const FormSelectDriver = ({ handleNext }) => {
	const [selectedDriver, setSelectedDriver] = useState(null);
	const drivers = useDrivers()

	//console.log(drivers)

	const handleSelectDriver = (driver) => {
		setSelectedDriver(driver);
	};

	if (!drivers) return <div className='loader-page-spinner'><LoaderComponent /></div>

	return (
		<div>
			<h1 className="form-title">Выберите водителя</h1>
			<ul className="form-list-card">
				{/* <li
					onClick={() => handleSelectDriver({id: null})}
					className={`hover-form ${selectedDriver && selectedDriver.id === null ? 'selected' : ''}`}
				>
					<div className="form-list-card-container">
						<div className="form-img-icon">
							<img src={DriverIcon} alt="Driver" />
						</div>
						<div className="form-list-card-info-container">
							<h2 className="driver-name-null">Без ФИО</h2>
						</div>
					</div>
				</li> */}
				{drivers.map((driver) => (
					<li
						key={driver.personId}
						onClick={() => handleSelectDriver(driver)}
						className={`hover-form ${selectedDriver?.personId === driver.personId ? 'selected' : ''}`}
					>
						<div className="form-list-card-container">
							<div className="form-img-icon">
								<img src={DriverIcon} alt="Driver" />
							</div>
							<div className="form-list-card-info-container">
								<h2 className="driver-name">{driver.person.firstName + " " + driver.person.lastName}</h2>
								<p>
									<span>Телефон:</span> {driver.notificationPhone || "Без номера телефона"}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="footer-single-btn-container">
				<button
					className='footer-single-btn'
					onClick={() => handleNext([{ driverData: selectedDriver }])}
					disabled={!selectedDriver}
				>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectDriver