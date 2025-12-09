import Logo from '../Images/Logo.png';
import Default from '../Images/Default.png';
import { KeyRound, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  localStorage.clear();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.id) {
        // Successful login
        localStorage.setItem('user', JSON.stringify(data));
        alert(`Welcome ${data.username}`);
        navigate('/dashboard');
      } else {
        // Backend returned an error message
        alert(data || 'Login failed');
      }
    } catch (err) {
      alert('Login error: ' + err);
    }
  };

  return (
    <div className='flex justify-center gap-60 items-center h-screen'>
      <div>
        <img src={Logo} className='w-md' alt="Logo" />
      </div>

      <div className='flex items-center flex-col gap-10 h-full pt-30'>
        <img src={Default} className='w-70' alt="User" />
        <div className='rounded-xl flex flex-col items-center gap-4 border-t-4 border-t-primary border border-gray-200 shadow-sm p-8 bg-white'>
          <h1 className='text-xl text-gray-600 font-bold'>Sign In</h1>

          <div className='flex flex-col gap-6'>
            {/* Email */}
            <div className='flex flex-col gap-1 min-w-[300px]'>
              <label className='text-sm font-bold text-gray-600'>Email *</label>
              <div className='flex gap-2'>
                <input
                  placeholder='Enter your email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border-l-4 border-l-secondary outline-none w-full rounded-lg border border-gray-300 shadow-sm p-2 px-4 bg-white'
                />
                <span className='flex-center rounded-lg border border-gray-300 shadow-sm p-2 px-4'>
                  <Mail size={16} strokeWidth={1.5} />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1 min-w-[300px]'>
              <label className='text-sm font-bold text-gray-600'>Password *</label>
              <div className='flex gap-2'>
                <input
                  placeholder='Enter your password'
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='border-l-4 border-l-secondary outline-none w-full rounded-lg border border-gray-300 shadow-sm p-2 px-4 bg-white'
                />
                <span
                  className='cursor-pointer flex-center rounded-lg border border-gray-300 shadow-sm p-2 px-4'
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <LockKeyhole size={16} strokeWidth={1.5} />
                  ) : (
                    <KeyRound size={16} strokeWidth={1.5} />
                  )}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className='mt-6 cursor-pointer text-white bg-primary font-semibold p-2 px-8 rounded-lg'
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
