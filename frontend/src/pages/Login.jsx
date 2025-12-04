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
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <Car size={48} color="#0066cc" strokeWidth={2.5} />
          <h1 style={styles.logoText}>Car<span style={{color: '#0066cc'}}>Market</span></h1>
        </div>
        
        <h2 style={styles.title}>Masuk ke Akun Anda</h2>
        <p style={styles.subtitle}>Temukan mobil impian Anda</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>

        <p style={styles.footer}>
          Belum punya akun? <Link to="/register" style={styles.link}>Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '440px'
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
  },
  logoText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    textAlign: 'center',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '32px'
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    border: '1px solid #fee2e2'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '12px 16px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    outline: 'none'
  },
  button: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'background-color 0.2s',
    border: 'none',
    cursor: 'pointer'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#6b7280'
  },
  link: {
    color: '#0066cc',
    fontWeight: '600',
    textDecoration: 'none'
  }
}

export default Login