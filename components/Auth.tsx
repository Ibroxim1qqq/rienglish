
import React, { useState } from 'react';
import { User } from '../types';
import { Storage } from '../services/storage';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = Storage.getUsers();

    if (isLogin) {
      // Login logic
      const foundUser = users.find(u => u.email === email);
      // Real hayotda parolni xeshlash kerak, hozircha simulyatsiya
      if (foundUser) {
        onLogin(foundUser);
      } else if (email === 'admin@lingo.com' && password === 'admin123') {
        // Default admin
        const admin: User = { id: 'admin-001', name: 'Admin', email: 'admin@lingo.com', role: 'admin' };
        Storage.saveUser(admin);
        onLogin(admin);
      } else {
        setError('Email yoki parol noto\'g\'ri!');
      }
    } else {
      // Registration logic
      if (users.find(u => u.email === email)) {
        setError('Bu email allaqachon ro\'yxatdan o\'tgan!');
        return;
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: name || 'Foydalanuvchi',
        email: email,
        role: 'student'
      };
      
      Storage.saveUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-10 border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl mb-4 shadow-xl shadow-indigo-200">
            L
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">LingoMaster</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Ingliz tilini AI bilan o'rganing</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-2">To'liq ism</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-2">Email manzil</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com" 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-2">Parol</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-6"
          >
            {isLogin ? 'Kirish' : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-indigo-600 font-bold text-sm hover:underline"
          >
            {isLogin ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" : "Hisobingiz bormi? Kiring"}
          </button>
          <div className="mt-4 p-3 bg-indigo-50 rounded-xl text-[10px] text-indigo-400 font-bold">
            ADMIN: admin@lingo.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
