'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const [referenceNumber, setReferenceNumber] = useState(null);

  useEffect(() => {
    // Get reference number from URL params
    const ref = searchParams.get('ref');
    if (ref) {
      setReferenceNumber(ref);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Form Submitted Successfully!
          </h1>
          
          {referenceNumber && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Your Reference Number:</p>
              <p className="text-xl font-mono bg-gray-100 p-3 rounded">
                {referenceNumber}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please save this reference number for future reference.
              </p>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Your submission is being reviewed by our notary. You will be notified once it's approved.
          </p>

          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 