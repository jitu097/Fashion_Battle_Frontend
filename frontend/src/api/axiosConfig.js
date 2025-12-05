// Mock API for frontend-only operation (no backend needed)
// All data is stored in localStorage

const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

const API = {
  post: async (endpoint, data, config) => {
    await mockDelay();
    
    // Mock login - accepts any credentials
    if (endpoint === '/auth/login') {
      // Create a mock user with the provided phone number
      const mockUser = {
        id: Date.now().toString(),
        phone: data.phone,
        password: data.password,
        username: 'User' + data.phone.slice(-4),
        name: 'Guest User',
        email: '',
        gender: 'other',
        role: 'seller',
        bio: 'Welcome to Fashion Battle!',
        profilePic: 'https://i.pravatar.cc/150?img=' + (Math.floor(Math.random() * 70) + 1),
        profileComplete: false,
        posts: 0,
        followers: 0,
        following: 0
      };
      
      const token = 'mock-token-' + Date.now();
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      return { data: { token, user: mockUser } };
    }
    
    // Mock signup
    if (endpoint === '/auth/signup') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const formData = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
      
      if (users.find(u => u.phone === formData.phone)) {
        throw { response: { data: { message: 'Phone number already registered' } } };
      }
      
      const newUser = {
        id: Date.now().toString(),
        phone: formData.phone,
        password: formData.password,
        username: formData.username,
        name: formData.name,
        email: formData.email || '',
        gender: formData.gender,
        role: 'seller',
        bio: 'Add a bio',
        profilePic: '',
        profileComplete: false,
        posts: 0,
        followers: 0,
        following: 0
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      const token = 'mock-token-' + Date.now();
      return { data: { token, user: newUser } };
    }
    
    return { data: { success: true } };
  },
  
  get: async (endpoint) => {
    await mockDelay();
    return { data: {} };
  },
  
  put: async (endpoint, data) => {
    await mockDelay();
    return { data: { success: true } };
  },
  
  delete: async (endpoint) => {
    await mockDelay();
    return { data: { success: true } };
  }
};

// helper to set auth token after login
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export default API;