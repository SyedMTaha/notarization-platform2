import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_ZARLcZDuu7Cj0J7pol7DwLP_iB8Em6o",
    authDomain: "wiscribbles-2f919.firebaseapp.com",
    projectId: "wiscribbles-2f919",
    storageBucket: "wiscribbles-2f919.firebasestorage.app",
    messagingSenderId: "429402625193",
    appId: "1:429402625193:web:5616f9cb87ac936267c5b8",
    measurementId: "G-37LZNPM781"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;


async function getUserData(userId) {  // Changed from userID to userId
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log('User Category:', userData.signUpAs);
            console.log('User Data:', userData);
            return { success: true, data: userData };
        } else {
            console.log('No such user!');
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, error };
    }
}

const storeUserData = async (userData) => {
  try {
    // Store user data in Firestore
    await setDoc(doc(db, "users", userData.uid), userData);
    return { success: true };
  } catch (error) {
    console.error("Error storing user data:", error);
    return { success: false, error };
  }
};

  export { auth, db, storage, analytics, storeUserData, getUserData };
