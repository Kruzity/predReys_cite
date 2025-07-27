import React, { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PlusIcon from '../../assets/icons/ButtonIcons/action-icon-stroke.svg';
import './AddDriverModal.css';
import { API } from '../../requestAPI';
import { useSuggestPerson } from '../../hooks/useSuggestPerson';
import { DateTime } from 'luxon';
import { formatDate } from '../../utils';

const usersMock = [
  { fullName: 'Иванов Иван Иванович', phone: '+7-921-223-33-44', email: 'ivanov@example.com' },
  { fullName: 'Петров Петр Петрович', phone: '+7-901-222-33-44', email: 'petrov@example.com' },
];

async function getBase64(file) {
  return new Promise((res, rej) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      res(reader.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      rej('Error: ', error);
    };
  })
}

const AddDriverModal = ({ isOpen, onClose, onSubmit, companyId }) => {
  const [step, setStep] = useState(1); // 1 - ВУ, 2 - Пользователь, 3 - СНИЛС, 4 - Паспорт
  const [search, setSearch] = useState('');

  const filteredUsers = useSuggestPerson(search);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserObject, setSelectedUserObject] = useState(null);
  const [addingNewUser, setAddingNewUser] = useState(false);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Мужской');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [licenseIssueDate, setLicenseIssueDate] = useState('');

  const [snilsNumber, setSnilsNumber] = useState('');
  const [snilsPhoto, setSnilsPhoto] = useState(null);

  const [passportNumber, setPassportNumber] = useState('');
  const [passportPhoto, setPassportPhoto] = useState(null);

  const [addDocuments, setAddDocuments] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  //Новое
  const [passportSeries, setPassportSeries] = useState('');
  const [passportIssuedBy, setPassportIssuedBy] = useState('');
  const [passportDivisionCode, setPassportDivisionCode] = useState('');
  const [passportIssueDate, setPassportIssueDate] = useState('');

  // useEffect(() => {
  //   if (selectedUser) {
  //     if (selectedUser.phone) setPhone(selectedUser.phone);
  //     if (selectedUser.email) setEmail(selectedUser.email);
  //   }
  // }, [selectedUser]);

  const handleAddNewUser = async () => {
    try {

      let personRes = await API.post("https://stagensi.predreysdoc.com/api/v1/Persons", {
        UserId: "00000000-0000-0000-0000-000000000000",
        BirthDate: formatDate(birthDate, "yyyy-MM-dd", true),
        CompanyId: companyId,
        DriverLicenseId: null,
        FirstName: firstName,
        Gender: gender === "Мужской" ? 0 : 1,
        InnId: null,
        LastName: lastName,
        MiddleName: middleName,
        PassportId: passportPhoto?.fileRes?.data?.id,
        SnilsId: snilsPhoto?.fileRes?.data?.id,
      })

      console.log("persondes", personRes)

      const fullName = `${personRes.data.lastName} ${personRes.data.firstName} ${personRes.data.middleName}`.trim();
      setSearch(fullName);
      setSelectedUser(personRes.data.id);
      setSelectedUserObject(personRes.data);
      setAddingNewUser(false);
    }
    catch (err) {
      console.log(err)
    }
  };

  const handleSelectUser = async (user) => {
    setSearch(user.value);
    setSelectedUser(user.id)

    let person = (await API.get(`https://stagensi.predreysdoc.com/api/v1/Persons?Id=${user.id}`)).data?.items[0]
    console.log(person)

    if (person) setSelectedUserObject(person);

    setSnilsNumber(person?.snils.value || "")

    if (person?.snils) console.log("СНИЛС ", person?.snils.value)
    else console.log("Нету снилса")

    setPassportNumber(person?.passport.number || "")

    if (person?.passport) console.log("Пасспорт ", person?.passport.number)
    else console.log("Нету паспорта")


    setShowSuggestions(false);
  };

  const resetForm = () => {
    setStep(1);
    setSearch('');
    //setFilteredUsers([]);
    setSelectedUser(null);
    setAddingNewUser(false);
    setLastName('');
    setFirstName('');
    setMiddleName('');
    setBirthDate('');
    setGender('Мужской');
    setPhone('');
    setEmail('');
    setLicenseNumber('');
    setLicenseFront(null);
    setLicenseBack(null);
    setLicenseIssueDate('');
    setSnilsNumber('');
    setSnilsPhoto(null);
    setPassportNumber('');
    setPassportPhoto(null);
    setAddDocuments(false);
    //    
    setPassportSeries('');
    setPassportIssuedBy('');
    setPassportDivisionCode('');
    setPassportIssueDate('');
  };

  const handleFinalSubmit = async () => {
    if (licenseFront && licenseBack) {

      if (licenseFront.fileRes.status !== 201 || licenseBack.fileRes.status !== 201) console.log("error")

      await API.post("https://stagensi.predreysdoc.com/api/v1/ocr", {
        CompanyId: companyId,
        Data: null,
        ScanImages: [
          { Type: 0, Id: licenseFront.fileRes.data.id },
          { Type: 1, Id: licenseBack.fileRes.data.id }
        ]
      })
    }
    else {
      await API.post("https://stagensi.predreysdoc.com/api/v1/Employees", {
        PersonId: selectedUser,
        Position: "Водитель",
        NotificationEmail: email,
        NotificationPhone: phone,
        IsDriver: true,
        CompanyId: companyId
      })

      console.log(selectedUser, phone, email)
    }

    resetForm();
    onClose();
  };

  const handleFileChange = async (e, setFile, docNumber) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      let file_ex = file.name.split(".")[1]
      let base64file = await getBase64(file)
      //console.log(file_ex, base64file)
      let fileResp = await API.post("https://stagensi.predreysdoc.com/api/v1/ScanImages", {
        Base64: base64file,
        CompanyId: companyId,
        Description: null,
        ImageType: file_ex,
        ScanType: docNumber, //Спросить почему 3
        TenantId: null,
      })
      console.log(fileResp)
      setFile({ file: file, fileRes: fileResp });
      setError(null);
    } else {
      setError({
        title: 'Ошибка',
        description: 'Разрешено добавлять только фотографии',
        errorBtnText: 'Продолжить',
      });
    }
  };

  const handleDocsSteps = async (doc, id) => {
    switch (doc) {
      case "snils": {
        if (selectedUserObject.snils) break;
        if (!snilsNumber) break;

        let snilsRes = await API.post("https://stagensi.predreysdoc.com/api/v1/Snilss", {
          PersonId: selectedUser,
          Number: snilsNumber,
          CompanyId: companyId,
          FrontSideScanId: snilsPhoto?.fileRes?.data?.id,
        })

        console.log("snils res", snilsRes)

        let res = await API.patch("https://stagensi.predreysdoc.com/api/v1/Persons", {
          "userId": selectedUserObject.userId,
          "id": selectedUserObject.id,
          "firstName": selectedUserObject.firstName,
          "lastName": selectedUserObject.lastName,
          "middleName": selectedUserObject.middleName,
          "birthDate": selectedUserObject.birthDate,
          "gender": selectedUserObject.gender,
          "snilsId": snilsRes.data.id
        })

        console.log("update person snils", res)

        break;
      }
      case "passport": {
        if (selectedUserObject.passport) break;
        if (!passportNumber) break;

        let passportRes = await API.post("https://stagensi.predreysdoc.com/api/v1/Passports", {
          "TenantId": null,
          "CompanyId": companyId,
          "PersonId": selectedUser,
          "Series": passportSeries,
          "Number": passportNumber,
          "IssuedBy": passportIssuedBy,
          "DepartmentCode": passportDivisionCode,
          "IssuedAt": formatDate(passportIssueDate, "yyyy-MM-dd", true),
          "IssuedAtDt": formatDate(passportIssueDate, "yyyy-MM-dd", false),
          "ScanPagesId": passportPhoto?.fileRes?.data?.id ? [passportPhoto?.fileRes?.data?.id] : []
        })

        console.log("create passport", passportRes);

        let res = await API.patch("https://stagensi.predreysdoc.com/api/v1/Persons", {
          "userId": selectedUserObject.userId,
          "id": selectedUserObject.id,
          "firstName": selectedUserObject.firstName,
          "lastName": selectedUserObject.lastName,
          "middleName": selectedUserObject.middleName,
          "birthDate": selectedUserObject.birthDate,
          "gender": selectedUserObject.gender,
          "passportId": passportRes.data.id
        })

        console.log("update person passport", res);

        await handleFinalSubmit();

        break;
      }
    }

    if (doc !== "passport")
      setStep(id)
  }

  if (!isOpen) return null;

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <h2>Добавить водителя</h2>

        <form onSubmit={(e) => e.preventDefault()} className="add-modal-form">
          {error && <ErrorMessage {...error} onClose={() => setError(null)} />}

          {step === 1 && (
            <>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Номер ВУ</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Введите номер ВУ"
                />
              </div>

              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Дата выдачи ВУ</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="date"
                  value={licenseIssueDate}
                  onChange={(e) => setLicenseIssueDate(e.target.value)}
                />
              </div>

              <h3 className="second-modal-title">Добавить фото ВУ</h3>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  id="license-front"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setLicenseFront, 3)}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => document.getElementById('license-front').click()}
                >
                  {licenseFront ? licenseFront.file.name : 'Лицевая сторона ВУ'}
                </button>

                <input
                  type="file"
                  accept="image/*"
                  id="license-back"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setLicenseBack, 3)}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => document.getElementById('license-back').click()}
                >
                  {licenseBack ? licenseBack.file.name : 'Обратная сторона ВУ'}
                </button>
              </div>

              <div className="add-adress-modal-buttons">
                <button type="button" className="footer-btn-delete" onClick={() => setStep(2)}>
                  Нет ВУ
                </button>
                <button type="button" className="footer-btn-confirm" onClick={handleFinalSubmit}>
                  Отправить
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {!addingNewUser ? (
                <>
                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Пользователь</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      type="text"
                      placeholder="Введите ФИО"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    />
                    <img
                      src={PlusIcon}
                      alt="Добавить"
                      className="add-user-icon-inside"
                      onClick={() => setAddingNewUser(true)}
                    />
                    {showSuggestions && filteredUsers.length > 0 && (
                      <ul className="suggestions-list">
                        {filteredUsers.map((user, index) => (
                          <li key={index} onClick={() => handleSelectUser(user)}>
                            {user.value}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Телефон</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Введите номер телефона"
                    />
                  </div>

                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Email</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите email"
                    />
                  </div>

                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="add-documents"
                      checked={addDocuments}
                      onChange={(e) => setAddDocuments(e.target.checked)}
                      className='checkbox-date'
                    />
                    <label htmlFor="add-documents" className='checkbox-date-text'>Добавить документы</label>
                  </div>

                  <div className="add-adress-modal-buttons">
                    <button type="button" className="footer-btn-delete" onClick={handleFinalSubmit}>
                      Отмена
                    </button>
                    <button
                      type="button"
                      className="footer-btn-confirm"
                      onClick={() => {
                        if (addDocuments) {
                          setStep(3);
                        } else {
                          handleFinalSubmit();
                        }
                      }}
                      disabled={!search.trim() || !phone || !email}
                    >
                      Продолжить
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Фамилия</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Введите фамилию"
                    />
                  </div>

                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Имя</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Введите имя"
                    />
                  </div>

                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Отчество</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      placeholder="Введите отчество"
                    />
                  </div>

                  <div className="input-wrapper">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Дата рождения</span>
                    </label>
                    <input
                      className="form-delivery-input-field"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>

                  <div className="input-wrapper-gender">
                    <label className='delivery-form-label'>
                      <span className="delivery-span-text">Пол</span>
                    </label>
                    <select
                      className="form-delivery-input-field"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option>Мужской</option>
                      <option>Женский</option>
                      <option>Ламинат</option>
                    </select>
                  </div>

                  <div className="add-adress-modal-buttons">
                    <button type="button" className="footer-btn-delete" onClick={() => setAddingNewUser(false)}>
                      Назад
                    </button>
                    <button type="button" className="footer-btn-confirm" onClick={handleAddNewUser}>
                      Добавить
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Номер СНИЛС</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  value={snilsNumber}
                  onChange={(e) => setSnilsNumber(e.target.value)}
                  placeholder="Введите номер СНИЛС"
                />
              </div>

              <h3 className="second-modal-title">Добавить фото СНИЛС</h3>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  id="snils-photo"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setSnilsPhoto, 4)}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => document.getElementById('snils-photo').click()}
                >
                  {snilsPhoto ? snilsPhoto.file.name : 'Фото СНИЛС'}
                </button>
              </div>

              <div className="add-adress-modal-buttons">
                <button type="button" className="footer-btn-confirm" onClick={() => handleDocsSteps("snils", 4)}>
                  Далее
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Серия</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="text"
                  value={passportSeries}
                  onChange={(e) => setPassportSeries(e.target.value)}
                  placeholder="Введите серию паспорта"
                />
              </div>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Номер</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Введите номер паспорта"
                />
              </div>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Кем выдан</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="text"
                  value={passportIssuedBy}
                  onChange={(e) => setPassportIssuedBy(e.target.value)}
                  placeholder="Кем выдан"
                />
              </div>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Код подразделения</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="text"
                  value={passportDivisionCode}
                  onChange={(e) => setPassportDivisionCode(e.target.value)}
                  placeholder="Код подразделения"
                />
              </div>
              <div className="input-wrapper">
                <label className='delivery-form-label'>
                  <span className="delivery-span-text">Дата выдачи</span>
                </label>
                <input
                  className="form-delivery-input-field"
                  type="date"
                  value={passportIssueDate}
                  onChange={(e) => setPassportIssueDate(e.target.value)}
                />
              </div>

              <h3 className="second-modal-title">Добавить фото паспорта</h3>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  id="passport-photo"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setPassportPhoto, 2)}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => document.getElementById('passport-photo').click()}
                >
                  {passportPhoto ? passportPhoto.file.name : 'Фото паспорта'}
                </button>
              </div>
              <div className="add-adress-modal-buttons">
                <button className="footer-btn-delete" onClick={handleFinalSubmit}>
                  Пропустить
                </button>
                <button
                  className="footer-btn-confirm"
                  onClick={() => handleDocsSteps("passport", 0)}
                  disabled={!passportNumber && !passportPhoto}
                >
                  Отправить
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal;
