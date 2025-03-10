import React, { useState } from 'react'
import '../../pages/styles/RequestForm.css'
import DatePicker from 'react-datepicker';

const FormSelectSchedule = ({ handleNext }) => {
  const [period, setPeriod] = useState({ startDate: new Date(), endDate: null });
  const [singleSheet, setSingleSheet] = useState(false);

  const handlePeriodChange = (field, date) => {
    console.log(`Изменение ${field}:`, date);
    setPeriod({ ...period, [field]: date });
  };

  const handleCheckboxChange = () => {
    setSingleSheet(!singleSheet);
  };

  const generateDates = () => {
    if (singleSheet || !period.startDate || !period.endDate) {
      return [{ startDate: period.startDate?.toLocaleDateString("ru-RU"), endDate: period.endDate?.toLocaleDateString("ru-RU"), amountPL: 1, oneWayBill: true }];
    }

    let dates = [];
    let currentDate = new Date(new Date(period.startDate).toLocaleDateString());
    console.log(period.startDate, period.endDate)
    while (currentDate <= period.endDate) {
      dates.push({ date: currentDate.toLocaleDateString("ru-RU") });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dates)
    return [{ startDate: dates[0], endDate: dates[dates.length - 1], amountPL: dates.length, oneWayBill: false }];
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      className="date-picker-input"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
    />
  ));

  return (
    <div className="period-picker-container">
      <h1 className="date-title">Выберите даты</h1>
      <div className="form-content-wrapper-date">
        <div className="date-picker-group">
          <div className="date-picker-wrapper">
            <label className="date-picker-label">
              <span className="date-picker-span-text">Начало периода</span>
            </label>
            <DatePicker
              selected={period.startDate || null}
              onChange={(date) => handlePeriodChange("startDate", date)}
              customInput={<CustomInput />}
              selectsStart
              startDate={period.startDate}
              endDate={period.endDate}
              dateFormat="dd/MM/yyyy"
              locale="ru"
              highlightDates={period.startDate ? [period.startDate] : []}
            />
          </div>
          <div className="date-picker-wrapper">
            <label className="date-picker-label">
              <span className="date-picker-span-text">Окончание периода</span>
            </label>
            <DatePicker
              className='datepicker-z-index'
              selected={period.endDate || null}
              onChange={(date) => handlePeriodChange("endDate", date)}
              customInput={<CustomInput />}
              selectsEnd
              minDate={period.startDate || new Date(0)}
              dateFormat="dd/MM/yyyy"
              locale="ru"
              highlightDates={period.endDate ? [period.endDate] : []}
            />
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={singleSheet}
              onChange={handleCheckboxChange}
              className='checkbox-date'
            />
            <span className='checkbox-date-text'>Один путевой лист на выбранные даты</span>
          </div>
        </div>
      </div>
      <div className="footer-single-btn-container">
        <button
          className="footer-single-btn"
          onClick={() => {
            handleNext(generateDates())
            console.log("Данные перед вызовом handleNext:", generateDates());
          }}
          disabled={!period.startDate || !period.endDate}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default FormSelectSchedule;