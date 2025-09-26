
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [view, setView] = useState<'options' | 'form'>('options');
  const [loginType, setLoginType] = useState<UserRole>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleShowForm = (type: UserRole) => {
    setLoginType(type);
    setView('form');
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(loginType, username, password)) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div id="login-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="login-container bg-white p-10 rounded-lg shadow-2xl w-full max-w-sm text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">تسجيل الدخول</h2>
        
        {view === 'options' && (
          <div id="login-options" className="space-y-4">
            <button
              onClick={() => login('teamLeader')}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
            >
              الدخول كقائد فريق
            </button>
            <button
              onClick={() => handleShowForm('follower')}
              className="w-full py-3 px-4 bg-slate-100 text-slate-800 rounded-lg font-semibold text-lg border-2 border-slate-300 hover:bg-slate-200 transition-colors"
            >
              الدخول كمتابع
            </button>
            <button
              onClick={() => handleShowForm('admin')}
              className="w-full py-3 px-4 bg-red-500 text-white rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors"
            >
              الدخول كمسؤول
            </button>
          </div>
        )}

        {view === 'form' && (
          <form id="login-form" className="text-right" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1 font-semibold text-slate-700">اسم المستخدم</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-semibold text-slate-700">كلمة المرور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>
            {error && <p id="login-error" className="text-red-500 text-sm text-center mb-2 h-5">{error}</p>}
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              دخول
            </button>
            <button
              type="button"
              onClick={() => setView('options')}
              className="w-full mt-3 py-2 bg-slate-100 text-slate-800 rounded-lg font-semibold border-2 border-slate-300 hover:bg-slate-200 transition-colors"
            >
              رجوع
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
