import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigateHeader from '../../components/NavigateHeader/NavigateHeader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoaderComponent from '../../components/LoaderComponent';
import CopyIcon from "../../assets/icons/ButtonIcons/icon-copy.svg";
import '../styles/AccountReplenishment.css';

const AccountReplenishment = () => {
    const [amount, setAmount] = useState('');
    const [showPaymentLink, setShowPaymentLink] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const paymentLink = 'https://google.com';

    const handleTopUp = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
        setError({
        title: 'Некорректная сумма',
        description: 'Введите сумму больше 0 для пополнения баланса.',
        errorBtnText: 'Понятно',
        });
        return;
    }

    setShowPaymentLink(true);
    };

    const handleRedirect = () => {
        window.open(paymentLink, '_blank', 'noopener,noreferrer');
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(paymentLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
    });
    };

    return (
        <>
            <NavigateHeader />
            <div className="org-details-title">
            <h1>Пополнение баланса</h1>
            </div>
            {error && (
            <ErrorMessage
                title={error.title}
                description={error.description}
                errorBtnText={error.errorBtnText}
                onClose={() => setError(null)}
            />
            )}
            <div className="top-up-form">
                <div className="input-wrapper">
                    <label className="delivery-form-label">
                        <span className="delivery-span-text">Сумма пополнения (₽)</span>
                    </label>
                    <input
                        type="number"
                        className="form-delivery-input-field"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Введите сумму"
                    />
                </div>

                {showPaymentLink && (
                    <div className="tracking-section-flex-container">
                        <div className="tracking-number-box-container">
                            <div className="tracking-number-box" onClick={handleRedirect}>
                            <span className="payment-link-text">{paymentLink}</span>
                            <img
                                src={CopyIcon}
                                alt="copy"
                                onClick={handleCopy}
                                className="copy-icon"
                            />
                            </div>
                            {copied && <p className="copy-notification">Скопировано!</p>}
                        </div>
                    </div>
                )}
                <div className="footer-single-btn-container">
                    <button className="footer-single-btn" onClick={handleTopUp}>
                        Пополнить
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountReplenishment;
