import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../database/Database.js";
import { LocationContext } from '../Location/LocationContext.jsx'; // Adjust path as needed
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchLocation, location: userLocation, error, setCityAndPinCode } = useContext(LocationContext) || {};

  const getGeocodingData = async (latlng) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://map-geocoding.p.rapidapi.com/json',
        params: { latlng },
        headers: {
          'x-rapidapi-key': '739ce0b840msh494d1fdebf6c234p1c67a6jsn9ab49d0394d4',
          'x-rapidapi-host': 'map-geocoding.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      const { results } = response.data;

      if (results && results.length > 0) {
        const addressComponents = results[0].address_components;

        let city = '';
        let pinCode = '';

        addressComponents.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            pinCode = component.long_name;
          }
        });

        console.log('City:', city);
        console.log('Pin Code:', pinCode);

        setCityAndPinCode(city, pinCode);
      } else {
        console.warn('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

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

        // Fetch user location and geocoding data after successful login
        await fetchLocation();
        if (userLocation) {
          const latlng = `${userLocation.latitude},${userLocation.longitude}`;
          await getGeocodingData(latlng);
        } else {
          console.warn('User location not available.');
        }

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Error logging in:', error);
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
