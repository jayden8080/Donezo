import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import "./Profile.css";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    function initClient() {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (!authInstance) {
              console.error("Google Auth Instance is null");
              return;
            }

            setIsSignedIn(authInstance.isSignedIn.get());

            authInstance.isSignedIn.listen((signedIn) => {
              setIsSignedIn(signedIn);
              if (signedIn) {
                fetchUserProfile();
              } else {
                setUserProfile(null);
              }
            });

            if (authInstance.isSignedIn.get()) {
              fetchUserProfile();
            }
          })
          .catch((error) => console.error("Google API 초기화 오류:", error));
      });
    }

    initClient();
  }, []);

  const fetchUserProfile = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) return;

    setTimeout(() => {
      const profile = authInstance.currentUser.get().getBasicProfile();
      if (profile) {
        setUserProfile({
          name: profile.getName(),
          email: profile.getEmail(),
          imageUrl: profile.getImageUrl(),
        });
      } else {
        console.error("프로필 정보를 가져올 수 없음");
      }
    }, 500); // 🔹 0.5초 대기 후 가져오기
  };

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(fetchUserProfile);
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
    setUserProfile(null);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">👤 내 프로필</h2>
        {isSignedIn ? (
          <div className="user-info">
            {userProfile?.imageUrl ? (
              <img src={userProfile.imageUrl} alt="Profile" className="profile-image" />
            ) : (
              <p>이미지를 불러오는 중...</p>
            )}
            <p className="user-name">{userProfile?.name}</p>
            <p className="user-email">{userProfile?.email}</p>
            <button onClick={handleLogout} className="logout-button">
              로그아웃
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="login-button">
            Google 로그인
          </button>
        )}
      </div>
    </div>
  );
}
