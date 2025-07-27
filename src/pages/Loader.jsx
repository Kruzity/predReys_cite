import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './styles/Loader.css';
import LoaderLogo from "../assets/icons/LoaderLogo.svg";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoaderComponent from '../components/LoaderComponent';
import { API, setAccessToken } from '../requestAPI';


function requestToServer() {
  return { email: "info@feniks.ru", password: "12345678" }
} 

const Loader = () => {
  const navigate = useNavigate()

  const { data, isError, isPending, isFetched } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        await new Promise(res => setTimeout(res, 3000))
        let auth_data = requestToServer()
        const response = (await API.post('https://stageauth.predreysdoc.com/api/v1/Authorization/Signin', { userId: auth_data.email, password: auth_data.password })).data;
        console.log(response)
        setAccessToken(response); 
        navigate("/main")
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    refetchInterval: false
  })

  return (
    <div className="loader-container">
      <div className="loader-logo">
        <img src={LoaderLogo} alt="Logo" />
      </div>
      <div className="loader-circle">
      <LoaderComponent />
      </div>
      {isError && (
        <ErrorMessage
          onClose={() => setShowError(false)}
          title="Ошибка доступа"
          description="Вы не обладаете правами для использования бота"
          errorBtnText="Поддержка"
          />
      )}
    </div>
  );
};

export default Loader;