'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const StatusPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const referenceNumber = searchParams.get('referenceNumber');

  const [statusText, setStatusText] = useState('');
  const [statusIcon, setStatusIcon] = useState(null);
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    switch (status) {
      case 'approved':
        setStatusText('Document Approved');
        setStatusIcon(<CheckCircle size={80} />);
        setIconColor('#28A745'); // Green
        break;
      case 'rejected':
        setStatusText('Document Rejected');
        setStatusIcon(<XCircle size={80} />);
        setIconColor('#DC3545'); // Red
        break;
      case 'pending':
        setStatusText('Document Pending Approval');
        setStatusIcon(<Clock size={80} />);
        setIconColor('#FFC107'); // Yellow/Orange
        break;
      default:
        setStatusText('Status Unknown');
        setStatusIcon(<Clock size={80} />); // Default icon for unknown status
        setIconColor('#6C757D'); // Gray
        break;
    }
  }, [status]);

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <Link legacyBehavior href="/">
          <a style={styles.logoLink}>
            <img
              src="/assets/images/logos/logo.png"
              style={styles.logoImage}
              alt="Logo"
              title="Logo"
            />
          </a>
        </Link>
      </div>

      <div style={styles.card}>
        <div style={styles.iconContainer}>
          {statusIcon}
        </div>
        <h2 style={styles.statusTitle}>{statusText}</h2>
        {referenceNumber && (
          <p style={styles.referenceNumberText}>Reference Number: <strong>{referenceNumber}</strong></p>
        )}
        <p style={styles.message}>
          Your document status has been retrieved.
        </p>

        <div style={styles.buttonContainer}>
          <Link legacyBehavior href="/">
            <a style={styles.returnHomeButton}>
              Return to Home
            </a>
          </Link>
          <Link legacyBehavior href="/forms">
            <a style={styles.submitAnotherButton}>
              + Submit Another Document
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#F7FAFC',
    padding: '20px',
  },
  logoContainer: {
    marginBottom: '40px',
    
  },
  logoLink: {
    display: 'block',
  },
  logoImage: {
    height: '70px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
  },
  iconContainer: {
    marginBottom: '20px',
    color: 'var(--icon-color, #000)', // Will be overridden by iconColor state
    display: 'flex',
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: '10px',
  },
  referenceNumberText: {
    fontSize: '16px',
    color: '#4A5568',
    marginBottom: '20px',
  },
  message: {
    fontSize: '16px',
    color: '#718096',
    marginTop: '10px',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  returnHomeButton: {
    backgroundColor: '#2D3748',
    color: 'white',
    padding: '12px 25px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#1A202C',
    },
  },
  submitAnotherButton: {
    backgroundColor: 'white',
    color: '#2D3748',
    border: '1px solid #E2E8F0',
    padding: '12px 25px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#F7FAFC',
      borderColor: '#CBD5E0',
    },
  },
};

export default StatusPage; 