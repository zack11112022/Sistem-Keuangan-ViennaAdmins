import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#2B7FFF] via-[#9D4EDD] to-[#FF4D97] p-4">
            <div className="w-full max-w-[450px]">
                <div className="bg-white rounded-[35px] shadow-2xl p-12 relative overflow-hidden">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#2B7FFF]">
                            <Lock size={28} />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Create Your Account </h2>
                        <p className="text-gray-400 mt-2 font-medium">Buat akun untuk mengakses dashboard</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-4 pr-4 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-4 pr-12 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
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

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-4 pr-12 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#2B7FFF] transition-colors"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2A52E2] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
                        >
                            Register
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/80 text-[10px] mt-10 tracking-widest uppercase">© 2026 BPF PROJECT. ALL RIGHTS RESERVED.</p>
            </div>
        </div>
    )
}
