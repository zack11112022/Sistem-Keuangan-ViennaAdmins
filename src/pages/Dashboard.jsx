import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { FileText, ShoppingCart, DollarSign, Package, Users, Star } from 'lucide-react';

// Data untuk Grafik
const lineData = [
  { name: 'Mon', value: 200 }, { name: 'Tue', value: 350 }, { name: 'Wed', value: 280 },
  { name: 'Thu', value: 100 }, { name: 'Fri', value: 250 }, { name: 'Sat', value: 260 }, { name: 'Sun', value: 220 },
];

const barData = [
  { year: '2012', target: 80, insights: 40 },
  { year: '2013', target: 50, insights: 60 },
  { year: '2014', target: 70, insights: 55 },
  { year: '2015', target: 75, insights: 20 },
  { year: '2016', target: 40, insights: 85 },
];

const pieData = [
  { name: 'A', value: 400 }, { name: 'B', value: 300 },
  { name: 'C', value: 300 }, { name: 'D', value: 200 },
];
const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const mutationLog = [
  { id: 1, title: 'Bayar bahan', desc: 'Rp. -100.000,00', type: 'expense' },
  { id: 2, title: 'Pemasukan Hari ini', desc: 'Rp. 250.00,00', type: 'income' },
  { id: 3, title: 'Menu Label', desc: 'Menu description.', type: 'neutral' },
  { id: 4, title: 'Menu Label', desc: 'Menu description.', type: 'neutral' },
  { id: 5, title: 'Menu Label', desc: 'Menu description.', type: 'neutral' },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* --- MAIN CONTENT (Sidebar sudah dihapus) --- */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-12 gap-6">
          
          {/* KIRI: Sales Summary & Charts */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Today's Sales */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Today's Sales</h2>
                  <p className="text-gray-400 text-sm">Sales Summery</p>
                </div>
                <button className="border border-gray-200 px-4 py-1.5 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                  <FileText size={16} className="text-gray-400"/> Export
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MiniCard icon={<DollarSign/>} label="Total Sales" val="$1K" rate="+8%" color="bg-pink-50" iconColor="text-pink-500" />
                <MiniCard icon={<ShoppingCart/>} label="Total Order" val="300" rate="+8%" color="bg-orange-50" iconColor="text-orange-500" />
                <MiniCard icon={<Package/>} label="Product Sold" val="5" rate="+1.2%" color="bg-green-50" iconColor="text-green-500" />
                <MiniCard icon={<Users/>} label="New Customers" val="8" rate="0.5%" color="bg-purple-50" iconColor="text-purple-500" />
              </div>
            </div>

            {/* Combined Charts Box */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-center font-bold mb-4 text-gray-700">Customer Satisfaction</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                        <YAxis fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-center font-bold mb-4 text-gray-700">Target VS Insights</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="year" fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="target" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={25} />
                        <Bar dataKey="insights" fill="#fb7185" radius={[6, 6, 0, 0]} barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: Top Seller & Log Mutasi */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Top Seller */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
              <h2 className="font-bold text-gray-800 mb-4">Top Seller</h2>
              <div className="h-56 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Log Mutasi Keuangan */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs mb-1">Heading</p>
              <h2 className="font-bold text-gray-800 mb-4">Log Mutasi Keuangan</h2>
              <div className="space-y-5">
                {mutationLog.map((item) => (
                  <div key={item.id} className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <Star size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                        <p className={`text-xs font-semibold ${
                          item.type === 'expense' ? 'text-red-500' : 
                          item.type === 'income' ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">
                       <span className="mr-1">↑</span> A
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const MiniCard = ({ icon, label, val, rate, color, iconColor }) => (
  <div className={`${color} p-5 rounded-2xl relative overflow-hidden transition-transform hover:scale-105 cursor-default`}>
    <div className={`mb-3 p-2 w-fit rounded-lg bg-white/50 ${iconColor}`}>{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800">{val}</h3>
    <p className="text-xs font-bold text-gray-600">{label}</p>
    <p className="text-[10px] text-gray-400 mt-1">{rate} From Yesterday</p>
  </div>
);

export default Dashboard;
//import PageHeader from "../components/PageHeader"

//export default function Dashboard() {
 // return (
  //  <div>
   //   <PageHeader title="Dashboard" />

    //  <div className="grid grid-cols-3 gap-4">
     //   <div className="bg-white p-5 rounded-xl shadow">
      //    <h2 className="text-gray-500">Total Users</h2>
      //    <p className="text-2xl font-bold">120</p>
      //  </div>

     //   <div className="bg-white p-5 rounded-xl shadow">
       //   <h2 className="text-gray-500">Revenue</h2>
      //    <p className="text-2xl font-bold">Rp 5.000.000</p>
      //  </div>

      //  <div className="bg-white p-5 rounded-xl shadow">
      //    <h2 className="text-gray-500">Orders</h2>
      //    <p className="text-2xl font-bold">80</p>
      //  </div>
    //  </div>
   // </div>
 // )
//}