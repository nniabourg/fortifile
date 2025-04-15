import React, { useState } from "react";
import CryptoJS from "crypto-js";

function Upload() {
  const [fileName, setFileName] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    // Read file as binary string
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target.result;

      // Generate random encryption key
      const key = CryptoJS.lib.WordArray.random(16).toString();
      setEncryptionKey(key);

      // Encrypt file data
      const encrypted = CryptoJS.AES.encrypt(fileData, key).toString();

      // Send to backend
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          data: encrypted,
        }),
      });

      if (response.ok) {
        setStatus("✅ File uploaded & encrypted successfully.");
      } else {
        setStatus("❌ Upload failed.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="container mt-5">
      <h2>Upload & Encrypt File</h2>
      <input type="file" className="form-control my-3" onChange={handleFileChange} />
      {fileName && <p><strong>File:</strong> {fileName}</p>}
      {encryptionKey && (
        <p><strong>Encryption Key:</strong> <code>{encryptionKey}</code></p>
      )}
      {status && <p>{status}</p>}
    </div>
  );
}

export default Upload;
