// src/components/Polaroid.jsx
import React from "react";

const StarSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2l2.6 6.9L21 11l-5 3.6L17 21l-5-3.3L7 21l1-6.4L3 11l6.4-2.1L12 2z"/>
  </svg>
);

const SwirlSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2a7 7 0 100 14 1 1 0 110-2 5 5 0 110-10 1 1 0 110 2 3 3 0 100 6 1 1 0 110-2 1 1 0 100-2z"/>
  </svg>
);

export default function Polaroid({ name = "Elysha Sophia Binti Ridzuan", photo = "/profile.jpg" }) {
  return (
    <div className="photo-column" aria-hidden={false}>
      <div className="polaroid" role="img" aria-label={name} style={{ width: 200, height: 200, overflow: 'hidden', borderRadius: 12 }}>
        <img 
          src={photo} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
      </div>

      <div className="name-tag" style={{ marginTop: 8, textAlign: 'center' }}>{name}</div>

      {/* doodles */}
      <div className="doodle star" aria-hidden>
        <StarSVG />
      </div>
      <div className="doodle swirl" aria-hidden>
        <SwirlSVG />
      </div>
      <div className="doodle circle" aria-hidden>
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </div>
    </div>
  );
}
