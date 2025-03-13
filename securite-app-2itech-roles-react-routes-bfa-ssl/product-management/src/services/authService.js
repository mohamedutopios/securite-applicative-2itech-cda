import axios from "axios";
import { jwtDecode } from 'jwt-decode'; 

const API_URL = "http://localhost:5228/api/auth";

const AuthService = {
  register: (user) => axios.post(`${API_URL}/register`, user),
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  logout: () => localStorage.removeItem('access_token'),
  getUserRole: () => {
    const token = AuthService.getToken();
    console.log(token)
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded); 
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (error) {
      return null;
    }
  },
  getUserName: () => {
    const token = AuthService.getToken();
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      return email ? email.split('@')[0] : null; 
    } catch (error) {
      return null;
    }
  },
  getToken: () => localStorage.getItem('access_token'),
  isLoggedIn: () => !!localStorage.getItem('access_token')
};

export default AuthService;
