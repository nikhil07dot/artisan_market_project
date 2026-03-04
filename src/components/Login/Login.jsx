// Login.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import GoogleButton from '../Auth/GoogleButton';
import potbg from "../../assets/potbg.jpg";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true }); 
    } catch (error) { 
      alert(error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${potbg})` }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute text-xl top-4 left-4 px-4 py-2 bg-black text-white hover:text-black rounded hover:bg-white"
      >
        Return to Home
      </button>

      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-md w-[600px] h-[800px]
        max-[1440px]:w-[550px] max-[1440px]:h-[800px]
        max-[1024px]:w-[500px] max-[1024px]:h-[760px]
        max-[768px]:w-[450px] max-[768px]:h-[730px]
        max-[425px]:w-[350px] max-[425px]:h-[670px]
        max-[375px]:w-[320px] max-[375px]:h-[670px]
        max-[320px]:w-[290px] max-[320px]:h-[750px]"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Artisan Market Logo" className="object-contain w-64 h-64 max-[1024px]:w-56 max-[768px]:w-48 max-[425px]:w-40 max-[375px]:w-36 max-[320px]:w-32" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-6 text-base">
          Please fill in your Email and Password to Login.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-lg font-semibold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-100 focus:outline-none text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black hover:bg-slate-800 text-white rounded-full font-bold text-xl"
          >
            Login
          </button>

          {/* 👇 Pass redirect state to GoogleButton */}
          <GoogleButton redirectPath={from} />
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-semibold underline">Sign-Up here!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
