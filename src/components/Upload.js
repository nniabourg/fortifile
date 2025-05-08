import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "../main.css";

function Upload() {
  const [fileName, setFileName] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(fileData);

      const key = CryptoJS.lib.WordArray.random(16).toString();
      setEncryptionKey(key);

      const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();

      const response = await fetch("https://fortifile-26qg.onrender.com/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          data: encrypted,
        }),
      });

      const isSuccess = response.ok;
      setStatus(isSuccess ? "✅ File uploaded & encrypted successfully." : "❌ Upload failed.");

      if (isSuccess) {
        const blob = new Blob([encrypted], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <section id="encrypt">
      <img src="images/encryptt.png" alt="Encryption Visual" />

      <div className="encrypt-box">
        <h1><span>Encrypt File</span></h1>

        <div className="input-box">
          <span>Select a file</span>
          <input type="file" onChange={handleFileChange} />
        </div>

        {fileName && <p><strong>File:</strong> {fileName}</p>}
        {encryptionKey && (
          <p><strong>Encryption Key:</strong> <code>{encryptionKey}</code></p>
        )}
        {status && <p>{status}</p>}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`${fileName}.enc`}
            className="btn"
            style={{ marginTop: "1em" }}
          >
            Download Encrypted File
          </a>
        )}
      </div>
    </section>
  );
}

export default Upload;
