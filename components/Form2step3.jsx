"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgressSidebar from './FormProgressSidebar';

const Form2step3 = () => {
  const router = useRouter();
  const t = useTranslations();
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocument(file);
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert('Please select a signing option to proceed');
      return;
    }
    if (!uploadedDocument) {
      alert('Please upload your document to proceed');
      return;
    }
    router.push('/form2-page4');
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
                <div className="text-center mb-5">
                  <h2 style={{ color: '#2D3748', fontSize: '28px', fontWeight: '600' }}>{t('Signature & Notarization')}</h2>
                  <p style={{ color: '#718096', fontSize: '16px', marginTop: '8px' }}>{t('Choose whether you want to connect to a Notary or use E-Sign')}</p>
                </div>

                <div className="row justify-content-center mb-5">
                  <div className="col-md-8">
                    <div className="d-flex justify-content-center gap-4">
                      {/* E-Sign Option */}
                      <div
                        className={`card signing-option ${selectedOption === 'esign' ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('esign')}
                        style={{
                          cursor: 'pointer',
                          width: '200px',
                          border: selectedOption === 'esign' ? '2px solid #274171' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          backgroundColor: selectedOption === 'esign' ? '#F7FAFC' : '#FFFFFF',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="card-body text-center p-4">
                          <img
                            src="/assets/v3/img/form-img11.png"
                            alt="E-Sign"
                            style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                          />
                          <h5 className="card-title">E-Sign</h5>
                        </div>
                      </div>

                      {/* Connect to Notary Option */}
                      <div
                        className={`card signing-option ${selectedOption === 'notary' ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('notary')}
                        style={{
                          cursor: 'pointer',
                          width: '200px',
                          border: selectedOption === 'notary' ? '2px solid #274171' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          backgroundColor: selectedOption === 'notary' ? '#F7FAFC' : '#FFFFFF',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="card-body text-center p-4">
                          <img
                            src="/assets/v3/img/form-img12.png"
                            alt="Connect to a Notary"
                            style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                          />
                          <h5 className="card-title">Connect to a Notary</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="upload-section p-4" style={{ 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      backgroundColor: selectedOption ? '#FFFFFF' : '#F7F8FA',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      opacity: selectedOption ? 1 : 0.7,
                      pointerEvents: selectedOption ? 'auto' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      <input
                        type="file"
                        id="document-upload"
                        onChange={handleDocumentUpload}
                        style={{ display: 'none' }}
                        accept=".pdf,.doc,.docx"
                        disabled={!selectedOption}
                      />
                      <label 
                        htmlFor="document-upload" 
                        style={{ 
                          cursor: selectedOption ? 'pointer' : 'not-allowed', 
                          textAlign: 'center' 
                        }}
                      >
                        <img
                          src="/assets/v3/img/form-img09.png"
                          alt="Upload"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            marginBottom: '1rem',
                            opacity: selectedOption ? 1 : 0.7
                          }}
                        />
                        <h5 style={{ color: selectedOption ? '#2D3748' : '#718096' }}>Upload Document</h5>
                        {uploadedDocument ? (
                          <p className="text-success">File uploaded: {uploadedDocument.name}</p>
                        ) : (
                          <p style={{ color: '#718096', fontSize: '14px' }}>
                            {selectedOption 
                              ? 'Click to upload or drag and drop your document here'
                              : 'Please select a signing option above to enable upload'
                            }
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="actions">
                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <Link href="/form2-page2" className="text-decoration-none">
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
        <FormProgressSidebar currentStep={3} />
      </div>
    </div>
  );
};

export default Form2step3;
