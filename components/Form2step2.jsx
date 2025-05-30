'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgressSidebar from './FormProgressSidebar';

const documentTypes = [
  {
    id: 'power-of-attorney',
    icon: '/assets/v3/img/form-img01.png',
    title: 'Power of Attorney',
    selected: false
  },
  {
    id: 'last-will',
    icon: '/assets/v3/img/form-img02.png',
    title: 'Last Will & Testament',
    selected: false
  },
  {
    id: 'agreement-of-sale',
    icon: '/assets/v3/img/form-img03.png',
    title: 'Agreement of Sale',
    selected: false
  },
  {
    id: 'lease-agreement',
    icon: '/assets/v3/img/form-img04.png',
    title: 'Lease Agreement',
    selected: false
  },
  {
    id: 'promissory-note',
    icon: '/assets/v3/img/form-img05.png',
    title: 'Promissory Note',
    selected: false
  },
  {
    id: 'passport-application',
    icon: '/assets/v3/img/form-img06.png',
    title: 'Passport Application',
    selected: false
  },
  {
    id: 'affidavit-of-identity',
    icon: '/assets/v3/img/form-img07.png',
    title: 'Affidavit Of Identity',
    selected: false
  },
  {
    id: 'property-management',
    icon: '/assets/v3/img/form-img08.png',
    title: 'Property Management Agreement',
    selected: false
  },
  {
    id: 'custom-document',
    icon: '/assets/v3/img/form-img09.png',
    title: 'Upload your own Document',
    selected: false
  }
];

const Form2step2 = () => {
  const router = useRouter();
  const t = useTranslations();
  const [selectedDocument, setSelectedDocument] = React.useState(null);

  const handleDocumentSelect = (documentId) => {
    setSelectedDocument(documentId);
  };

  const handleNext = () => {
    if (selectedDocument) {
      router.push('/form2-page3');
    } else {
      // Show error or notification that document selection is required
      alert('Please select a document to proceed');
    }
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
                      style={{ height: '70px' }}
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>

                <div className="wizard-forms section-padding">
                  <div className="container">
                    <div className="text-center mb-5">
                      <h2 style={{ color: '#5756A2', fontSize: '2.5rem', fontWeight: '600' }}>{t('Standard Forms')}</h2>
                      <p className="mt-2" style={{ fontSize: '1.1rem', color: '#666' }}>{t('Please choose the form you would like to apply for')}</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                      {documentTypes.map((doc) => (
                        <div key={doc.id} className="col-md-4">
                          <div
                            className={`card h-100 document-card ${
                              selectedDocument === doc.id ? 'selected' : ''
                            }`}
                            onClick={() => handleDocumentSelect(doc.id)}
                            style={{
                              cursor: 'pointer',
                              border: selectedDocument === doc.id ? '2px solid #4CAF50' : '1px solid #ddd',
                              borderRadius: '8px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div className="card-body text-center p-4">
                              <img
                                src={doc.icon}
                                alt={doc.title}
                                style={{ 
                                  width: '48px', 
                                  height: '48px', 
                                  marginBottom: '1rem',
                                  
                                }}
                              />
                              <h5 className="card-title">{doc.title}</h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-end mt-5">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link href="/forms2" className="text-decoration-none">
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
        <FormProgressSidebar currentStep={2} />
      </div>
    </div>
  );
};

export default Form2step2;
