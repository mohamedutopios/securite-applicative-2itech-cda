import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; 


const ErrorPage = () => {
  return (
    <div class="text-wrapper">
    <div class="title" data-content="404">
        403 - ACCESS DENIED
    </div>

    <div class="subtitle">
        Oops, You don't have permission to access this page.
    </div>
    <div class="isi">
         A web server may return a 403 Forbidden HTTP status code in response to a request from a client for a web page or resource to indicate that the server can be reached and understood the request, but refuses to take any further action. Status code 403 responses are the result of the web server being configured to deny access, for some reason, to the requested resource by the client.
         </div>

    <div class="buttons">
    <Link to="/" className="btn btn-primary">Go to Login</Link>
    </div>
</div>
  );
};

export default ErrorPage;