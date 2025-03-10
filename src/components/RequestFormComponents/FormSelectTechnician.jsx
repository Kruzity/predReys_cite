import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useTechnicians } from '../../hooks/useTechnicians';
import DriverIcon from "../../assets/icons/ButtonIcons/driver-icon.svg";
import LoaderComponent from '../../components/LoaderComponent';
import { useGetQuery } from '../../hooks/requestHook';

const FormSelectTechnician = ({ handleNext, car, companyId }) => {
	const [selectedTechnician, setSelectedTechnician] = useState(null);

	const handleSelectTechnician = (technician) => {
		setSelectedTechnician(technician);
	};

	const paper = useGetQuery("https://stagedocuments.predreysdoc.com/api/v1/PaperWaybillsContractRequests", ["paper", car.id, companyId], { params: { CompanyId: companyId, VehicleId: car.id, TechStatus: "Accepted" } })


	const technicians = useTechnicians(car.moderatedAt === null ? (
		{}
	) : (
		paper?.data?.length ? { PlatformOwnerCompanyId: paper.data[0].supplierCompanyId } : {}
	), paper?.data?.length ? paper.data[0].supplierCompanyId : null)

	if (!technicians || paper.isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

	return (
		<div>
			<h1 className="form-title">Выберите Контролера ТС - Механик по выпуску</h1>
			<ul className="form-list-card">
				<li
					onClick={() => handleSelectTechnician({ id: null, name: "Без ФИО" })}
					className={`hover-form ${selectedTechnician && selectedTechnician.id === null ? 'selected' : ''}`}
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
				{technicians.map((technician) => (
					<li
						key={technician.personId}
						onClick={() => handleSelectTechnician(technician)}
						className={`hover-form ${selectedTechnician?.personId === technician.personId ? 'selected' : ''}`}
					>
						<div className="form-list-card-container">
							<div className="form-img-icon">
								<img src={DriverIcon} alt="Driver" />
							</div>
							<div className="form-list-card-info-container">
								<h2 className="driver-name">{technician.person.firstName + " " + technician.person.lastName}</h2>
								<p>
									<span>Телефон:</span> {technician.notificationPhone || "Без номера телефона"}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="footer-single-btn-container">
				<button
					className='footer-single-btn'
					onClick={() => handleNext([{ technicianData: selectedTechnician.id ? selectedTechnician : null }])}
					disabled={!selectedTechnician}
				>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectTechnician