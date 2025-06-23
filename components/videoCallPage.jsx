'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getUserData } from '@/firebase';

const VideoCallPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const meetingId = searchParams.get('meetingId');
  const [isLoading, setIsLoading] = useState(true);
  const [hasJoinedCall, setHasJoinedCall] = useState(false);
  const user = useAuthStore((s) => s.user);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Fetch user role if not present
    const fetchRole = async () => {
      if (user && user.uid) {
        // If user object already has signUpAs, use it
        if (user.signUpAs) {
          setRole(user.signUpAs);
        } else {
          // Otherwise, fetch from Firestore
          const { success, data } = await getUserData(user.uid);
          if (success && data.signUpAs) {
            setRole(data.signUpAs);
          }
        }
      }
    };
    fetchRole();
  }, [user]);

  useEffect(() => {
    if (!meetingId) return;
    // Use meetingId from URL for ZegoCloud room
    const userID = user && user.uid ? user.uid : Math.floor(Math.random() * 10000).toString();
    const userName = user && user.email ? user.email : `User_${userID}`;
    const initializeCall = async () => {
      const appID = 350196793; // Replace with your Zego Cloud App ID
      const serverSecret = '7ce30a0e63c55b55eb4a204d82e3352a'; // Replace with your Zego Cloud Server Secret
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        meetingId,
        userID,
        userName
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      await zp.joinRoom({
        container: document.querySelector("#video-call-container"),
        sharedLinks: [{
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?meetingId=' + meetingId,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true,
        onJoinRoom: () => {
          setHasJoinedCall(true);
        },
        onLeaveRoom: () => {
          console.log('User left the room');
        },
      });
      setIsLoading(false);
    };
    initializeCall();
  }, [meetingId, user]);

  const handleNext = () => {
    router.push('/form2-page5');
  };

  const handleBack = () => {
    if (from === 'member') {
      router.push('/dashboard/member');
    } else {
      router.push('/dashboard');
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
                {/* Notary: show only Back button, User: show only Next button */}
                {role === 'Notary' ? (
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
                ) : <div />}
                {role !== 'Notary' && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
