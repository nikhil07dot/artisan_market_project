import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import GoogleButton from '../Auth/GoogleButton';
import potbg from "../../assets/potbg.jpg";
import logo from "../../assets/logo.png";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('❌ Passwords do not match');
      return;
    }

    try {
      // Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // MongoDB Sync
      await axios.post(`${API_URL}/api/users/register`, {
        name,
        email,
        password
      });

      toast.success('✅ Account created!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      console.error('Signup error:', error);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${potbg})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate('/')}
        className="absolute text-xl top-4 left-4 px-4 py-2 bg-black text-white hover:text-black rounded hover:bg-white"
      >
        Return to Home
      </button>

      <div className="bg-white bg-opacity-90 rounded-xl shadow-md w-full max-w-[95%] sm:max-w-[90%] md:max-w-[70%] lg:max-w-[500px] xl:max-w-[550px] p-5 sm:p-6 md:p-8 lg:p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-40 h-40 sm:w-32 sm:h-32 md:w-44 md:h-44" />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Please fill in the details to sign up.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black hover:bg-slate-800 text-white rounded-full font-bold text-xl"
          >
            Sign Up
          </button>

          {/* 👇 GoogleButton should handle backend sync too */}
          <GoogleButton onSuccess={async (user) => {
            try {
              await axios.post(`${API_URL}/api/users/register`, {
                name: user.displayName,
                email: user.email,
                password, // Placeholder, not used
              });
              toast.success('✅ Google account synced!');
              setTimeout(() => navigate('/'), 1500);
            } catch (err) {
              toast.error('❌ Google sync failed');
              console.error(err);
            }
          }} />
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-semibold underline">
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
