// GoogleButton.jsx
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const GoogleButton = ({ redirectPath = '/' }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName || 'Google User',
        email: user.email,
      };

     try {
  await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, userData);
} catch (err) {
  if (err.response?.status === 409) {
    // User already exists → login instead
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email: user.email,
    });
  } else {
    throw err;
  }
}
      toast.success('✅ Signed in with Google!');
      setTimeout(() => navigate(redirectPath, { replace: true }), 1000);
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full py-3 bg-black hover:bg-slate-800 text-white rounded-full font-bold text-xl"
    >
      Continue with Google
    </button>
  );
};

export default GoogleButton;
