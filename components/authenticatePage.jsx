'use client';
import React, { useState } from 'react';
import { FiUser, FiFileText, FiEdit, FiCreditCard, FiDownload } from 'react-icons/fi';
import AuthenticateSidebar from './authenticateSidebar';
import Link from 'next/link';

const AuthenticatePage = () => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [date, setDate] = useState({ day: '', month: '', year: '' });

  return (
    <div className="d-flex">
      <div className="flex-grow-1" style={{ marginRight: '320px' }}>
        <div className="mt-4" style={{ marginLeft: '22px' }}>
          <Link legacyBehavior href="/">
            <a className="d-block">
              <img
                src="/assets/images/logos/logo.png"
                style={{ height: '70px', display: 'block' }}
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
                  <h2 style={{ color: '#2D3748', fontSize: '28px', fontWeight: '600' }}>Authenticate</h2>
                  <p style={{ color: '#718096', fontSize: '16px', marginTop: '8px' }}>
                    Find the Documents you need and download them
                  </p>
                </div>

                {/* Reference Number Input */}
                <div className="row justify-content-center mb-4">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#2D3748', marginBottom: '8px' }}>Reference Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#F7FAFC'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Date Input */}
                <div className="row justify-content-center mb-5">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#2D3748', marginBottom: '8px' }}>Date Signed</label>
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="DD"
                          value={date.day}
                          onChange={(e) => setDate({ ...date, day: e.target.value })}
                          style={{
                            width: '80px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#F7FAFC'
                          }}
                        />
                        <span className="align-self-center" style={{ color: '#718096' }}>/</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM"
                          value={date.month}
                          onChange={(e) => setDate({ ...date, month: e.target.value })}
                          style={{
                            width: '80px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#F7FAFC'
                          }}
                        />
                        <span className="align-self-center" style={{ color: '#718096' }}>/</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="YYYY"
                          value={date.year}
                          onChange={(e) => setDate({ ...date, year: e.target.value })}
                          style={{
                            width: '100px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#F7FAFC'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Found Documents Section */}
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <h5 style={{ color: '#2D3748', marginBottom: '16px' }}>Found Documents</h5>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="document-card" style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <div style={{ 
                          backgroundColor: '#F7FAFC',
                          borderRadius: '8px',
                          padding: '24px',
                          marginBottom: '16px'
                        }}>
                          <img
                            src="/assets/v3/img/form-img01.png"
                            alt="Power of Attorney"
                            style={{ width: '64px', height: '64px' }}
                          />
                        </div>
                        <div>
                          <h6 style={{ color: '#2D3748', marginBottom: '4px' }}>Power of Attorney</h6>
                          
                        </div>
                      </div>

                      <button
                        className="btn"
                        style={{
                          backgroundColor: '#274171',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          height: 'fit-content',
                          marginTop: '155px'
                        }}
                      >
                        Download <FiDownload />
                      </button>
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
        <AuthenticateSidebar currentStep={1} />
      </div>
    </div>
  );
};

export default AuthenticatePage; 