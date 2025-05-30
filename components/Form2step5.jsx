"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgressSidebar from './FormProgressSidebar';

const Form2step5 = () => {
  const router = useRouter();
  const t = useTranslations();
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [email, setEmail] = useState('');

  const handleMethodSelect = (method) => {
    setDeliveryMethod(method);
  };

  const handleSubmit = () => {
    if (!deliveryMethod) {
      alert('Please select a delivery method');
      return;
    }
    if (deliveryMethod === 'email' && !email) {
      alert('Please enter your email address');
      return;
    }
    // Handle document delivery
    console.log('Delivering document via:', deliveryMethod, email);
    router.push('/');
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
                <h2 style={{ color: '#5756A2', fontSize: '2.5rem', fontWeight: '600' }}>{t('Document Download')}</h2>
                <p className="mt-2" style={{ fontSize: '1.1rem', color: '#666' }}>{t('Please Select How you want to Download your Document')}</p>
              </div>

              {/* Delivery Method Selection */}
              <div className="row justify-content-center mb-5">
                <div className="col-md-10">
                  <h5 className="mb-4">{t('E-sign or Connect to a Notary')}</h5>
                  <div className="d-flex justify-content-center gap-4">
                    {/* Download Option */}
                    <div
                      className={`card delivery-option ${deliveryMethod === 'download' ? 'selected' : ''}`}
                      onClick={() => handleMethodSelect('download')}
                      style={{
                        cursor: 'pointer',
                        width: '200px',
                        border: deliveryMethod === 'download' ? '2px solid #4CAF50' : '1px solid #ddd',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        backgroundColor: deliveryMethod === 'download' ? '#f8f9fa' : 'white'
                      }}
                    >
                      <div className="card-body text-center p-4">
                        <img
                          src="/assets/v3/img/form-img09.png"
                          alt="Download"
                          style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                        />
                        <h5 className="card-title">Download</h5>
                      </div>
                    </div>

                    {/* Email Option */}
                    <div
                      className={`card delivery-option ${deliveryMethod === 'email' ? 'selected' : ''}`}
                      onClick={() => handleMethodSelect('email')}
                      style={{
                        cursor: 'pointer',
                        width: '200px',
                        border: deliveryMethod === 'email' ? '2px solid #4CAF50' : '1px solid #ddd',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        backgroundColor: deliveryMethod === 'email' ? '#f8f9fa' : 'white'
                      }}
                    >
                      <div className="card-body text-center p-4">
                        <img
                          src="/assets/v3/img/form-img13.png"
                          alt="Send Email"
                          style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                        />
                        <h5 className="card-title">Send Email</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Input (shown only when email delivery is selected) */}
              {deliveryMethod === 'email' && (
                <div className="row justify-content-center mb-5">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          height: '50px',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="/form2-page4" className="text-decoration-none">
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
                    onClick={handleSubmit}
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
                    {deliveryMethod === 'email' ? t('Send Email') : t('Download')}
                    {' '}<i className={`fa fa-${deliveryMethod === 'email' ? 'paper-plane' : 'download'}`}></i>
                  </button>
                </div>
              </div>

              {/* Success Illustration */}
              <div className="text-start mt-4">
                <img
                  src="/assets/v3/img/form-img14.png"
                  alt="Success"
                  style={{ 
                    width: '200px',
                    height: 'auto',
                    marginLeft: '0'
                  }}
                />
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
        <FormProgressSidebar currentStep={5} />
      </div>
    </div>
  );
};

export default Form2step5;
