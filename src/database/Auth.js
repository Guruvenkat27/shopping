// import {auth} from "./Database"

// import { createUserWithEmailAndPassword,GoogleAuthProvider,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth"

// export const doCreateUserWithEmailAndPassword=async (email,password)=>{
//     return createUserWithEmailAndPassword(auth,email,password)
// }
// export const doSignInWithEmailAndPassword=(email,password)=>{
//     return signInWithEmailAndPassword(auth,email,password);
// }
// export const doSignInWithGoogle=async ()=>{
//     const provider= new GoogleAuthProvider();
//     const result =await signInWithPopup(auth,provider)
//     return result;
// }
// export const doSignOut=()=>{
//     return auth.signOut();
// }
// // export const doPasswordReset=(email)=>{
// //     return sendPasswordResetEmail(auth,email)
// // }
// // export const dopasswordChange=(password)=>{
// //     return updatePassword(auth.currentUser,password)
// // };
// // export const doSendEmailVerification=()=>{
// //     return sendEmailVerification(auth.currentUser,{
// //         url:`${window.location.origin}/home`,
// //     })
// // }
// src/hooks/useAuth.js
// useAuth.js

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../database/Database'; // Import your initialized auth

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); // Use firebaseSignOut with the auth instance
    } catch (error) {
      throw new Error('Sign out failed: ' + error.message);
    }
  };

  return { user, signOut };
};

export default useAuth;
