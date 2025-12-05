/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'
import { Car } from 'lucide-react'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone_number: '',
    age: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...dataToSend } = formData
      await register(dataToSend)
      alert('Registrasi berhasil! Silakan login.')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Car size={48} className="text-blue-600" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold text-gray-800">
            Car<span className="text-blue-600">Market</span>
          </h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Buat Akun Baru
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Bergabung dan temukan mobil impian Anda
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="john@email.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Min. 6 karakter"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Ulangi password"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Alamat</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="Jakarta Selatan"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">No. Telepon</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="08123456789"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Umur</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="25"
                min="17"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg text-base font-semibold mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun? {' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register