import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useGetQuery } from '../../hooks/requestHook';
import { useCars } from '../../hooks/useCars';
import LoaderComponent from '../../components/LoaderComponent';
import TruckIcon from "../../assets/icons/ButtonIcons/list-icon-truck.svg";

const FormSelectCar = ({ handleNext }) => {
	const [selectedVehicle, setSelectedVehicle] = useState(null);

	const vehicles = useCars()

	const handleSelectVehicle = (vehicle) => {
		setSelectedVehicle(vehicle)
	};

	if (!vehicles) return <div className='loader-page-spinner'><LoaderComponent /></div>

	return (
		<div className='request-car-page'>
			<h1 className="form-title">Выберите ТС</h1>
			<ul className="form-list-card">
				{vehicles.map((vehicle) => (
					<li
						key={vehicle.sts.car.id}
						onClick={() => handleSelectVehicle(vehicle)}
						className={`hover-form ${selectedVehicle?.sts?.car?.id === vehicle.sts.car.id ? 'selected' : ''}`}
					>
						<div className="form-list-card-container">
							<div className="form-img-icon">
								<img src={TruckIcon} alt="" />
							</div>
							<div className="form-list-card-info-container">
								<h2 className="form-list-card-title">
									{vehicle.sts.car.value}
								</h2>
								<p>
									<span>Гос. номер:</span> {vehicle.sts.registrationNumber}
								</p>
								<p>
									<span>Собственник:</span> {vehicle.sts.company.name}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="footer-single-btn-container">
				<button
					className='footer-single-btn'
					onClick={() => handleNext([{ vehicleData: selectedVehicle }])}
					disabled={!selectedVehicle}
				>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectCar