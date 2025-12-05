import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { Car } from 'lucide-react'

function Login({ setUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true)

    try {
      console.log('🔄 Sending login request...', formData)
      const response = await login(formData)
      console.log('✅ Login response:', response.data)

      const { token, user } = response.data.data
      console.log('📦 Token:', token)
      console.log('👤 User:', user)

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)

      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Login error:', err)
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Car size={48} className="text-blue-600" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold text-gray-800">
            Car<span className="text-blue-600">Market</span>
          </h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Masuk ke Akun Anda
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Temukan mobil impian Anda
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg text-base font-semibold mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun? {' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login