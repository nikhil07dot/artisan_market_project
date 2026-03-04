// GoogleButton.jsx
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        await axios.post('http://localhost:5000/api/users/register', userData);
      } catch (err) {
        if (err.response?.status === 200 || err.response?.status === 400) {
          await axios.post('http://localhost:5000/api/users/login', {
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
