// src/App.js
import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Polaroid from "./components/Polaroid";

// --- DATA ---
const PORTFOLIO_DATA = {
  name: "Elysha Sophia Binti Ridzuan",
  title: "Software Developer | Web Programmer",
  summary: "Motivated Software Engineering student...",
  skills: [
    { name: "Python", logo: "/logos/python.png" },
    { name: "Java", logo: "/logos/java.png" },
    { name: "C++", logo: "/logos/cpp.jpeg" },
    { name: "Laravel", logo: "/logos/laravel.png" },
    { name: "HTML/CSS/JS", logo: "/logos/html-css-javascript.jpg" },
    { name: "MySQL", logo: "/logos/mysql.png" },
    { name: "GitHub", logo: "/logos/github.png" },
  ],
  projects: [
    { id: 1, title: "Web Development Internship (Map2U)", description: "...", tags: "Laravel · MySQL · API Testing" },
    { id: 2, title: "Sustainability Hackathon Prototype", description: "...", tags: "Innovation · Hardware · Problem-Solving" },
    { id: 3, title: "VR Cultural Preservation Research", description: "...", tags: "Research · VR · Software Engineering" },
  ]
};

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [videoOpen, setVideoOpen] = useState(false);

  const clickAudio = useRef(typeof Audio !== "undefined" ? new Audio("/click.wav") : null);
  if (clickAudio.current) clickAudio.current.preload = "auto";

  const handleToggle = () => {
    try {
      if (clickAudio.current) {
        clickAudio.current.currentTime = 0;
        clickAudio.current.play().catch(() => {});
      }
    } catch (e) {}
    toggleTheme();
  };

  const toggleVideo = () => setVideoOpen(!videoOpen);

  return (
    <div className="notebook">
      {/* Sticky nav */}
      <header style={{ position: "fixed", top: 12, left: 0, right: 0, zIndex: 40, display: "flex", justifyContent: "center" }}>
        <nav style={{ background: "transparent", padding: "6px 12px", borderRadius: 10 }}>
          <a href="#about" className="btn-view" style={{ marginRight: 8 }}>About</a>
          <a href="#skills" className="btn-view" style={{ marginRight: 8 }}>Skills</a>
          <a href="#projects" className="btn-view" style={{ marginRight: 8 }}>Projects</a>
          <a href="#contact" className="btn-view" style={{ marginRight: 8 }}>Contact</a>
          <button onClick={handleToggle} className="btn-view" style={{ marginLeft: 8 }}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <div style={{ height: 72 }} />

      {/* Cover / About section */}
      <section
        id="about"
        style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 48 }}
      >
        <div
          className="cover-card"
          role="region"
          aria-labelledby="cover-title"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            maxWidth: 1100,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Text + Buttons */}
          <div className="cover-left" style={{ flex: "1 1 320px", minWidth: 280 }}>
            <h1 id="cover-title" className="notebook-title">{PORTFOLIO_DATA.name}</h1>
            <div className="notebook-sub">{PORTFOLIO_DATA.title}</div>
            <p className="notebook-summary">{PORTFOLIO_DATA.summary}</p>

            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <button
                className="btn-view"
                onClick={() =>
                  document.getElementById("skills").scrollIntoView({ behavior: "smooth" })
                }
              >
                View More
              </button>
              <a className="btn-view" href="#projects" style={{ textDecoration: "none" }}>Projects</a>
            </div>

            {/* Watch Video Toggle */}
            <button
              onClick={toggleVideo}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                marginBottom: 16,
              }}
              aria-expanded={videoOpen}
            >
              {videoOpen ? "Hide Video" : "Watch Video"}
              <span
                style={{
                  display: "inline-block",
                  transform: videoOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                ▼
              </span>
            </button>
          </div>

          {/* Right: Polaroid OR Video */}
          <div
            style={{
              flex: "0 0 320px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {videoOpen ? (
              <video
                src="/about-me.mp4"
                controls
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
                aria-label="About Me Video"
              />
            ) : (
              <Polaroid name={PORTFOLIO_DATA.name} photo="/profile.jpg" />
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "2rem 1rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>Tools & Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 16 }}>
            {PORTFOLIO_DATA.skills.map(skill => (
              <div key={skill.name} style={{ textAlign: "center", padding: 12 }}>
                <img src={skill.logo} alt={skill.name} style={{ width: 64, height: 64, objectFit: "contain", marginBottom: 8 }} />
                <div style={{ fontFamily: "Patrick Hand, cursive" }}>{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "2rem 1rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1200, width: "100%" }}>
          <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {PORTFOLIO_DATA.projects.map(project => (
              <article key={project.id} style={{ padding: 16, borderRadius: 10, background: "rgba(0,0,0,0.02)" }}>
                <h3 style={{ fontFamily: "Permanent Marker, cursive", margin: 0 }}>{project.title}</h3>
                <p style={{ fontSize: 12, margin: '8px 0', opacity: 0.6 }}>{project.tags}</p>
                <p style={{ marginTop: 8 }}>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "2rem 1rem", width: "100%", display: "flex", justifyContent: "center", marginBottom: 64 }}>
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
          <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>Contact</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/elysha" target="_blank" rel="noreferrer" className="btn-view">LinkedIn</a>
            <a href="https://github.com/elysha" target="_blank" rel="noreferrer" className="btn-view">GitHub</a>
            <a href="mailto:elysha@example.com" className="btn-view">Email</a>
            <a href="tel:+1234567890" className="btn-view">Phone</a>
          </div>
        </div>
      </section>
    </div>
  );
}
