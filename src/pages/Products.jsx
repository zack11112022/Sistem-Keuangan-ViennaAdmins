import React from 'react';

const Products = () => {
  // Mock data sesuai dengan image_91ece2.png
  const productData = [
    { id: 'P001', name: 'Croissant Butter', category: 'Kue', price: '25.000' },
    { id: 'P002', name: 'Tiramisu Slice', category: 'Kue', price: '38.000' },
    { id: 'P003', name: 'Chocolate Eclair', category: 'Kue', price: '28.000' },
    { id: 'P004', name: 'Macaron Mix', category: 'Kue', price: '65.000' },
    { id: 'P005', name: 'Almond Croissant', category: 'Kue', price: '30.000' },
    { id: 'P006', name: 'Lemon Tart', category: 'Minuman', price: '32.000' }, // Sesuai gambar kategori tertulis Minuman
    { id: 'M001', name: 'Nasi Goreng Viena', category: 'Makanan', price: '55.000' },
    { id: 'M002', name: 'Spicy Ramen', category: 'Makanan', price: '68.000' },
    { id: 'D001', name: 'Americano (Hot/Ice)', category: 'Minuman', price: '35.000' },
    { id: 'D002', name: 'Cafe Latte (Hot/Ice)', category: 'Minuman', price: '42.000' },
    { id: 'D003', name: 'Matcha Green Tea Latte', category: 'Minuman', price: '48.000' },
  ];

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm min-h-[calc(100vh-120px)]">
      {/* Bagian Header Tabel */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Manajemen Produk Cafe</h1>
        <button className="flex items-center gap-2 bg-[#74b9ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
          {/* Icon Tambah (Upload/Plus style dari gambar) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah
        </button>
      </div>

      {/* Bagian Tabel Produk */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-800 font-bold text-sm border-b border-gray-100">
              <th className="pb-4 w-[10%]">ID</th>
              <th className="pb-4 w-[30%]">Nama Produk</th>
              <th className="pb-4 w-[20%]">Kategori</th>
              <th className="pb-4 w-[20%]">Harga (Rp)</th>
              <th className="pb-4 w-[20%]">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-900">
            {productData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-gray-700">{product.id}</td>
                <td className="py-4 font-semibold">{product.name}</td>
                <td className="py-4 text-gray-700">{product.category}</td>
                <td className="py-4 font-semibold">{product.price}</td>
                <td className="py-4 flex items-center gap-4 text-gray-600">
                  {/* Tombol Edit (Pensil) */}
                  <button className="hover:text-blue-600 transition-colors" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  {/* Tombol Hapus (Tempat Sampah) */}
                  <button className="hover:text-red-600 transition-colors" title="Hapus">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;