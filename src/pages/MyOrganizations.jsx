import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigateHeader from '../components/NavigateHeader/NavigateHeader';
import './styles/MyOrganizations.css'
import ListIcon from "../assets/icons/ButtonIcons/list-icon-arrow.svg"
import { useQuery } from '@tanstack/react-query';
import { API } from '../requestAPI';
//import "../Data/organizations"
import LoaderComponent from '../components/LoaderComponent';

const MyOrganizations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isError, isPending } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      let response = (await API.get("https://stagensi.predreysdoc.com/api/v1/CompanyContacts")).data.items
      console.log(response)
      return response;
    }
  })

  const redirectToForm = location.state?.redirectToForm;
  const formData = location.state?.formData || {};

  const handleSelectOrganization = (organization) => {
    if (redirectToForm) {
      navigate(`/organization/${organization.company.id}/request-form`, {
        state: { organization },
      });
    } else {
      navigate(`/organization/${organization.company.id}`, {
        state: { organization },
      });
    }
  };

  if (isPending) return <div className='loader-page-spinner'><LoaderComponent /></div>

  return (
    <div className="organizations-container">
      <NavigateHeader />
      <div className="org-title-section">
        <h1 className='org-title'>Мои организации</h1>
        <p className='org-title-description'>Выберите организацию, чтобы начать работу</p>
      </div>

      <ul className='org-list-card'>
        {data.map((org) => (
          <li key={org.company.id} onClick={() => handleSelectOrganization(org)}>
            <div>
              <h2>{org.company.name}</h2>
              <div className="org-info-container">
                <p><span>ИНН:</span>{org.company.inn}</p>
                <p><span>ОГРН:</span>{org.company.ogrn}</p>
                <p><span>Телефон:</span>{org.phone}</p>
              </div>
            </div>
            <img className="org-action-icon" src={ListIcon} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrganizations;
