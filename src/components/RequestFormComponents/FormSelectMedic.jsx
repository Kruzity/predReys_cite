import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useMedics } from '../../hooks/useMedics';
import DriverIcon from "../../assets/icons/ButtonIcons/driver-icon.svg";
import LoaderComponent from '../../components/LoaderComponent';
import { useGetQuery } from '../../hooks/requestHook';

const FormSelectMedic = ({ handleNext, driver, companyId }) => {
	const [selectedMedic, setSelectedMedic] = useState(null);

	const handleSelectMedic = (driver) => {
		setSelectedMedic(driver);
	};

	const paper = useGetQuery("https://stagedocuments.predreysdoc.com/api/v1/PaperWaybillsContractRequests", ["paper", driver.id], { params: { CompanyId: companyId, DriverId: driver.id, MedStatus: "Accepted" } })

	//if (paper.isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

	console.log("paper", paper.data)
	console.log("driver", driver.moderatedAt)

	const medics = useMedics(driver.moderatedAt === null ? (
		{}
	) : (
		paper?.data?.length ? { PlatformOwnerCompanyId: paper.data[0].supplierCompanyId } : {}
	), paper?.data?.length ? paper.data[0].supplierCompanyId : null)

	if (!medics || paper.isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

	return (
		<div>
			<h1 className="form-title">Выберите медработника</h1>
			<ul className="form-list-card">
				<li
					onClick={() => handleSelectMedic({ id: null, name: "Без ФИО" })}
					className={`hover-form ${selectedMedic && selectedMedic.id === null ? 'selected' : ''}`}
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
				{medics.map((medic) => (
					<li
						key={medic.personId}
						onClick={() => handleSelectMedic(medic)}
						className={`hover-form ${selectedMedic?.personId === medic.personId ? 'selected' : ''}`}
					>
						<div className="form-list-card-container">
							<div className="form-img-icon">
								<img src={DriverIcon} alt="Driver" />
							</div>
							<div className="form-list-card-info-container">
								<h2 className="driver-name">{medic.person.firstName + " " + medic.person.lastName}</h2>
								<p>
									<span>Телефон:</span> {medic.notificationPhone || "Без номера телефона"}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="footer-single-btn-container">
				<button
					className='footer-single-btn'
					onClick={() => handleNext([{ medicData: selectedMedic.id ? selectedMedic : null }])}
					disabled={!selectedMedic}
				>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectMedic