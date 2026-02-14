'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdPerson } from "react-icons/io";

const AdminLogin = () => {
  const router = useRouter();

  // ✅ Fixed admin credentials
  const ADMIN_NAME = 'admin';
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'admin123';

  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Single handleLogin function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      adminName === ADMIN_NAME &&
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      router.push('/admin/admindashboard'); // redirect to dashboard
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#567d9a] ">
      <div className="bg-gradient-to-r from-[#10838a] to-[#4d427c] p-8 rounded-4xl shadow w-[550px] h-[750px] shadow-[0_4px_6px_#41c6ef] ">
        <div className="flex justify-center text-[#d2d2d2]">
                <IoMdPerson size={60} /></div>
        <h1 className="text-4xl font-bold mb-4 text-center text-[#d0d0d0] mt-4">
          Admin Login 
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Admin Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-[#d0d0d0] text-lg">
              Admin Name</label>
            <input
  type="text"
  placeholder="Enter admin name"
  value={adminName}
  onChange={(e) => setAdminName(e.target.value)}
  className="border border-[#d2d2d2] w-full px-3 text-[black] py-4 mb-3 rounded-xl bg-[#d1d1d1] mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
  required
/>

          </div>

          {/* Email */}
         <div className="flex flex-col">
  <label className="mb-1 font-bold text-[#d0d0d0] text-lg">Email</label>
  <input
    type="email"
    placeholder="Enter admin email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="border border-[#d2d2d2] bg-[#d1d1d1] w-full px-3 text-[black] py-4 mb-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
    required
  />
</div>


          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-[#d0d0d0] text-lg">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#d2d2d2] bg-[#d1d1d1] w-full px-3 text-[black] py-4 mb-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#3d97d3] text-white text-xl font-bold w-full py-4 rounded-4xl mt-8"
          >
            Login
          </button>
        </form>

        <p className="text-lg text-gray-900 mt-6 text-center ">
          Forgot your password?{' '}
          <span className="text-green-400  cursor-pointer">Reset</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
