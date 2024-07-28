import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../database/Database.js'; // Adjust the path if firebase.js is not in the same folder
import useAuth from '../../database/Auth';


const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()
  const user= useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};

    if (!firstname) {
      valid = false;
      errors.firstname = 'First name is required';
    }

    if (!lastname) {
      valid = false;
      errors.lastname = 'Last name is required';
    }

    if (!phone) {
      valid = false;
      errors.phone = 'Phone number is required';
    }

    if (!email) {
      valid = false;
      errors.email = 'Email is required';
    }

    if (!password) {
      valid = false;
      errors.password = 'Password is required';
    }

    setErrors(errors);

    if (valid) {
      try {
       const userCredentials= await createUserWithEmailAndPassword(auth, email, password);
       const user= userCredentials.user;
        console.log('User registered successfully',user);
        await updateProfile(user, {
          displayName: `${firstname} ${lastname}`,
        });
        navigate('/login'); 
      } catch (error) {
        console.error('Error registering user: ', error.message);
        setErrors({ general: 'Failed to register. Please try again.' });
      }
    }
  };

  return (
    <>
      <div className='relative loginback h-[100vh] w-[100vw] grid items-center justify-center'>
        <form onSubmit={handleSubmit} className="loginform gap-4 p-3 grid">
          <h1 className='font-bold text-center text-[23px]'>REGISTER</h1>
          <input
            type="text"
            placeholder="Enter your Firstname"
            className='rounded-md bg-transparent regisinp w-[23vw] h-[5vh] px-4'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          <input
            type="text"
            placeholder="Enter your Lastname"
            className='rounded-md bg-transparent regisinp w-[23vw] h-[5vh] px-4'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          <input
            type="text"
            placeholder="Enter your phone no"
            className='rounded-md bg-transparent regisinp w-[23vw] h-[5vh] px-4'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          <input
            type="text"
            placeholder="Enter your email"
            className='rounded-md bg-transparent regisinp w-[23vw] h-[5vh] px-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type='password'
            placeholder='Enter your password'
            className='rounded-md bg-transparent regisinp w-[23vw] h-[5vh] px-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <button type='submit' className='bg-blue-600 text-white h-[4.5vh]'>Register</button>
          <div className='flex justify-end text-[13.5px] gap-1'>
            <span>Already have an account? <Link className='text-blue-600' to={"/login"}>Login now</Link></span>
          </div>
          {/* <div className='flex items-center justify-center gap-14'>
            <button className='bg-black w-[7vw]'>Gmail</button>
            <button className='bg-black w-[7vw]'>Facebook</button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default Register;
