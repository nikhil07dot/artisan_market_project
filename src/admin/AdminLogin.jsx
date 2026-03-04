import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', true);
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2ef]">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
