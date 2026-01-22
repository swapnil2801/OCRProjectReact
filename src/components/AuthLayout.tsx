import {  useEffect, useState } from "react";
import type { ReactNode } from "react";
import "../styles/auth.css";

import slide1 from "../assets/OCR1.jpg";
import slide2 from "../assets/OCR2.jpg";
import slide3 from "../assets/OCR3.png";

interface Props {
  title: string;
  children: ReactNode;
}

const slides = [
  {
    title: "Smart OCR Extraction",
    text: "Convert PDFs & images into editable text instantly with AI OCR.",
    img: slide1
  },
  {
    title: "Scan PDFs Accurately",
    text: "Even scanned or blurry PDFs get clean text extraction.",
    img: slide2
  },
  {
    title: "Image → Text Conversion",
    text: "Extract text from receipts, notes, signs or handwriting.",
    img: slide3
  }
];

export default function AuthLayout({ title, children }: Props) {
  const [index, setIndex] = useState(0);

  // Auto-rotate slider
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const active = slides[index];

  return (
    <div className="page-layout">
      
      {/* LEFT — FORM AREA */}
      <div className="left-section">
        <div className="auth-card expanded">
          <h2 className="auth-title">{title}</h2>
          {children}
        </div>
      </div>

      {/* RIGHT — SLIDER AREA */}
      <div className="right-section">
        <div className="slider-box">
          <h1 className="slider-title">{active.title}</h1>
          <p className="slider-text">{active.text}</p>

          <div className="slider-image-frame">
            <img src={active.img} className="slider-image" alt="Slide" />
          </div>

          <div className="slider-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
