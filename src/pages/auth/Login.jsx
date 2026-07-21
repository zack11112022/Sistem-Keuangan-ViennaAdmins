import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from 'src/lib/supabase.js';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: fetchError } = await supabase
      .from('akun')
      .select('id_user, email, nama_lengkap, role')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    setLoading(false);

    if (fetchError) {
      setError('Terjadi kesalahan saat login: ' + fetchError.message);
      return;
    }

    if (!data) {
      setError('Email atau password salah.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('id_user', String(data.id_user));
    localStorage.setItem('nama_lengkap', data.nama_lengkap ?? '');
    localStorage.setItem('role', data.role ?? '');

    if (data.role === 'Karyawan') {
      navigate('/kasir');
    } else {
      navigate('/');
    }
  };

  return (
    // Bagian Background: Menggunakan Biru Cerah ke Ungu/Pink Tajam
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#2B7FFF] via-[#9D4EDD] to-[#FF4D97] p-4">
      <div className="w-full max-w-[450px]">
        
        {/* Card Utama: Putih Bersih dengan Rounded Halus */}
        <div className="bg-white rounded-[35px] shadow-2xl p-12 relative overflow-hidden">
          
          {/* Icon Lock Atas */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#2B7FFF]">
              <Lock size={28} />
            </div>
          </div>

          {/* Judul & Sub-judul */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">welcome Back!</h2>
            <p className="text-gray-400 mt-2 font-medium">Silahkan login untuk mengelola dashboard</p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com" 
                  className="w-full pl-12 pr-4 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#2B7FFF] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm font-medium">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2B7FFF] focus:ring-[#2B7FFF]" />
                Ingat saya
              </label>
              <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:underline">Lupa password?</a>
            </div>

            {/* Tombol Sign In Biru Gacor */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2A52E2] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Sign in'}
            </button>
          </form>

          {/* Link Daftar */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Belum punya akun? <a href="#" className="text-blue-600 font-bold hover:underline">Daftar sekarang</a>
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="text-center text-white/80 text-[10px] mt-10 tracking-widest uppercase">
          © 2026 BPF PROJECT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
};

export default Login;