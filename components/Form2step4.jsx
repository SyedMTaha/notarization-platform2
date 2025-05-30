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
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Logo */}
              <div className="mb-4">
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

              {/* Page Title */}
              <div className="text-center mb-5">
                <h2 style={{ color: '#5756A2', fontSize: '2.5rem', fontWeight: '600' }}>{t('Payment Details')}</h2>
                <p className="mt-2" style={{ fontSize: '1.1rem', color: '#666' }}>{t('Please Select Your preferred form of Payment')}</p>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-4">
                <h5>{t('Please Select your Preferred form of Payment')}</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <div 
                      className={`p-3 border rounded cursor-pointer ${paymentMethod === 'credit-card' ? 'border-primary bg-light' : ''}`}
                      onClick={() => setPaymentMethod('credit-card')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center">
                        <img src="/assets/v3/img/creditCard.png" alt="Credit Card" style={{ width: '24px', marginRight: '12px' }} />
                        <span>Credit Card</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div 
                      className={`p-3 border rounded ${paymentMethod === 'paypal' ? 'border-primary bg-light' : ''}`}
                      onClick={() => setPaymentMethod('paypal')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center">
                        <img src="/assets/v3/img/payPal.png" alt="PayPal" style={{ width: '24px', marginRight: '12px' }} />
                        <span>PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === 'credit-card' && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="mb-4">{t('Enter your Credit Card Details')}</h5>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardNumber"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Cardholder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Expiry Month</label>
                        <input
                          type="text"
                          className="form-control"
                          name="expiryMonth"
                          placeholder="MM"
                          value={formData.expiryMonth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Expiry Year</label>
                        <input
                          type="text"
                          className="form-control"
                          name="expiryYear"
                          placeholder="YYYY"
                          value={formData.expiryYear}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body p-4">
                  <h5 className="mb-4">{t('Enter your Billing Address')}</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <CountrySelect
                        value={formData.country}
                        onChange={(value) => handleInputChange({ target: { name: 'country', value }})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Province/State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="text-end mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="/form2-page3" className="text-decoration-none">
                    <span
                      className="btn"
                      style={{ 
                        backgroundColor: "#274171",
                        color: 'white',
                        padding: '10px 30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
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
                      gap: '8px'
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
