import React from 'react';
import '../main.css'; 

const About = () => {
  return (
    <section id="about">
      <img src="images/fortifile-logo.png" alt="Encryption Visual" />
      <div className="about-box">
        <h1>About <span>Fortifile</span></h1>
        <p>
          Fortifile is a secure file management and encryption tool designed
          for protecting your data through seamless end-to-end encryption.
          Whether you're uploading sensitive documents or sharing files with
          others, Fortifile keeps your information safe.
        </p>
        <h2>Key Features</h2>
        <div className="skills">
          <ul>
            <li><span>🔐 End-to-End Encryption</span></li>
            <li><span>📁 Secure File Uploads</span></li>
            <li><span>🚀 Fast Processing</span></li>
            <li><span>💻 Web-Based Access</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
