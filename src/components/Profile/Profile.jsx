import { useContext, useEffect, useRef, useState } from 'react';
import { auth, storage, db } from '../../firebase';
import {
  updatePassword,
  deleteUser,
  updateProfile
} from 'firebase/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { motion as Motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const toastStyles = {
  style: {
    background: '#333',
    color: '#fff',
    fontSize: '0.9rem',
  },
  iconTheme: {
    primary: '#4ade80',
    secondary: '#1e1e1e',
  },
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState('');
  const [activities, setActivities] = useState([]);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [savingInfo, setSavingInfo] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserMetadata = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBirthday(data.birthday || '');
        setGender(data.gender || '');
        setAddress(data.address || '');
        setPhoneNumber(data.phoneNumber || '');
      }
    };

    fetchUserMetadata();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'activities'),
      where('uid', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setActivities(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [user]);

  const logActivity = async (action) => {
    await addDoc(collection(db, 'activities'), {
      uid: user.uid,
      action,
      timestamp: new Date(),
    });
  };

  const handlePasswordUpdate = async () => {
    const loadingId = toast.loading('Updating password...', toastStyles);
    try {
      await updatePassword(auth.currentUser, newPassword);
      await logActivity('Password updated');
      toast.success('Password updated successfully!', { id: loadingId, ...toastStyles });
    } catch (error) {
      toast.error(error.message, { id: loadingId, ...toastStyles });
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?');
    if (confirm) {
      const loadingId = toast.loading('Deleting account...', toastStyles);
      try {
        await deleteUser(auth.currentUser);
        toast.success('Account deleted.', { id: loadingId, ...toastStyles });
        navigate('/');
      } catch (error) {
        toast.error(error.message, { id: loadingId, ...toastStyles });
      }
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const filePath = `profilePhotos/${user.uid}/avatar.jpg`;
    const storageRef = ref(storage, filePath);

    const loadingId = toast.loading('Uploading photo...', toastStyles);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: url });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { photoURL: url });

      await logActivity('Profile photo updated');
      toast.success('Photo updated!', { id: loadingId, ...toastStyles });
      window.location.reload();
    } catch (err) {
      toast.error('Upload failed: ' + err.message, { id: loadingId, ...toastStyles });
    }
  };

  const handleInfoSave = async () => {
    if (!displayName.trim()) {
      toast.error('Name cannot be empty.', toastStyles);
      return;
    }

    setSavingInfo(true);
    const loadingId = toast.loading('Saving info...', toastStyles);
    try {
      await updateProfile(auth.currentUser, { displayName });
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        phoneNumber,
        birthday,
        gender,
        address
      });
      await logActivity('User info updated');
      toast.success('Profile updated!', { id: loadingId, ...toastStyles });
    } catch (err) {
      toast.error('Update failed: ' + err.message, { id: loadingId, ...toastStyles });
    } finally {
      setSavingInfo(false);
    }
  };

  if (!user) return <div className="mt-10 text-center text-xl">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-[#e8e0d7] text-gray-900">
      <Toaster position="top-right" toastOptions={toastStyles} />
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-5xl font-extrabold mb-6">My Profile</h1>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.photoURL || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow mb-3 object-cover"
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload New Photo
          </button>
        </div>

        {/* Editable Info */}
        <div className="mb-6 space-y-4">  
          <h2 className="text-xl font-bold">Basic Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="border p-2 rounded text-black" />
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 rounded text-black" />
            <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="border p-2 rounded text-black" />
            <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 rounded text-black" />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded text-black col-span-1 sm:col-span-2" />
          </div>
          <button
            onClick={handleInfoSave}
            disabled={savingInfo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {savingInfo ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Change Password */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <input
            type="password"  
            placeholder="New Password"
            className="border p-2 rounded w-full max-w-md mb-2 text-black"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordUpdate} 
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </div>

        {/* Activity Logs */}  
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Activity Log</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {activities.map((a, index) => (
              <li key={index}>
                {a.action} - {new Date(a.timestamp?.toDate()).toLocaleString()}
              </li>
            ))} 
          </ul>
        </div>

        {/* Danger Zone */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h3>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </Motion.div>
    </div>
  );
};

export default Profile;
