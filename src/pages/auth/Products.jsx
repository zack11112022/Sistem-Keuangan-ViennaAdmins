import React from 'react';
import { useLocation } from 'react-router-dom';

const productData = [
  { id: 'P001', name: 'Croissant Butter', category: 'Kue', price: '25.000' },
  { id: 'P002', name: 'Tiramisu Slice', category: 'Kue', price: '38.000' },
  { id: 'P003', name: 'Chocolate Eclair', category: 'Kue', price: '28.000' },
  { id: 'P004', name: 'Macaron Mix', category: 'Kue', price: '65.000' },
  { id: 'P005', name: 'Almond Croissant', category: 'Kue', price: '30.000' },
  { id: 'P006', name: 'Lemon Tart', category: 'Minuman', price: '32.000' },
  { id: 'M001', name: 'Nasi Goreng Viena', category: 'Makanan', price: '55.000' },
  { id: 'M002', name: 'Spicy Ramen', category: 'Makanan', price: '68.000' },
  { id: 'D001', name: 'Americano (Hot/Ice)', category: 'Minuman', price: '35.000' },
  { id: 'D002', name: 'Cafe Latte (Hot/Ice)', category: 'Minuman', price: '42.000' },
  { id: 'D003', name: 'Matcha Green Tea Latte', category: 'Minuman', price: '48.000' },
];

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search')?.toLowerCase().trim() || '';
  const filteredProducts = query.length > 0
    ? productData.filter((product) =>
        product.name.toLowerCase().includes(query)
        || product.category.toLowerCase().includes(query)
        || product.id.toLowerCase().includes(query)
      )
    : productData;

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="border-4 border-[#bff0f6] rounded-xl p-3">
          <div className="p-6 bg-white rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Manajemen Produk Cafe</h1>
                {query && (
                  <p className="text-sm text-gray-500 mt-1">
                    Menampilkan hasil pencarian untuk <span className="font-semibold text-gray-700">"{query}"</span>
                  </p>
                )}
              </div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                <span className="inline-block">+</span>
                Tambah
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-800 font-bold text-sm border-b border-gray-200">
                    <th className="pb-4 w-[10%]">ID</th>
                    <th className="pb-4 w-[40%]">Nama Produk</th>
                    <th className="pb-4 w-[20%]">Kategori</th>
                    <th className="pb-4 w-[15%]">Harga (Rp)</th>
                    <th className="pb-4 w-[15%] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-gray-900">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-gray-700 align-top">{product.id}</td>
                        <td className="py-4 font-semibold align-top">{product.name}</td>
                        <td className="py-4 text-gray-700 align-top">{product.category}</td>
                        <td className="py-4 font-semibold align-top">{product.price}</td>
                        <td className="py-4 flex items-center gap-4 text-gray-600 justify-end">
                          <button className="hover:text-blue-600 transition-colors" title="Edit">Edit</button>
                          <button className="hover:text-red-600 transition-colors" title="Hapus">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-500">
                        Produk dengan kata kunci "{query}" tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}