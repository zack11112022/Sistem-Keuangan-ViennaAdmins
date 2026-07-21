import React from 'react';
import { LayoutDashboard, FileText, LogOut, Users, ShoppingCart, Receipt } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id_user');
    localStorage.removeItem('nama_lengkap');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Menu admin: kelola dashboard, produk, dan akun karyawan.
  const adminMenu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Sales Raport', icon: <FileText size={20} />, path: '/sales-raport' },
    { name: 'Produk', icon: <FileText size={20} />, path: '/products' },
    { name: 'Pengeluaran', icon: <Receipt size={20} />, path: '/pengeluaran' },
    { name: 'Manajemen Akun', icon: <Users size={20} />, path: '/manajemen-akun' },
  ];

  // Menu karyawan: cuma input pemasukan lewat kasir.
  const karyawanMenu = [
    { name: 'Kasir', icon: <ShoppingCart size={20} />, path: '/kasir' },
  ];

  const menuItems = role === 'Karyawan' ? karyawanMenu : adminMenu;

  return (
    <aside className="w-64 bg-[#2D31FA] text-white flex flex-col min-h-screen">
      {/* Logo Section - Dabang */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl">
          <div className="w-6 h-6 border-2 border-white rounded-md rotate-45 flex items-center justify-center">
            <span className="text-[10px] -rotate-45 font-bold">S</span>
          </div>
        </div>
        <span className="text-2xl font-bold tracking-tight">ViennaAdmins </span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#5C61FF] text-white shadow-lg' // Style menu aktif seperti di gambar
                  : 'hover:bg-blue-700 text-white/70'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sign Out Section */}
      <div className="p-8">
        <button type="button" onClick={handleSignOut} className="flex items-center gap-4 text-white/80 hover:text-white transition-colors w-full group">
          <div className="p-1 border border-white/40 rounded group-hover:border-white">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;