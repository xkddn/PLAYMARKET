import api from './api'

const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  getToken() {
    return localStorage.getItem('token')
  },

  isAuthenticated() {
    return !!this.getToken()
  }
}

export default authService
