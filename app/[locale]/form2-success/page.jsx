'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const Form2Success = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const referenceNumber = searchParams.get('reference');
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('Submission Successful')}
            </h1>
            <p className="text-gray-600">
              {t('Your document has been submitted successfully')}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {t('Reference Number')}
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <code className="text-sm bg-gray-100 px-3 py-2 rounded">
                {referenceNumber}
              </code>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 hover:text-blue-800"
                title={t('Copy to clipboard')}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </div>
            {copySuccess && (
              <p className="text-green-600 text-sm mt-2">
                {t('Copied to clipboard!')}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              {t('Please save this reference number for future reference')}
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {t('Return to Home')}
              </Link>
              <Link
                href="/forms2"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {t('Submit Another Document')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2Success; 