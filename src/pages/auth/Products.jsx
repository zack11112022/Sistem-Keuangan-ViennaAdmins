import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from 'src/lib/supabase.js';

const productData = [
  { id_produk: 'P001', nama_produk: 'Croissant Butter', kategori: 'Kue', harga_jual: 25000 },
  { id_produk: 'P002', nama_produk: 'Tiramisu Slice', kategori: 'Kue', harga_jual: 38000 },
  { id_produk: 'P003', nama_produk: 'Chocolate Eclair', kategori: 'Kue', harga_jual: 28000 },
  { id_produk: 'P004', nama_produk: 'Macaron Mix', kategori: 'Kue', harga_jual: 65000 },
  { id_produk: 'P005', nama_produk: 'Almond Croissant', kategori: 'Kue', harga_jual: 30000 },
  { id_produk: 'P006', nama_produk: 'Lemon Tart', kategori: 'Minuman', harga_jual: 32000 },
  { id_produk: 'M001', nama_produk: 'Nasi Goreng Viena', kategori: 'Makanan', harga_jual: 55000 },
  { id_produk: 'M002', nama_produk: 'Spicy Ramen', kategori: 'Makanan', harga_jual: 68000 },
  { id_produk: 'D001', nama_produk: 'Americano (Hot/Ice)', kategori: 'Minuman', harga_jual: 35000 },
  { id_produk: 'D002', nama_produk: 'Cafe Latte (Hot/Ice)', kategori: 'Minuman', harga_jual: 42000 },
  { id_produk: 'D003', nama_produk: 'Matcha Green Tea Latte', kategori: 'Minuman', harga_jual: 48000 },
];

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search')?.toLowerCase().trim() || '';
  const [products, setProducts] = useState(productData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ id_produk: '', nama_produk: '', kategori: '', harga_jual: '' });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase.from('produk').select('*');
      if (error) {
        setFetchError(error.message);
        setProducts(productData);
      } else {
        setProducts(data ?? productData);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = query.length > 0
    ? products.filter((product) =>
        product.nama_produk.toLowerCase().includes(query)
        || product.kategori.toLowerCase().includes(query)
        || product.id_produk.toLowerCase().includes(query)
      )
    : products;

  function handleToggleForm() {
    setIsFormOpen((current) => !current);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewProduct((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFetchError(null);
    setMessage('');

    const { data, error } = await supabase
      .from('produk')
      .insert([newProduct])
      .select();

    if (error) {
      setFetchError(error.message);
      return;
    }

    const insertedRows = data ?? [newProduct];
    setProducts((current) => [...current, ...insertedRows]);
    setNewProduct({ id: '', name: '', category: '', price: '' });
    setIsFormOpen(false);
    setMessage('Produk berhasil disimpan.');
  }

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
              <button
                onClick={handleToggleForm}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <span className="inline-block">+</span>
                Tambah
              </button>
            </div>

            {isFormOpen && (
              <div className="mb-6 border border-gray-200 rounded-xl bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Form Tambah Produk</h2>
                {fetchError && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Gagal menyimpan produk: {fetchError}
                  </div>
                )}
                {message && (
                  <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    ID Produk
                    <input
                      required
                      name="id_produk"
                      value={newProduct.id_produk}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="P007"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Nama Produk
                    <input
                      required
                      name="nama_produk"
                      value={newProduct.nama_produk}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Latte Matcha"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Kategori
                    <input
                      required
                      name="kategori"
                      value={newProduct.kategori}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Minuman"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Harga (Rp)
                    <input
                      required
                      name="harga_jual"
                      value={newProduct.harga_jual}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="40.000"
                    />
                  </label>
                  <div className="sm:col-span-2 flex flex-wrap gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleToggleForm}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
                    >
                      Simpan Produk
                    </button>
                  </div>
                </form>
              </div>
            )}

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
                      <tr key={product.id_produk} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-gray-700 align-top">{product.id_produk}</td>
                        <td className="py-4 font-semibold align-top">{product.nama_produk}</td>
                        <td className="py-4 text-gray-700 align-top">{product.kategori}</td>
                        <td className="py-4 font-semibold align-top">{product.harga_jual}</td>
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