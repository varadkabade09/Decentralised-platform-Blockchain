import React, { useState } from 'react';
import { useGlobalState } from './store';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const val = localStorage.getItem('val');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [progressval] = useGlobalState('progressval');
  const role = localStorage.getItem('role');

  const handleSave = () => {
    // Save changes to localStorage or backend
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    console.log(val)
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6">{connectedAccount}</h2>
      <div className="mb-4">
        <label className="text-lg font-semibold text-green-700">Password:</label>
        {isEditing ? (
          <input
            type="password"
            className="border border-green-400 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <p className="text-lg text-green-900">{password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold text-green-700">Email:</label>
        {isEditing ? (
          <input
            type="email"
            className="border border-green-400 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="text-lg text-green-900">{email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold text-green-700">Role:</label>
        <p className="text-lg text-green-900">{role}</p>
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:border-green-500"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:border-green-500"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
