import React, { useEffect, useMemo, useState } from 'react';
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

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID').format(value || 0);
}

// Halaman khusus akun karyawan (kasir).
// Tugasnya cuma satu: pilih produk yang terjual, lalu catat ke tabel `pemasukan`.
export default function Kasir() {
  const [products, setProducts] = useState(productData);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [cart, setCart] = useState([]); // [{ id_produk, nama_produk, kategori, harga_jual, qty }]
  const [idUser, setIdUser] = useState(() => localStorage.getItem('id_user') || '');
  const [saving, setSaving] = useState(false);
  const [cartError, setCartError] = useState(null);
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

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.harga_jual * item.qty, 0),
    [cart]
  );

  function handleAddToCart(product) {
    setCartError(null);
    setMessage('');
    setCart((current) => {
      const existing = current.find((item) => item.id_produk === product.id_produk);
      if (existing) {
        return current.map((item) =>
          item.id_produk === product.id_produk ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
  }

  function handleDecrement(id_produk) {
    setCart((current) =>
      current
        .map((item) => (item.id_produk === id_produk ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  }

  function handleRemoveFromCart(id_produk) {
    setCart((current) => current.filter((item) => item.id_produk !== id_produk));
  }

  function handleResetCart() {
    setCart([]);
    setCartError(null);
    setMessage('');
  }

  function handleIdUserChange(event) {
    setIdUser(event.target.value);
  }

  async function handleMasuk() {
    setCartError(null);
    setMessage('');

    if (cart.length === 0) {
      setCartError('Belum ada produk yang dipilih.');
      return;
    }
    if (!idUser) {
      setCartError('ID User belum diisi.');
      return;
    }

    setSaving(true);

    const tanggal = new Date().toISOString().slice(0, 10);
    const rows = cart.map((item) => ({
      tanggal,
      jumlah: item.harga_jual * item.qty,
      kategori: item.kategori,
      keterangan: `Penjualan ${item.nama_produk} x${item.qty}`,
      id_produk: item.id_produk,
      id_user: Number(idUser),
    }));

    const { error } = await supabase.from('pemasukan').insert(rows);

    setSaving(false);

    if (error) {
      setCartError(error.message);
      return;
    }

    localStorage.setItem('id_user', idUser);
    setCart([]);
    setMessage('Transaksi berhasil dicatat ke pemasukan.');
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="border-4 border-[#bff0f6] rounded-xl p-3">
          <div className="p-6 bg-white rounded-xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Input Pemasukan (Kasir)</h1>
              <p className="text-sm text-gray-500 mt-1">
                Pilih produk yang terjual, lalu tekan <span className="font-semibold">Masuk</span> untuk mencatat ke pemasukan.
              </p>
            </div>

            {fetchError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Gagal memuat produk dari database: {fetchError}. Menampilkan data cadangan.
              </div>
            )}
            {cartError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {cartError}
              </div>
            )}
            {message && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* Tombol-tombol produk */}
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Daftar Produk</h2>
            {loading ? (
              <p className="text-sm text-gray-400 mb-6">Memuat produk...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {products.map((product) => (
                  <button
                    key={product.id_produk}
                    onClick={() => handleAddToCart(product)}
                    className="flex flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-left hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-800">{product.nama_produk}</span>
                    <span className="text-xs text-gray-500 mt-1">{product.kategori}</span>
                    <span className="text-sm font-medium text-blue-600 mt-2">Rp {formatRupiah(product.harga_jual)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* List pembayaran (akumulasi) */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">List Pembayaran</h3>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-400 mb-4">Belum ada produk dipilih. Klik salah satu produk di atas.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.id_produk}
                      className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.nama_produk}</p>
                        <p className="text-xs text-gray-500">
                          Rp {formatRupiah(item.harga_jual)} x {item.qty} = Rp {formatRupiah(item.harga_jual * item.qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrement(item.id_produk)}
                          className="h-7 w-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                          aria-label={`Kurangi ${item.nama_produk}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-gray-800">{item.qty}</span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="h-7 w-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                          aria-label={`Tambah ${item.nama_produk}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id_produk)}
                          className="ml-2 text-xs text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-gray-200 pt-3 mb-4">
                <span>Total</span>
                <span>Rp {formatRupiah(cartTotal)}</span>
              </div>

              <label className="flex flex-col text-sm font-medium text-gray-700 mb-4 max-w-xs">
                ID User
                <input
                  type="number"
                  value={idUser}
                  onChange={handleIdUserChange}
                  className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                  placeholder="Contoh: 1"
                />
              </label>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleResetCart}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleMasuk}
                  disabled={saving}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
                >
                  {saving ? 'Menyimpan...' : 'Masuk'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}