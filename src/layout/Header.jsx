import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, User } from 'lucide-react'; 

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
      return;
    }
    navigate('/products');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
      
      {/* 1. Search Bar (Memenuhi Poin 4: Class Tailwind untuk Layouting) */}
      <form onSubmit={handleSubmit} className="relative w-96">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search product..." 
          className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
        />
      </form>

      {/* 2. User Profile & Notification (Sesuai Desain Dabang) */}
      <div className="flex items-center gap-6">
        {/* Tombol Notifikasi */}
        <button className="relative text-gray-400 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Identitas User (Poin 2: Analisa Layout) */}
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-800">Fulan Admin</p>
            <p className="text-xs text-gray-400 font-medium">Owner</p>
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
//export default function Header() {
  //return (
   // <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
    //  <h1 className="text-xl font-bold">My Dashboard</h1>

    //  <div className="flex items-center gap-4">
     //   <span className="text-gray-600">Zakaria</span>
     //   <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
    //  </div>
   // </div>
 // )
//}