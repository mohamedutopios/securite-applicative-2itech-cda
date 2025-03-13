import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const RegisterComponent = () => {

    const [user, setUser] = useState({email: '', password: '', role: 'User'});
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          await AuthService.register(user);
          alert('User registered successfully');
          navigate('/login');
        }catch (error) {
            console.error("Error:", error);
          alert('User registration failed');
        }
    };

    return (
        <div className="container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
            <div className="mb-3">
              <select className="form-select" onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      );
    };


export default RegisterComponent;

