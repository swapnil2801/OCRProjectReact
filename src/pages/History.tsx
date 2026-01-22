import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import "../styles/history.css";
import axiosClient from "../utils/axiosClient";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null); // NEW delete modal

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axiosClient.get("/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(res.data);
      } catch (err) {
        console.error("History fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  // CONFIRM DELETE
  async function confirmDelete() {
    if (!deleteRecord) return;

    try {
      await axiosClient.delete(`/history/${deleteRecord.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from UI instantly
      setHistory((prev) => prev.filter((h) => h.id !== deleteRecord.id));
      setDeleteRecord(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  function copyText() {
    if (selectedRecord) {
      navigator.clipboard.writeText(selectedRecord.extracted_text);
    }
  }

  return (
    <>
      <h1 className="history-title">🕓 Scan History</h1>

      {/* LOADING */}
      {loading && (
        <p style={{ color: "#bbb", textAlign: "center" }}>Loading history...</p>
      )}

      {/* EMPTY */}
      {!loading && history.length === 0 && (
        <p style={{ color: "#777", textAlign: "center", marginTop: "20px" }}>
          No scan history available.
        </p>
      )}

      {/* LIST */}
      <div className="history-list">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-card"
            onClick={() => setSelectedRecord(item)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            {/* DELETE BUTTON — Opens modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteRecord(item);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "#ff5f5f",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h3>
              {item.scan_type === "simple_pdf" && "📄 Simple PDF"}
              {item.scan_type === "scanned_pdf" && "🖨 Scanned PDF OCR"}
              {item.scan_type === "image" && "🖼 Image OCR"}
              {item.scan_type === "auto" && "🤖 Auto Detect"}
            </h3>

            <p className="file-name">{item.file_name}</p>
            <span className="date">
              {new Date(item.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* ======================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ======================= */}
      {deleteRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: "15px", color: "var(--accent)" }}>
              Confirm Delete
            </h2>

            <p
              style={{
                color: "#ddd",
                marginBottom: "25px",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              Are you sure you want to delete <br />
              <b style={{ color: "var(--accent)" }}>{deleteRecord.file_name}</b>?
              <br />
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn copy"
                onClick={confirmDelete}
                style={{
                  background: "linear-gradient(90deg, #ff3b3b, #ff7575)",
                }}
              >
                Delete
              </button>

              <button
                className="modal-btn close"
                onClick={() => setDeleteRecord(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= */}
      {/* TEXT VIEW MODAL */}
      {/* ======================= */}
      {selectedRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: "10px", color: "var(--accent)" }}>
              Extracted Text
            </h2>

            <textarea
              value={selectedRecord.extracted_text}
              readOnly
              style={{
                width: "100%",
                height: "240px",
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />

            <div className="modal-actions">
              <button className="modal-btn copy" onClick={copyText}>
                Copy
              </button>
              <button
                className="modal-btn close"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
