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
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="multisteps-form__panel js-active" data-animation="slideHorz">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      style={{ height: '70px'  }}
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>

                <div className="wizard-forms section-padding">
                  <div className="container">
                    <div className="text-center mb-5">
                      <h2 style={{ color: '#5756A2', fontSize: '2.5rem', fontWeight: '600' }}>{t('Signature & Notarization')}</h2>
                      <p className="mt-2" style={{ fontSize: '1.1rem', color: '#666' }}>{t('Choose whether you want to connect to a Notary or use E-Sign')}</p>
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
                              border: selectedOption === 'esign' ? '2px solid #4CAF50' : '1px solid #ddd',
                              borderRadius: '8px',
                              transition: 'all 0.3s ease',
                              backgroundColor: selectedOption === 'esign' ? '#f8f9fa' : 'white'
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
                              border: selectedOption === 'notary' ? '2px solid #4CAF50' : '1px solid #ddd',
                              borderRadius: '8px',
                              transition: 'all 0.3s ease',
                              backgroundColor: selectedOption === 'notary' ? '#f8f9fa' : 'white'
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
                          border: '2px dashed #ddd',
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa',
                          minHeight: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <input
                            type="file"
                            id="document-upload"
                            onChange={handleDocumentUpload}
                            style={{ display: 'none' }}
                            accept=".pdf,.doc,.docx"
                          />
                          <label htmlFor="document-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <img
                              src="/assets/v3/img/form-img09.png"
                              alt="Upload"
                              style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                            />
                            <h5>Upload Document</h5>
                            {uploadedDocument ? (
                              <p className="text-success">File uploaded: {uploadedDocument.name}</p>
                            ) : (
                              <p className="text-muted">Click to upload or drag and drop your document here</p>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="text-end mt-5">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link href="/form2-page2" className="text-decoration-none">
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
