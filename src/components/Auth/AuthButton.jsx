import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AuthButton = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const confirm = window.confirm("Do you really want to logout?");
    if (confirm) {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="px-4 text-white hover:text-[#a1724d]"
      >
        Login
      </button>
    );
  }

  const displayName = user.displayName || user.email?.split('@')[0];
  const avatarUrl = user.photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=4d7c0f&color=fff`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 text-white hover:text-[#a1724d]"
      >
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-5 h-5 rounded-full object-cover border border-white"
        />
        <span className="hidden md:inline">
  Hi, {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}!
</span>
      </button>

     {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
    {user && !user.isAnonymous && (
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
        onClick={() => {
          navigate('/profile');
          setDropdownOpen(false);
        }}
      >
        Profile
      </button>
    )}

    <button
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
)}

    </div>
  );
};

export default AuthButton;
