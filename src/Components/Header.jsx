import Logo from '../Images/Logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate('/');
  };

  // Show login modal if user is not logged in
  if (!user) {
    return (
      <>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Not Logged In</h2>
              <p className="mb-6 text-gray-600">You must be logged in to access this page.</p>
              <button
                onClick={handleLoginRedirect}
                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-white flex-center justify-between p-2 px-8 border-b border-gray-200 shadow-sm">
        <img src={Logo} className="w-14" alt="Logo" />

        <div className="flex-center gap-2">
          <h1 className="font-semibold text-gray-600 text-lg">
            Welcome, <span className="text-primary italic font-bold">{user.username}</span>
          </h1>
          <div className="flex-center text-white font-bold bg-primary h-12 w-12 rounded-full">
            {user.username
              .split(' ')
              .map((n) => n[0].toUpperCase())
              .join('')}
          </div>

          <button
            className="cursor-pointer text-primary font-semibold px-4 py-2 rounded-lg hover:opacity-90"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="border border-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

