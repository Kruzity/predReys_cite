import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useDispatchers } from '../../hooks/useDispatchers';
import DriverIcon from "../../assets/icons/ButtonIcons/driver-icon.svg";
import LoaderComponent from '../../components/LoaderComponent';

const FormSelectDispatcher = ({ handleNext }) => {
	const [selectedDispatcher, setSelectedDispatcher] = useState(null);
	const dispatchers = useDispatchers()

	const handleSelectDispatcher = (dispatcher) => {
		setSelectedDispatcher(dispatcher);
	};

	if (!dispatchers) return <div className='loader-page-spinner'><LoaderComponent /></div>

	return (
		<div>
			<h1 className="form-title">Выберите диспетчера</h1>
			<ul className="form-list-card">
				<li
					onClick={() => handleSelectDispatcher({ id: null, name: "Без ФИО" })}
					className={`hover-form ${selectedDispatcher && selectedDispatcher.id === null ? 'selected' : ''}`}
				>
					<div className="form-list-card-container">
						<div className="form-img-icon">
							<img src={DriverIcon} alt="Driver" />
						</div>
						<div className="form-list-card-info-container">
							<h2 className="driver-name-null">Без ФИО</h2>
						</div>
					</div>
				</li>
				{dispatchers.map((dispatcher) => (
					<li
						key={dispatcher.personId}
						onClick={() => handleSelectDispatcher(dispatcher)}
						className={`hover-form ${selectedDispatcher?.personId === dispatcher.personId ? 'selected' : ''}`}
					>
						<div className="form-list-card-container">
							<div className="form-img-icon">
								<img src={DriverIcon} alt="Driver" />
							</div>
							<div className="form-list-card-info-container">
								<h2 className="driver-name">{dispatcher.person.firstName + " " + dispatcher.person.lastName}</h2>
								<p>
									<span>Телефон:</span> {dispatcher.notificationPhone || "Без номера телефона"}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="footer-single-btn-container">
				<button
					className='footer-single-btn'
					onClick={() => handleNext([{ dispatcherData: selectedDispatcher.id ? selectedDispatcher : null }])}
					disabled={!selectedDispatcher}
				>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectDispatcher