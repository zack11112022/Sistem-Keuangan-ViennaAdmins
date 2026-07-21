import React, { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase.js';

const KATEGORI_OPTIONS = ['Operasional', 'Non Operasional'];

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID').format(value || 0);
}

export default function Pengeluaran() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [message, setMessage] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({ nominal: '', kategori: KATEGORI_OPTIONS[0], keterangan: '' });
  const [saving, setSaving] = useState(false);

  async function loadPengeluaran() {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('pengeluaran')
      .select('*')
      .order('tanggal', { ascending: false });

    if (error) {
      setFetchError(error.message);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPengeluaran();
  }, []);

  function handleToggleForm() {
    setMessage('');
    setFetchError(null);
    setIsFormOpen((current) => !current);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFetchError(null);
    setMessage('');
    setSaving(true);

    const idUser = localStorage.getItem('id_user');
    const payload = {
      tanggal: new Date().toISOString().slice(0, 10),
      nominal: Number(form.nominal) || 0,
      kategori: form.kategori,
      keterangan: form.keterangan,
      id_user: idUser ? Number(idUser) : null,
    };

    const { data, error } = await supabase
      .from('pengeluaran')
      .insert([payload])
      .select();

    setSaving(false);

    if (error) {
      setFetchError(error.message);
      return;
    }

    const insertedRows = data ?? [payload];
    setRows((current) => [...insertedRows, ...current]);
    setForm({ nominal: '', kategori: KATEGORI_OPTIONS[0], keterangan: '' });
    setIsFormOpen(false);
    setMessage('Pengeluaran berhasil dicatat.');
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="border-4 border-[#bff0f6] rounded-xl p-3">
          <div className="p-6 bg-white rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Pengeluaran</h1>
                <p className="text-sm text-gray-500 mt-1">Catat pengeluaran operasional maupun non operasional cafe.</p>
              </div>
              <button
                onClick={handleToggleForm}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <span className="inline-block">+</span>
                Tambah Pengeluaran
              </button>
            </div>

            {fetchError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {fetchError}
              </div>
            )}
            {message && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {isFormOpen && (
              <div className="mb-6 border border-gray-200 rounded-xl bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Form Tambah Pengeluaran</h2>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Nominal (Rp)
                    <input
                      required
                      type="number"
                      name="nominal"
                      value={form.nominal}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="100000"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Kategori
                    <select
                      name="kategori"
                      value={form.kategori}
                      onChange={handleChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                      {KATEGORI_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700 sm:col-span-2">
                    Keterangan
                    <textarea
                      name="keterangan"
                      value={form.keterangan}
                      onChange={handleChange}
                      rows={3}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Contoh: Beli bahan baku kue"
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
                      disabled={saving}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Menyimpan...' : 'Simpan Pengeluaran'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-800 font-bold text-sm border-b border-gray-200">
                    <th className="pb-4 w-[15%]">Tanggal</th>
                    <th className="pb-4 w-[20%]">Kategori</th>
                    <th className="pb-4 w-[15%]">Nominal (Rp)</th>
                    <th className="pb-4 w-[50%]">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-gray-900">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-gray-500">Memuat data...</td>
                    </tr>
                  ) : rows.length > 0 ? (
                    rows.map((row) => (
                      <tr key={row.id_pengeluaran} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-gray-700 align-top">{String(row.tanggal).slice(0, 10)}</td>
                        <td className="py-4 text-gray-700 align-top">{row.kategori}</td>
                        <td className="py-4 font-semibold align-top text-red-600">{formatRupiah(row.nominal)}</td>
                        <td className="py-4 text-gray-700 align-top">{row.keterangan}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-gray-500">Belum ada pengeluaran tercatat.</td>
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