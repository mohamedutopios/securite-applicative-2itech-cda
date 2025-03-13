import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";


const HeaderComponent = () => {

const navigate = useNavigate();
const isLoggedIn = AuthService.isLoggedIn();
const role = AuthService.getUserRole();
const userName = AuthService.getUserName();

const handleLogout = () => {
  AuthService.logout();
  navigate('/');
}


return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/products">Product Management</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Hello, {userName} ({role})</span> 
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default HeaderComponent;