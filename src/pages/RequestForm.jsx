import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TruckIcon from "../assets/icons/ButtonIcons/list-icon-truck.svg";
import IconBack from "../assets/icons/ButtonIcons/action-icon-back.svg";
import IconMenu from "../assets/icons/ButtonIcons/action-icon-menu.svg";
import DriverIcon from "../assets/icons/ButtonIcons/driver-icon.svg";
import PinnedIcon from "../assets/icons/ButtonIcons/line-rounded-pin.svg";
import PlusIcon from "../assets/icons/ButtonIcons/action-icon-stroke.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/RequestForm.css';
import ru from "date-fns/locale/ru";
import DeleteMessage from "../components/DeleteMessage/DeleteMessage";
import FormSelectCar from '../components/RequestFormComponents/FormSelectCar';
import FormSelectPricep from '../components/RequestFormComponents/FormSelectPricep';
import FormSelectDriver from '../components/RequestFormComponents/FormSelectDriver';
import FormSelectMessageType from '../components/RequestFormComponents/FormSelectMessageType';
import FormSelectWayBillForm from '../components/RequestFormComponents/FormSelectWayBillForm';
import FormSelectTransType from '../components/RequestFormComponents/FormSelectTransType';
import FormSelectAddress from '../components/RequestFormComponents/FormSelectAddress';
import FormSelectSchedule from '../components/RequestFormComponents/FormSelectSchedule';
import FormSelectTime from '../components/RequestFormComponents/FormSelectTime';
import FormDetails from '../components/RequestFormComponents/FormDetails';
import FormSummary from '../components/RequestFormComponents/FormSummary';
import FormSelectMedic from '../components/RequestFormComponents/FormSelectMedic';
import FormSelectDispatcher from '../components/RequestFormComponents/FormSelectDispatcher';
import FormSelectTechnician from '../components/RequestFormComponents/FormSelectTechnician';
import FormOwnerPlatform from '../components/RequestFormComponents/FormOwnerPlatform';



//Добавил для календарика, перевод дней и сортировка дней недели начиная с понедельника
registerLocale("ru", ru);

const exampleOfPOSTRequestWayBills = {
    CompanyId: "c524d74b-04bb-4484-9351-7d7b5606e436",
    EndDate: "2025-02-21T23:00:00+00:00",
    EndDateDt: "2025-02-22T00:00:00+01:00",
    OneWayBill: false,
    PostalAddress: "141004 г. Мытищи, ул. Силикатная, д. 19 ",
    Recipient: "ыцвуапыцк ыуваыва ываыва",
    RecipientContactPhone: "+7 (861) 90-12-34",
    RecipientId: "7408fa5e-f01c-408c-889e-4bc54616da61",
    StartDate: "2025-02-07T23:00:00+00:00",
    StartDateDt: "2025-02-08T00:00:00+01:00",
    TenantId: "02fd1afa-d3aa-4b19-bd04-d7a06a4dc1e8",
    TransportationTypes: ["Пригородное", "Городское", "Междугородное"],
    TypesOfTransportService: ["Коммерческие перевозки", "Перевозки для собственных нужд", "Передвижение и работа специальных ТС"],
    UtcOffset: "01:00:00",
    WayBillContent: {
        CompanyContent: "ООО «ГК МФМК»  125476  г. Москва ул. Василия  Петушкова дом  3 этаж/помещ. 3/1, ком.3/6 ОГРН 1117746288604 Тел: +79161922201",
        CustomerAddress: "141004 г. Мытищи, ул. Силикатная, д. 19 ",
        CustomerId: "c524d74b-04bb-4484-9351-7d7b5606e436",
        CustomerName: "ООО «ГК МФМК» ",
        DispatcherId: null,
        DispatcherNameContent: null,
        DriverId: "f7a5aa76-7fc0-4a15-84df-bbe428ea83c5",
        DriverLicenseCategoriesContent: "М1",
        DriverLicenseIssuedAtContent: " 21.01.2025",
        DriverLicenseNumberContent: "234234 234234",
        DriverNameContent: "Пушкин Александр Сергеевич",
        DriverSnilsContent: "23ц423245",
        FuelGrade: null,
        Id: "00000000-0000-0000-0000-000000000000",
        MedicalId: null,
        MedicalNameContent: null,
        OwnerPlatformCompanyId: "0dc8ade8-67d0-4e27-a112-d1507ccb7e6a",
        OwnerPlatformContent: "ООО ПредРейс Москва Лицензия № ЛО-77-01-020516 от  05 октября 2024 г.",
        PostRaceTechnician: false,
        PostRaceTechnicianId: null,
        PostRaceTechnicianNameContent: null,
        RegistrationNumberContent: "О322ТУ790",
        TechInspectionCompanyContent: null,
        TechnicianId: null,
        TechnicianNameContent: null,
        VehicleContent: "Грузовой рефрижератор КАМАЗ БЕЗ МОДЕЛИ",
        VehicleContractContent: null,
        VehicleId: "009737d6-7a75-4c71-9317-9db912b61301"
    },
    WayBillFormType: 2,
}

const RequestForm = () => {
    //let wayBillsArray = []

    const location = useLocation();
    const navigate = useNavigate();
    const organization = location.state?.organization || {};

    const [showPreview, setShowPreview] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const totalSteps = 13;

    const [formData, setFormData] = useState({
        ownerData: null,
        companyData: organization,
        endDate: null,
        startDate: null,
        oneWayBill: false,
        recipientData: null,
        transportationTypes: [],
        typesOfTransportService: [],
        vehicleData: null,
        driverData: null,
        medicData: null,
        dispatcherData: null,
        technicianData: null,
        wayBillFormType: null,
        customerAddress: "",
    })
    useEffect(() => {
        console.log("formData изменился:", formData);
    }, [formData]);

    const handleNext = (data, deleteOrder) => {
        if (deleteOrder) {
            let wba = JSON.parse(localStorage.getItem("wayBills"));
            if (wba && wba?.length) {
                resetForm();
                setCurrentStep(totalSteps);
            }
            else {
                resetForm();
                setCurrentStep(0);
            }
            setShowPreview(false)
            return;
        }

        if (showPreview) {
            //wayBillsArray.push(formData);
            let wba = JSON.parse(localStorage.getItem("wayBills"));
            localStorage.setItem("wayBills", JSON.stringify(wba?.length ? [...wba, formData] : [formData]))

            setShowPreview(false)
            setCurrentStep(totalSteps);
            return;
        }

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
        else if (currentStep === totalSteps - 1) {
            setShowPreview(true);
        }


        if (data && data?.length) {
            let newFormData = {
                ...formData,
            }
            data.map(obj => Object.keys(obj).map(k => newFormData[k] = obj[k]))
            //console.log(newFormData)
            setFormData(newFormData)
        }

        console.log(formData)
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
        else if(currentStep === 0) navigate(-1)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const resetForm = () => {
        setFormData({
            ownerData: null,
            companyData: organization,
            endDate: null,
            startDate: null,
            startTime: null,
            endTime: null,
            oneWayBill: false,
            transportationTypes: [],
            typesOfTransportService: [],
            vehicleData: null,
            driverData: null,
            medicData: null,
            dispatcherData: null,
            technicianData: null,
            wayBillFormType: null,
            customerAddress: "",
        });
    };

    const handleCreateNewWayBill = () => {
        resetForm();
        setCurrentStep(0);
    }

    const submitForm = (e) => {
        e.preventDefault();

        let wayBillsArray = JSON.parse(localStorage.getItem("wayBills"));

        navigate(`/organization/${organization.id}/deliveries`, {
            state: {
                wayBills: wayBillsArray
            }
        })
    }

    const steps = [
        () => (<div>
            <FormOwnerPlatform handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectCar handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectPricep handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectDriver handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectMedic handleNext={handleNext} driver={formData.driverData} companyId={formData.companyData.companyId} />
        </div>),

        () => (<div>
            <FormSelectDispatcher handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectTechnician handleNext={handleNext} car={formData.vehicleData} companyId={formData.companyData.companyId} />
        </div>),

        () => (<div>
            <FormSelectWayBillForm handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectMessageType handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectTransType handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectAddress companyId={organization.company.id} handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectSchedule handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSelectTime handleNext={handleNext} />
        </div>),

        () => (<div>
            <FormSummary handleCreateNewRequest={handleCreateNewWayBill} totalTripSheets={1} submitForm={submitForm} />
        </div>)
    ]

    return (
        <div className="request-form">
            <div className='header-navigate-container'>
                <button className='header-btn-back' onClick={handleBack}>
                    <img src={IconBack} alt="Back" />
                </button>
                <button className='header-btn-menu' onClick={() => navigate('/main')}>
                    <img src={IconMenu} alt="Menu" />
                </button>
            </div>
            <form className='waybills' onSubmit={handleSubmit}>
                {currentStep !== totalSteps &&
                    <div>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="page-number">
                            {currentStep} - <span className="total-page-number">{totalSteps - 1}</span>
                        </div>
                    </div>
                }
                <div className="form-content">{steps[currentStep]()}</div>
                {showPreview && <FormDetails setShowPreview={setShowPreview} handleNext={handleNext} formData={formData} />}
            </form>
        </div>
    );
};

export default RequestForm;