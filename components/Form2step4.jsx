'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgressSidebar from './FormProgressSidebar';
import CountrySelect from '@/components/CountrySelect';

const Form2step4 = () => {
  const router = useRouter();
  const t = useTranslations();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    province: '',
    zipCode: '',
    address: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Add validation here
    router.push('/form2-page5');
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="flex-grow-1" style={{ marginRight: '320px' }}>
        <div className="mt-4 ml-4">
          <Link legacyBehavior href="/">
            <a>
              <img
                src="/assets/images/logos/logo.png"
                alt="Logo"
                title="Logo"
                style={{ height: '70px' }}
              />
            </a>
          </Link>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="form-card bg-white p-4 rounded-3">
                {/* Page Title */}
                <div className="text-center mb-5">
                  <h2 style={{ color: '#2D3748', fontSize: '28px', fontWeight: '600' }}>{t('Payment Details')}</h2>
                  <p style={{ color: '#718096', fontSize: '16px', marginTop: '8px' }}>{t('Please Select Your preferred form of Payment')}</p>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div 
                        className={`p-3 rounded cursor-pointer`}
                        onClick={() => setPaymentMethod('credit-card')}
                        style={{ 
                          cursor: 'pointer',
                          border: paymentMethod === 'credit-card' ? '2px solid #274171' : '1px solid #E2E8F0',
                          backgroundColor: paymentMethod === 'credit-card' ? '#F7FAFC' : '#FFFFFF',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img src="/assets/v3/img/creditCard.png" alt="Credit Card" style={{ width: '24px', marginRight: '12px' }} />
                          <span style={{ color: '#2D3748', fontWeight: '500' }}>Credit Card</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div 
                        className={`p-3 rounded`}
                        onClick={() => setPaymentMethod('paypal')}
                        style={{ 
                          cursor: 'pointer',
                          border: paymentMethod === 'paypal' ? '2px solid #274171' : '1px solid #E2E8F0',
                          backgroundColor: paymentMethod === 'paypal' ? '#F7FAFC' : '#FFFFFF',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img src="/assets/v3/img/payPal.png" alt="PayPal" style={{ width: '24px', marginRight: '12px' }} />
                          <span style={{ color: '#2D3748', fontWeight: '500' }}>PayPal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Details */}
                {paymentMethod === 'credit-card' && (
                  <div className="card" style={{ 
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }}>
                    <div className="card-body p-4">
                      <h5 style={{ color: '#2D3748', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                        {t('Enter your Credit Card Details')}
                      </h5>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cardNumber"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              padding: '10px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Cardholder Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cardholderName"
                            placeholder="John Doe"
                            value={formData.cardholderName}
                            onChange={handleInputChange}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              padding: '10px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Expiry Month</label>
                          <input
                            type="text"
                            className="form-control"
                            name="expiryMonth"
                            placeholder="MM"
                            value={formData.expiryMonth}
                            onChange={handleInputChange}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              padding: '10px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Expiry Year</label>
                          <input
                            type="text"
                            className="form-control"
                            name="expiryYear"
                            placeholder="YYYY"
                            value={formData.expiryYear}
                            onChange={handleInputChange}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              padding: '10px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              padding: '10px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div className="card mt-4" style={{ 
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: '8px'
                }}>
                  <div className="card-body p-4">
                    <h5 style={{ color: '#2D3748', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                      {t('Enter your Billing Address')}
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Country</label>
                        <CountrySelect
                          value={formData.country}
                          onChange={(value) => handleInputChange({ target: { name: 'country', value }})}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Province/State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500' }}>ZIP Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="actions">
                  <div className="d-flex justify-content-between align-items-center mt-5" style={{ paddingBottom: '5px' }}>
                    <Link href="/form2-page3" className="text-decoration-none">
                      <span
                        className="btn"
                        style={{ 
                          backgroundColor: "#274171",
                          color: 'white',
                          padding: '10px 30px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginRight: '465px',
                          marginBottom: '-170px',
                          position: 'relative',
                          left: '20px'
                        }}
                      >
                        <i className="fa fa-arrow-left"></i> Back
                      </span>
                    </Link>
                    <button
                      onClick={handleNext}
                      className="btn"
                      style={{
                        backgroundColor: '#274171',
                        color: 'white',
                        padding: '10px 30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '-170px',
                        position: 'relative',
                        right: '20px'
                      }}
                    >
                      Next <i className="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ 
        width: '300px', 
        position: 'fixed', 
        right: 0, 
        top: 0, 
        height: '100vh',
        borderLeft: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#091534'
      }}>
        <FormProgressSidebar currentStep={4} />
      </div>
    </div>
  );
};

export default Form2step4;
