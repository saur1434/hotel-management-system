import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  userType: null, // 'customer' or 'owner'
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,

  setUser: (user, userType) => {
    set({ user, userType, isAuthenticated: !!user })
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user))
      localStorage.setItem('userType', userType)
    }
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    set({ user: null, userType: null, isAuthenticated: false })
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('userType')
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    const userType = localStorage.getItem('userType')

    if (token && userData) {
      set({
        user: JSON.parse(userData),
        userType,
        isAuthenticated: true,
      })
    }
  },
}))
