import axios from "axios";

const API_URL = "http://localhost:5228/api/auth";

const AuthService = {
  register: (user) =>  axios.post(`${API_URL}/register`, user),
  
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  
  getToken: () => localStorage.getItem("access_token"),
};

export default AuthService;
