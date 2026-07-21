import React from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';

const Header = () => {
  const namaLengkap = localStorage.getItem('nama_lengkap') || 'Pengguna';
  const role = localStorage.getItem('role') || '';

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-8 shadow-sm">

      {/* User Profile & Notification (Sesuai Desain Dabang) */}
      <div className="flex items-center gap-6">
        {/* Tombol Notifikasi */}
        <button className="relative text-gray-400 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
        </button>

        {/* Identitas User (login) */}
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-800">{namaLengkap}</p>
            <p className="text-xs text-gray-400 font-medium">{role}</p>
          </div>

          {/* Avatar Profile */}
          <div className="flex items-center gap-1 group cursor-pointer">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border border-indigo-200">
              <User size={20} />
            </div>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-indigo-600 transition-all" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;