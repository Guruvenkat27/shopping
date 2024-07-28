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
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../database/Database'; 

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });


    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
