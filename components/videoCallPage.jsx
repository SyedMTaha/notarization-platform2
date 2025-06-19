'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Link from 'next/link';

const VideoCallPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const [isLoading, setIsLoading] = useState(true);
  const [hasJoinedCall, setHasJoinedCall] = useState(false);

  useEffect(() => {
    // Generate a random meeting ID if not provided
    const roomID = Math.floor(Math.random() * 10000).toString();
    const userID = Math.floor(Math.random() * 10000).toString();
    const userName = `User_${userID}`;

    // Get the Zego Cloud instance
    const initializeCall = async () => {
      const appID = 350196793; // Replace with your Zego Cloud App ID
      const serverSecret = '7ce30a0e63c55b55eb4a204d82e3352a'; // Replace with your Zego Cloud Server Secret

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join the call
      await zp.joinRoom({
        container: document.querySelector("#video-call-container"),
        sharedLinks: [{
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true,
        onJoinRoom: () => {
          setHasJoinedCall(true);
        },
        onLeaveRoom: () => {
          // We don't need to disable the next button when leaving
          console.log('User left the room');
        },
      });

      setIsLoading(false);
    };

    initializeCall();
  }, []);

  const handleNext = () => {
    router.push('/form2-page5');
  };

  const handleBack = () => {
    if (from === 'calendar') {
      router.push('/dashboard/calender');
    } else if (from === 'form4') {
      router.push('/form2-page4');
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* Header with Logo */}
      <div className="mt-4" style={{ marginLeft: '120px' }}>
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

      {/* Main Content */}
      <div className="flex-grow-1 container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              {/* Title */}
              <div className="text-center mb-4">
                <h2 style={{ 
                  color: '#2D3748', 
                  fontSize: '28px', 
                  fontWeight: '600',
                  fontFamily: "'Jost', sans-serif"
                }}>Video Verification</h2>
                <p style={{ 
                  color: '#718096', 
                  fontSize: '16px',
                  fontFamily: "'Jost', sans-serif"
                }}>Please complete the video verification process</p>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div 
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ 
                    height: '500px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div className="text-center">
                    <div className="spinner-border" 
                      style={{ 
                        color: '#274171',
                        width: '3rem',
                        height: '3rem',
                        marginBottom: '1.5rem'
                      }} 
                      role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 style={{ 
                      color: '#2D3748', 
                      fontSize: '24px',
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      We are setting up your video call
                    </h3>
                    <p style={{ 
                      color: '#718096', 
                      fontSize: '16px',
                      fontFamily: "'Jost', sans-serif",
                      maxWidth: '400px',
                      margin: '0 auto'
                    }}>
                      Please wait while we prepare a secure connection for your verification process
                    </p>
                  </div>
                </div>
              )}

              {/* Video Container */}
              <div 
                id="video-call-container" 
                className="mb-4" 
                style={{ 
                  height: '500px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: isLoading ? 'none' : 'block'
                }}
              ></div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  onClick={handleBack}
                  className="btn"
                  style={{ 
                    backgroundColor: "#274171",
                    color: 'white',
                    padding: '10px 30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Jost', sans-serif",
                    border: 'none'
                  }}
                >
                  <i className="fa fa-arrow-left"></i> Back
                </button>

                {/* Next Button */}
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
                    fontFamily: "'Jost', sans-serif",
                    border: 'none'
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
  );
};

export default VideoCallPage;
