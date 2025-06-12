"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgressSidebar from './FormProgressSidebar';
import { toast } from 'react-hot-toast';
import { getFormData, saveFormData, clearFormData } from '@/utils/formStorage';

const Form2step5 = () => {
  const router = useRouter();
  const t = useTranslations();
  const [deliveryMethod, setDeliveryMethod] = useState('download');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = getFormData();
    console.log('Initial form data loaded:', savedData);
    if (savedData) {
      setFormData(savedData);
      if (savedData.step5) {
        setDeliveryMethod(savedData.step5.deliveryMethod || 'download');
        setEmail(savedData.step5.email || '');
      }
    }
  }, []);

  // Save data when values change
  useEffect(() => {
    if (formData) {
      const step5Data = {
        deliveryMethod,
        email: deliveryMethod === 'email' ? email : ''
      };
      console.log('Saving step 5 data:', step5Data);
      saveFormData(5, step5Data);
    }
  }, [deliveryMethod, email, formData]);

  const handleSubmit = async () => {
    if (deliveryMethod === 'email' && !email) {
      toast.error(t('Please enter your email address'));
      return;
    }

    setIsSubmitting(true);
    try {
      // Get all form data from localStorage
      const allFormData = getFormData();
      
      // Detailed logging of form data
      console.log('Form data at submission:', {
        step1: allFormData.step1,
        step2: allFormData.step2,
        step3: allFormData.step3,
        step4: allFormData.step4,
        step5: allFormData.step5
      });
      
      // Check each step individually and provide specific feedback
      const missingSteps = [];
      if (!allFormData.step1) missingSteps.push('Step 1 (Personal Information)');
      if (!allFormData.step2) missingSteps.push('Step 2 (Document Information)');
      if (!allFormData.step3) missingSteps.push('Step 3 (Signature Information)');
      if (!allFormData.step4) missingSteps.push('Step 4 (Payment Information)');

      if (missingSteps.length > 0) {
        console.error('Missing steps:', missingSteps);
        throw new Error(`Please complete the following steps first: ${missingSteps.join(', ')}`);
      }

      // Prepare the final payload
      const payload = {
        step1: allFormData.step1,
        step2: allFormData.step2,
        step3: allFormData.step3,
        step4: allFormData.step4,
        step5: {
          deliveryMethod,
          email: deliveryMethod === 'email' ? email : ''
        },
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Submitting payload:', payload);

      // Submit to API
      const response = await fetch('/api/form2/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || t('Failed to submit form'));
      }

      // Clear form data after successful submission
      clearFormData();

      // Redirect to success page with reference number
      router.push(`/form2-success?reference=${result.data.referenceNumber}`);

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1" style={{ marginRight: '320px' }}>
        <div className="mt-4 ml-4">
          <Link legacyBehavior href="/">
            <a>
              <img
                src="/assets/images/logos/logo.png"
                style={{ height: '70px' }}
                alt="Logo"
                title="Logo"
              />
            </a>
          </Link>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="form-card bg-white p-4 rounded-3">
                {/* Form Header */}
                <div className="text-center mb-5">
                  <h2 style={{ color: '#2D3748', fontSize: '28px', fontWeight: '600' }}>{t('Delivery Method')}</h2>
                  <p style={{ color: '#718096', fontSize: '16px', marginTop: '8px' }}>{t('Choose how you would like to receive your document')}</p>
                </div>

                {/* Delivery Method Selection */}
                <div className="row justify-content-center mb-5">
                  <div className="col-md-8">
                    <div className="d-flex gap-4">
                      <div
                        className={`delivery-option ${deliveryMethod === 'download' ? 'selected' : ''}`}
                        onClick={() => setDeliveryMethod('download')}
                        style={{
                          flex: 1,
                          padding: '20px',
                          border: '2px solid',
                          borderColor: deliveryMethod === 'download' ? '#274171' : '#E2E8F0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: deliveryMethod === 'download' ? '#F7FAFC' : 'white',
                        }}
                      >
                        <h5 style={{ color: '#2D3748', marginBottom: '10px' }}>{t('Download')}</h5>
                        <p style={{ color: '#718096', margin: 0 }}>{t('Download your document directly')}</p>
                      </div>
                      
                      <div
                        className={`delivery-option ${deliveryMethod === 'email' ? 'selected' : ''}`}
                        onClick={() => setDeliveryMethod('email')}
                        style={{
                          flex: 1,
                          padding: '20px',
                          border: '2px solid',
                          borderColor: deliveryMethod === 'email' ? '#274171' : '#E2E8F0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: deliveryMethod === 'email' ? '#F7FAFC' : 'white',
                        }}
                      >
                        <h5 style={{ color: '#2D3748', marginBottom: '10px' }}>{t('Email')}</h5>
                        <p style={{ color: '#718096', margin: 0 }}>{t('form2_receive_via_email')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Input (shown only when email delivery is selected) */}
                {deliveryMethod === 'email' && (
                  <div className="row justify-content-center mb-5">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label className="form-label" style={{ color: '#4A5568', fontWeight: '500', marginBottom: '8px' }}>{t('Email Address')}</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="johndoe@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '10px',
                            fontSize: '14px',
                            height: '50px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="actions">
                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <Link href="/form2-page4" className="text-decoration-none">
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
                        <i className="fa fa-arrow-left"></i> {t('Back')}
                      </span>
                    </Link>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
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
                        right: '20px',
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSubmitting ? t('Submitting...') : t('Submit')} <i className="fa fa-arrow-right"></i>
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
          <FormProgressSidebar currentStep={5} />
        </div>
      </div>
    </div>
  );
};

export default Form2step5;
