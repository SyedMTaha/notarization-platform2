'use client';

import React from 'react';
import { FiUser, FiFileText, FiEdit, FiCreditCard, FiDownload } from 'react-icons/fi';

const FormLayout = ({ children }) => {
  const steps = [
    { icon: <FiUser size={20} />, label: 'Personal information' },
    { icon: <FiFileText size={20} />, label: 'Document Selection' },
    { icon: <FiEdit size={20} />, label: 'Signature & Notarization' },
    { icon: <FiCreditCard size={20} />, label: 'Payment Details' },
    { icon: <FiDownload size={20} />, label: 'Document Download' }
  ];

  // Get current step from URL
  const currentStep = typeof window !== 'undefined' ? 
    window.location.pathname.includes('step1') ? 1 :
    window.location.pathname.includes('step2') ? 2 :
    window.location.pathname.includes('step3') ? 3 :
    window.location.pathname.includes('step4') ? 4 :
    window.location.pathname.includes('step5') ? 5 : 1 : 1;

  return (
    <div className="d-flex min-vh-100">
      <div className="flex-grow-1">
        {children}
      </div>
      
      {/* Right Sidebar */}
      <div style={{ width: '300px', backgroundColor: '#09123A', height: '100vh', position: 'sticky', top: 0 }}>
        <div className="d-flex flex-column h-100 text-white p-4">
          {steps.map((step, index) => (
            <div key={index} className="d-flex align-items-center mb-4">
              <div 
                className={`rounded-circle d-flex align-items-center justify-content-center me-3`}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: index + 1 === currentStep ? '#fff' : 
                                 index + 1 < currentStep ? '#4CAF50' : 'transparent',
                  border: '2px solid',
                  borderColor: index + 1 <= currentStep ? '#fff' : '#6c757d'
                }}
              >
                <span style={{ 
                  color: index + 1 === currentStep ? '#09123A' : 
                         index + 1 < currentStep ? '#fff' : '#6c757d' 
                }}>
                  {step.icon}
                </span>
              </div>
              <div>
                <p className="mb-0" style={{ 
                  color: index + 1 <= currentStep ? '#fff' : '#6c757d',
                  fontWeight: index + 1 === currentStep ? 'bold' : 'normal'
                }}>
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className="progress-line"
                  style={{
                    width: '2px',
                    height: '30px',
                    backgroundColor: index + 1 < currentStep ? '#4CAF50' : '#6c757d',
                    margin: '0 0 0 19px',
                    position: 'relative',
                    top: '30px'
                  }}
                />
              )}
            </div>
          ))}
          
          {/* Progress percentage */}
          <div className="mt-auto">
            <p className="mb-2">{currentStep} to {steps.length} step</p>
            <h3 className="mb-2">{Math.round((currentStep - 1) / (steps.length - 1) * 100)}% to complete</h3>
            <div className="progress" style={{ height: '8px' }}>
              <div 
                className="progress-bar"
                style={{
                  width: `${Math.round((currentStep - 1) / (steps.length - 1) * 100)}%`,
                  backgroundColor: '#4CAF50'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout; 