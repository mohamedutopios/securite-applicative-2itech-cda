import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/authService';

const LoginComponent = () => {

    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
       const response = await AuthService.login(credentials);
       console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
          navigate('/products');
        }catch (error) {
            
          alert('Login failed');
        }
    };

    return (
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" required onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="mt-3">
            Si vous ne disposez pas de compte, veuillez vous inscrire <Link to="/register">Register ici</Link>
          </p>
        </div>
      );
    };


export default LoginComponent;

