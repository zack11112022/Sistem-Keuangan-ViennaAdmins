import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { FileText, ShoppingCart, DollarSign, Package, TrendingDown, Wallet } from 'lucide-react';
import { supabase } from 'src/lib/supabase.js';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#6366f1', '#94a3b8'];

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID').format(Math.round(value || 0));
}

function toDateKey(dateStr) {
  // Normalize to 'YYYY-MM-DD' regardless of whether Supabase returns a date or timestamp string.
  if (!dateStr) return null;
  return String(dateStr).slice(0, 10);
}

function last7DateKeys() {
  const keys = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function last6MonthKeys() {
  const keys = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
}

const dayLabel = (dateKey) => {
  const d = new Date(dateKey);
  return d.toLocaleDateString('id-ID', { weekday: 'short' });
};

const monthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('id-ID', { month: 'short' });
};

const Dashboard = () => {
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [produkMap, setProdukMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      const [pemasukanRes, pengeluaranRes, produkRes] = await Promise.all([
        supabase.from('pemasukan').select('*').order('tanggal', { ascending: false }),
        supabase.from('pengeluaran').select('*').order('tanggal', { ascending: false }),
        supabase.from('produk').select('id_produk, nama_produk'),
      ]);

      const firstError = pemasukanRes.error || pengeluaranRes.error || produkRes.error;
      if (firstError) {
        setError(firstError.message);
      }

      setPemasukan(pemasukanRes.data ?? []);
      setPengeluaran(pengeluaranRes.data ?? []);

      const map = {};
      (produkRes.data ?? []).forEach((p) => {
        map[p.id_produk] = p.nama_produk;
      });
      setProdukMap(map);

      setLoading(false);
    }
    loadData();
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const totalPemasukanHariIni = useMemo(
    () => pemasukan.filter((row) => toDateKey(row.tanggal) === today).reduce((sum, row) => sum + Number(row.jumlah || 0), 0),
    [pemasukan, today]
  );

  const totalPengeluaranHariIni = useMemo(
    () => pengeluaran.filter((row) => toDateKey(row.tanggal) === today).reduce((sum, row) => sum + Number(row.nominal || 0), 0),
    [pengeluaran, today]
  );

  const transaksiHariIni = useMemo(
    () => pemasukan.filter((row) => toDateKey(row.tanggal) === today).length,
    [pemasukan, today]
  );

  const produkTerjualHariIni = useMemo(
    () => new Set(pemasukan.filter((row) => toDateKey(row.tanggal) === today).map((row) => row.id_produk)).size,
    [pemasukan, today]
  );

  const saldoBersihHariIni = totalPemasukanHariIni - totalPengeluaranHariIni;

  // Pemasukan vs pengeluaran, 7 hari terakhir
  const lineData = useMemo(() => {
    const keys = last7DateKeys();
    return keys.map((key) => {
      const income = pemasukan
        .filter((row) => toDateKey(row.tanggal) === key)
        .reduce((sum, row) => sum + Number(row.jumlah || 0), 0);
      const expense = pengeluaran
        .filter((row) => toDateKey(row.tanggal) === key)
        .reduce((sum, row) => sum + Number(row.nominal || 0), 0);
      return { name: dayLabel(key), pemasukan: income, pengeluaran: expense };
    });
  }, [pemasukan, pengeluaran]);

  // Pemasukan vs pengeluaran per bulan, 6 bulan terakhir
  const barData = useMemo(() => {
    const keys = last6MonthKeys();
    return keys.map((key) => {
      const income = pemasukan
        .filter((row) => toDateKey(row.tanggal)?.slice(0, 7) === key)
        .reduce((sum, row) => sum + Number(row.jumlah || 0), 0);
      const expense = pengeluaran
        .filter((row) => toDateKey(row.tanggal)?.slice(0, 7) === key)
        .reduce((sum, row) => sum + Number(row.nominal || 0), 0);
      return { bulan: monthLabel(key), pemasukan: income, pengeluaran: expense };
    });
  }, [pemasukan, pengeluaran]);

  // Produk terlaris berdasarkan total pemasukan per produk
  const pieData = useMemo(() => {
    const totals = {};
    pemasukan.forEach((row) => {
      const key = row.id_produk ?? 'Lainnya';
      totals[key] = (totals[key] || 0) + Number(row.jumlah || 0);
    });
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5).map(([id, value]) => ({
      name: produkMap[id] || id,
      value,
    }));
    const rest = sorted.slice(5).reduce((sum, [, value]) => sum + value, 0);
    if (rest > 0) top.push({ name: 'Lainnya', value: rest });
    return top;
  }, [pemasukan, produkMap]);

  // Riwayat gabungan pemasukan & pengeluaran, terbaru dulu
  const riwayat = useMemo(() => {
    const income = pemasukan.map((row) => ({
      id: `in-${row.id_pemasukan}`,
      tanggal: row.tanggal,
      title: produkMap[row.id_produk] ? `Penjualan ${produkMap[row.id_produk]}` : (row.keterangan || 'Pemasukan'),
      desc: `+ Rp ${formatRupiah(row.jumlah)}`,
      type: 'income',
    }));
    const expense = pengeluaran.map((row) => ({
      id: `out-${row.id_pengeluaran}`,
      tanggal: row.tanggal,
      title: row.keterangan || row.kategori || 'Pengeluaran',
      desc: `- Rp ${formatRupiah(row.nominal)}`,
      type: 'expense',
    }));
    return [...income, ...expense]
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, 8);
  }, [pemasukan, pengeluaran, produkMap]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8 overflow-y-auto">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Gagal memuat sebagian data: {error}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">

          {/* KIRI: Ringkasan & Grafik */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* Ringkasan Hari Ini */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Ringkasan Hari Ini</h2>
                  <p className="text-gray-400 text-sm">Pemasukan &amp; pengeluaran terbaru</p>
                </div>
                <button className="border border-gray-200 px-4 py-1.5 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                  <FileText size={16} className="text-gray-400" /> Export
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MiniCard icon={<DollarSign />} label="Pemasukan Hari Ini" val={`Rp ${formatRupiah(totalPemasukanHariIni)}`} color="bg-green-50" iconColor="text-green-500" />
                <MiniCard icon={<TrendingDown />} label="Pengeluaran Hari Ini" val={`Rp ${formatRupiah(totalPengeluaranHariIni)}`} color="bg-pink-50" iconColor="text-pink-500" />
                <MiniCard icon={<Wallet />} label="Saldo Bersih Hari Ini" val={`Rp ${formatRupiah(saldoBersihHariIni)}`} color="bg-purple-50" iconColor="text-purple-500" />
                <MiniCard icon={<ShoppingCart />} label="Transaksi Hari Ini" val={String(transaksiHariIni)} color="bg-orange-50" iconColor="text-orange-500" />
              </div>
            </div>

            {/* Grafik */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-center font-bold mb-4 text-gray-700">Pemasukan vs Pengeluaran (7 Hari Terakhir)</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                        <YAxis fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(value) => `Rp ${formatRupiah(value)}`} />
                        <Legend />
                        <Line type="monotone" dataKey="pemasukan" name="Pemasukan" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#22c55e' }} />
                        <Line type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#fb7185" strokeWidth={3} dot={{ r: 4, fill: '#fb7185' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-center font-bold mb-4 text-gray-700">Pemasukan vs Pengeluaran per Bulan</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="bulan" fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => `Rp ${formatRupiah(value)}`} />
                        <Legend />
                        <Bar dataKey="pemasukan" name="Pemasukan" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={16} />
                        <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#fb7185" radius={[6, 6, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: Produk Terlaris & Riwayat */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Produk Terlaris */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Package size={18} className="text-gray-400" /> Produk Terlaris
              </h2>
              {pieData.length === 0 ? (
                <p className="text-sm text-gray-400 py-10">Belum ada data pemasukan.</p>
              ) : (
                <div className="h-56 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `Rp ${formatRupiah(value)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Riwayat Pemasukan & Pengeluaran */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs mb-1">Riwayat</p>
              <h2 className="font-bold text-gray-800 mb-4">Log Mutasi Keuangan</h2>
              {loading ? (
                <p className="text-sm text-gray-400">Memuat riwayat...</p>
              ) : riwayat.length === 0 ? (
                <p className="text-sm text-gray-400">Belum ada transaksi.</p>
              ) : (
                <div className="space-y-4">
                  {riwayat.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                        <p className={`text-xs font-semibold ${item.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                        {toDateKey(item.tanggal)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const MiniCard = ({ icon, label, val, color, iconColor }) => (
  <div className={`${color} p-5 rounded-2xl relative overflow-hidden transition-transform hover:scale-105 cursor-default`}>
    <div className={`mb-3 p-2 w-fit rounded-lg bg-white/50 ${iconColor}`}>{icon}</div>
    <h3 className="text-xl font-bold text-gray-800">{val}</h3>
    <p className="text-xs font-bold text-gray-600">{label}</p>
  </div>
);

export default Dashboard;