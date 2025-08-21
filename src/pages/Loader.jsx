import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './styles/Loader.css';
import LoaderLogo from "../assets/icons/LoaderLogo.svg";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoaderComponent from '../components/LoaderComponent';
import { API, setAccessToken } from '../requestAPI';
import config from "../config/env.js"


const Loader = () => {
  const navigate = useNavigate();

  console.log(window.location.search)

  let access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      navigate("/main");
      return; // Выходим из useEffect
    }
  }, [access_token, navigate]);

  const { data, isError, isPending, isFetched } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        await new Promise(res => setTimeout(res, 3000))

        const urlParams = new URLSearchParams(window.location.search);
        const refreshToken = urlParams.get("refreshToken");
        const token = urlParams.get("token");

        if (!token) {
          let response = (await API.post(`${config.AuthApiUri}api/v1/Authorization/Refresh`, {
            "refreshToken": refreshToken
          })).data
          console.log(response)
          setAccessToken(response);
        }
        else setAccessToken({ token: token, refreshToken: refreshToken })

        navigate("/main")
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    refetchInterval: false,
    enabled: !access_token,
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