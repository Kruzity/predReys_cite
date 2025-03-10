import React, { useState } from 'react';

const FormSelectTime = ({ handleNext }) => {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const preventScroll = (event) => {
    event.preventDefault();
  };

  const preventTouchScroll = (event) => {
    event.preventDefault();
  };

  const handleFocus = () => {
    document.body.style.overflow = "hidden";
    window.addEventListener("touchmove", preventTouchScroll, { passive: false });
  };

  const handleBlur = () => {
    document.body.style.overflow = "";
    window.removeEventListener("touchmove", preventTouchScroll);
  };

  const handleTimeChange = (field, part, value) => {
    const [hour, minute] = (field === "startTime" ? startTime : endTime).split(":");
    const clampedValue = Math.max(0, Math.min(part === "hour" ? 23 : 59, parseInt(value || "0", 10)));
    const paddedValue = clampedValue.toString().padStart(2, "0");
    const newTime = part === "hour" ? `${paddedValue}:${minute}` : `${hour}:${paddedValue}`;
    
    field === "startTime" ? setStartTime(newTime) : setEndTime(newTime);
  };

  const handleTimeKeyDown = (event) => {
    if (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h1 className="form-title">Выберите время выезда на линию</h1>
      <div className="time-input-container">
        {["startTime", "endTime"].map((field, index) => (
          <label key={field} className="time-label">
            <span className='time-label-text'>{index === 0 ? "С" : "До"}</span>
            <div className="time-input-wrapper">
              {["hour", "minute"].map((part) => (
                <React.Fragment key={part}>
                  <input
                    type="number"
                    className="time-input-section"
                    value={(field === "startTime" ? startTime : endTime).split(":")[part === "hour" ? 0 : 1]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => handleTimeChange(field, part, e.target.value)}
                    onKeyDown={handleTimeKeyDown}
                    onWheel={preventScroll}
                    inputMode="numeric"
                    step="1"
                    min={part === "hour" ? "0" : "0"}
                    max={part === "hour" ? "23" : "59"}
                  />
                  {part === "hour" && <span className="time-separator">:</span>}
                </React.Fragment>
              ))}
            </div>
          </label>
        ))}
      </div>
      <div className="footer-btn-section-container">
        <button className="footer-form-skip-btn" onClick={() => handleNext([{ startTime: null }, { endTime: null }])}>Пропустить</button>
        <button
          className="footer-form-next-btn"
          onClick={() => handleNext([{ startTime: startTime }, { endTime: endTime }])}
          disabled={!startTime && !endTime}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default FormSelectTime;
