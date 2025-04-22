import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "../main.css";

function Decrypt() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [decryptedFileName, setDecryptedFileName] = useState("");

  const handleDecrypt = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const encryptedData = event.target.result;

        const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);

        if (!decrypted) throw new Error("Decryption failed. Incorrect key?");

        const blob = new Blob([decrypted], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setDecryptedFileName(file.name.replace(".enc", ""));
        setStatus("✅ File decrypted successfully.");
      } catch (err) {
        setStatus("❌ Failed to decrypt file.");
        setDownloadUrl(null);
        setDecryptedFileName("");
      }
    };

    reader.readAsText(file);
  };

  return (
    <section id="encrypt">
      <div className="encrypt-box">
        <h1><span>Decrypt File</span></h1>

        <div className="input-box" style={{ paddingTop: "30px"}}>
          <span>Paste Encryption Key</span>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </div>

        <div className="input-box" style={{ paddingTop: "30px"}}>
          <span>Select Encrypted File (.enc)</span>
          <input type="file" onChange={handleDecrypt} />
        </div>

        {status && <p>{status}</p>}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={decryptedFileName}
            className="btn"
            style={{ marginTop: "1em" }}
          >
            Download Decrypted File
          </a>
        )}
      </div>

      <img src="images/decrypt.png" alt="Encryption Visual" />
    </section>
  );
}

export default Decrypt;
