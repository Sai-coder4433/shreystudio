import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAn7SXmYXiN8JawSJN6mc0ufmVKN7jWE2c",
  authDomain: "shrey-studio-6a2d1.firebaseapp.com",
  projectId: "shrey-studio-6a2d1",
  storageBucket: "shrey-studio-6a2d1.firebasestorage.app",
  messagingSenderId: "781364296664",
  appId: "1:781364296664:web:0a0cb3222e6da4d077d0ad"
};

// Initialize Firebase safely without duplicate initialization
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
