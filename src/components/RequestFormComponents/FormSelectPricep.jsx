import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import { useCars } from '../../hooks/useCars';

const FormSelectPricep = ({ handleNext }) => {
	const [selectedTrailers, setSelectedTrailers] = useState([]);
	const vehicles = useCars()

	const handleSelectTrailer = (trailer) => {
		setSelectedTrailers((prev) =>
			prev.includes(trailer)
				? prev.filter((t) => t !== trailer)
				: prev.length < 4
					? [...prev, trailer]
					: prev
		);
	};

	return (
		<div className='form-trailer-container'>
			<div className="form-title-container">
				<h1 className="form-title-h1">Выберите прицеп</h1>
				<p className="form-title-description">
					Вы можете выбрать от одного до четырёх прицепов в одной заявке
				</p>
			</div>

			<ul className="form-list-card">
				{vehicles
					.filter((vehicle) => vehicle.trailer) // Фильтруем только те, у которых есть прицеп
					.map((vehicle) => (
						<li
							key={vehicle.trailer.id}
							onClick={() => handleSelectTrailer(vehicle.trailer)}
							className={`hover-form ${selectedTrailers.includes(vehicle.trailer) ? 'selected' : ''
								}`}
						>
							<div className="form-list-card-container">
								<div className="form-img-icon">
									<img src={TruckIcon} alt="" />
								</div>
								<div className="form-list-card-info-container">
									<h2 className="form-list-card-title">
										{vehicle.trailer.brand} {vehicle.trailer.model}
									</h2>
									<p>
										<span>Гос. номер:</span> {vehicle.trailer.licensePlate}
									</p>
									<p>
										<span>Собственник:</span> {vehicle.owner}
									</p>
								</div>
							</div>
						</li>
					))}
			</ul>
			<div className="footer-btn-section-container">
				<button className="footer-form-skip-btn" onClick={handleNext}>
					Пропустить
				</button>
				<button
					className="footer-form-next-btn"
					onClick={handleNext}>
					Далее
				</button>
			</div>
		</div>
	);
}

export default FormSelectPricep