import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../database/Database.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
     email: '',
     password: ''
     });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};

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
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Successfully logged in');
        localStorage.setItem("user", JSON.stringify({ email })); // Store user details in local storage
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true }); 
      } catch (error) {
        console.error('Error logging in: ', error);
        setErrors({ general: 'Failed to log in. Please check your credentials and try again.' });
      }
    }
  };

  return (
    <div className='relative loginback h-[100vh] w-[100vw] grid items-center justify-center'>
      <form onSubmit={handleSubmit} className="loginform gap-4 p-3 grid">
        <h1 className='font-bold text-center text-[23px]'>LOGIN</h1>
        <input
          type="text"
          placeholder="Enter your email"
          className='w-[23vw] regisinp bg-transparent rounded-md h-[5vh] px-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type='password'
          placeholder='Enter your password'
          className='w-[23vw] regisinp bg-transparent rounded-md h-[5vh] px-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
        <div className='flex justify-between items-center text-[13.5px] gap-1'>
          <span className='flex items-center gap-1'>
            <input type="checkbox" name="" id="" /> Remember me
          </span>
          <Link className='text-blue-600'>Forgot password</Link>
        </div>
        <button type='submit' className='bg-blue-600 text-white h-[4.5vh]'>Login</button>
        <div className='flex justify-end text-[13.5px] gap-1'>
          <span>Not have an account? <Link className='text-blue-600' to={"/signup"}>Register now</Link></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
