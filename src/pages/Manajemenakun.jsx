import React, { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase.js';

const ROLE_OPTIONS = ['Pemilik', 'Karyawan'];

export default function ManajemenAkun() {
  const [akun, setAkun] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [message, setMessage] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAkun, setNewAkun] = useState({ email: '', password: '', nama_lengkap: '', role: 'Karyawan' });

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ email: '', nama_lengkap: '', role: 'Karyawan', password: '' });
  const [rowBusyId, setRowBusyId] = useState(null);

  async function loadAkun() {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('akun')
      .select('id_user, email, nama_lengkap, role')
      .order('id_user', { ascending: true });

    if (error) {
      setFetchError(error.message);
    } else {
      setAkun(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAkun();
  }, []);

  function handleToggleForm() {
    setMessage('');
    setFetchError(null);
    setIsFormOpen((current) => !current);
  }

  function handleNewChange(event) {
    const { name, value } = event.target;
    setNewAkun((current) => ({ ...current, [name]: value }));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setFetchError(null);
    setMessage('');

    const { data, error } = await supabase
      .from('akun')
      .insert([newAkun])
      .select('id_user, email, nama_lengkap, role');

    if (error) {
      setFetchError(error.message);
      return;
    }

    setAkun((current) => [...current, ...(data ?? [])]);
    setNewAkun({ email: '', password: '', nama_lengkap: '', role: 'Karyawan' });
    setIsFormOpen(false);
    setMessage('Akun karyawan berhasil dibuat.');
  }

  function handleStartEdit(row) {
    setMessage('');
    setFetchError(null);
    setEditingId(row.id_user);
    setEditValues({ email: row.email, nama_lengkap: row.nama_lengkap, role: row.role, password: '' });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditValues((current) => ({ ...current, [name]: value }));
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(id_user) {
    setFetchError(null);
    setMessage('');
    setRowBusyId(id_user);

    const payload = {
      email: editValues.email,
      nama_lengkap: editValues.nama_lengkap,
      role: editValues.role,
    };
    // Password hanya diikutkan kalau diisi (kosong = tidak diubah)
    if (editValues.password) {
      payload.password = editValues.password;
    }

    const { data, error } = await supabase
      .from('akun')
      .update(payload)
      .eq('id_user', id_user)
      .select('id_user, email, nama_lengkap, role');

    setRowBusyId(null);

    if (error) {
      setFetchError(error.message);
      return;
    }

    const updatedRow = data && data[0] ? data[0] : { id_user, ...payload };
    setAkun((current) => current.map((row) => (row.id_user === id_user ? updatedRow : row)));
    setEditingId(null);
    setMessage('Akun berhasil diperbarui.');
  }

  async function handleDelete(id_user, email) {
    const confirmed = window.confirm(`Hapus akun "${email}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!confirmed) return;

    setFetchError(null);
    setMessage('');
    setRowBusyId(id_user);

    const { error } = await supabase.from('akun').delete().eq('id_user', id_user);

    setRowBusyId(null);

    if (error) {
      setFetchError(error.message);
      return;
    }

    setAkun((current) => current.filter((row) => row.id_user !== id_user));
    setMessage('Akun berhasil dihapus.');
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="border-4 border-[#bff0f6] rounded-xl p-3">
          <div className="p-6 bg-white rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Manajemen Akun Karyawan</h1>
                <p className="text-sm text-gray-500 mt-1">Buat, ubah, atau hapus akun untuk staf kasir.</p>
              </div>
              <button
                onClick={handleToggleForm}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <span className="inline-block">+</span>
                Tambah Akun
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
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Form Tambah Akun</h2>
                <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Nama Lengkap
                    <input
                      required
                      name="nama_lengkap"
                      value={newAkun.nama_lengkap}
                      onChange={handleNewChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Budi Santoso"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      value={newAkun.email}
                      onChange={handleNewChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="budi@cafe.com"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Password
                    <input
                      required
                      type="text"
                      name="password"
                      value={newAkun.password}
                      onChange={handleNewChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Password awal"
                    />
                  </label>
                  <label className="flex flex-col text-sm font-medium text-gray-700">
                    Role
                    <select
                      name="role"
                      value={newAkun.role}
                      onChange={handleNewChange}
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
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
                      Simpan Akun
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-800 font-bold text-sm border-b border-gray-200">
                    <th className="pb-4 w-[30%]">Nama Lengkap</th>
                    <th className="pb-4 w-[30%]">Email</th>
                    <th className="pb-4 w-[15%]">Role</th>
                    <th className="pb-4 w-[25%] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-gray-900">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-gray-500">Memuat akun...</td>
                    </tr>
                  ) : akun.length > 0 ? (
                    akun.map((row) => {
                      const isEditing = editingId === row.id_user;
                      const isBusy = rowBusyId === row.id_user;
                      return (
                        <tr key={row.id_user} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 align-top">
                            {isEditing ? (
                              <input
                                name="nama_lengkap"
                                value={editValues.nama_lengkap}
                                onChange={handleEditChange}
                                className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm"
                              />
                            ) : (
                              row.nama_lengkap
                            )}
                          </td>
                          <td className="py-4 text-gray-700 align-top">
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={editValues.email}
                                onChange={handleEditChange}
                                className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm"
                              />
                            ) : (
                              row.email
                            )}
                          </td>
                          <td className="py-4 text-gray-700 align-top">
                            {isEditing ? (
                              <select
                                name="role"
                                value={editValues.role}
                                onChange={handleEditChange}
                                className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm"
                              >
                                {ROLE_OPTIONS.map((role) => (
                                  <option key={role} value={role}>{role}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="capitalize">{row.role}</span>
                            )}
                          </td>
                          <td className="py-4 align-top">
                            {isEditing ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  name="password"
                                  value={editValues.password}
                                  onChange={handleEditChange}
                                  placeholder="Password baru (opsional)"
                                  className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm"
                                />
                                <div className="flex items-center gap-3 justify-end text-gray-600">
                                  <button
                                    onClick={() => handleSaveEdit(row.id_user)}
                                    disabled={isBusy}
                                    className="text-green-600 hover:text-green-700 disabled:opacity-60"
                                  >
                                    Simpan
                                  </button>
                                  <button onClick={handleCancelEdit} disabled={isBusy} className="text-gray-500 hover:text-gray-700">
                                    Batal
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 justify-end text-gray-600">
                                <button onClick={() => handleStartEdit(row)} className="hover:text-blue-600 transition-colors">
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(row.id_user, row.email)}
                                  disabled={isBusy}
                                  className="hover:text-red-600 transition-colors disabled:opacity-60"
                                >
                                  {isBusy ? '...' : 'Hapus'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-gray-500">Belum ada akun.</td>
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