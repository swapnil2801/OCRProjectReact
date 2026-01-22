import "../styles/scan.css";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleScan(type: string) {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
  
    setLoading(true);
    setResult("");
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please login again.");
      navigate("/");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    let endpoint = "";
  
    if (type === "simple") endpoint = "/ocr/simple-pdf";
    if (type === "scanned") endpoint = "/ocr/scanned-pdf";
    if (type === "image") endpoint = "/ocr/image";
    if (type === "auto") endpoint = "/ocr/auto";
  
    try {
      const res = await axiosClient.post(
        endpoint,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      setResult(res.data.extracted_text || "");
      setShowModal(true);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "OCR failed");
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <>
      {/* 🔵 Fullscreen Loader Overlay */}
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-spinner"></div>
          <p>Scanning... please wait</p>
        </div>
      )}

      {/* 🔥 Result Popup Modal */}
      {showModal && (
        <div className="result-modal-overlay">
          <div className="result-modal">

            <h2 className="modal-title">Extracted Text</h2>

            <div className="modal-content">
              <pre>{result}</pre>
            </div>

            <div className="modal-buttons">
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(result)}
              >
                Copy Text
              </button>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PAGE TITLE */}
      <h1 className="scan-title">📄 Document Scanner</h1>

      {/* MAIN CONTAINER */}
      <div className="scan-container">
        <div className="upload-box">
          <p>Upload PDF or Image</p>

          <label className="upload-btn">
            Select File
            <input type="file" onChange={handleUpload} hidden />
          </label>

          {file && <span className="file-name">{file.name}</span>}
        </div>

        <div className="scan-options">
          <button onClick={() => handleScan("simple")} className="scan-btn">Simple PDF Scan</button>
          <button onClick={() => handleScan("scanned")} className="scan-btn">Scanned PDF OCR</button>
          <button onClick={() => handleScan("image")} className="scan-btn">Image OCR</button>
          <button onClick={() => handleScan("auto")} className="scan-btn auto">Auto Detect</button>
        </div>
      </div>
    </>
  );
}
