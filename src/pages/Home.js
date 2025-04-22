import React from 'react';
import { Link } from 'react-router-dom';
import '../main.css';

const Home = () => {
  return (
    <section id="home">
      <img src="/images/fortifile-logo.png" alt="FortiFile Logo" />
      <div className="info-box">
        <h1>Welcome to <span>FortiFile</span></h1>
        <h3>Your secure file encryption web app</h3>
        <p>
          Encrypt, upload, and manage files with complete privacy. <br />
          Built for users who take data security seriously.
        </p>
      </div>

      <div className="btn-box">
        <Link to="/about" className="btn">Learn More</Link>
        <Link to="/upload" className="btn">Upload Files</Link>
      </div>
      
    </section>
  );
};

export default Home;
