// src/App.js
import { db } from "./firebase";
import React, { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Polaroid from "./components/Polaroid";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [videoOpen, setVideoOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(null); // Selected resume
  const [resumes, setResumes] = useState([]); // All resumes

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

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const colRef = collection(db, "users", "userId", "resumes"); // change "userId" to your actual doc id
        const snapshot = await getDocs(colRef);
        const allResumes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResumes(allResumes);

        // Set the first resume that is marked as general
        const general = allResumes.find(r => r.isGeneral) || allResumes[0];
        setPortfolio(general);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };

    fetchResumes();
  }, []);

  const handleResumeSwitch = (resumeId) => {
    const selected = resumes.find(r => r.id === resumeId);
    if (selected) setPortfolio(selected);
  };

  if (!portfolio) {
    return <div style={{ padding: 40, fontSize: 20 }}>Loading portfolio...</div>;
  }

  return (
  <div className="notebook">
    <header style={{ position: "fixed", top: 12, left: 0, right: 0, zIndex: 40, display: "flex", justifyContent: "center" }}>
      <nav style={{ 
        background: theme === 'light' ? 'var(--doodle-2)' : 'var(--doodle-3)',
        padding: "6px 12px",
        borderRadius: 10,
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
        transform: 'rotate(1deg)',
        border: '1px solid var(--subtle)',
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px"
      }}>
        <a href="#about" className="btn-view">About</a>
        <a href="#skills" className="btn-view">Skills</a>
        <a href="#projects" className="btn-view">Projects</a>
        <a href="#contact" className="btn-view">Contact</a>
        <button onClick={handleToggle} className="btn-view">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>

    <div style={{ height: 8 }} />

      {/* Resume Switcher */}
      <section style={{ textAlign: "center", margin: "3.5rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          {resumes.map((r) => (
          <button
            key={r.id}
            onClick={() => handleResumeSwitch(r.id)}
            className={`resume-label ${portfolio.id === r.id ? 'active' : ''}`}
          >
            {r.title}
          </button>
          ))}
        </div>
      </section>

      {/* Cover / About section */}
      <section id="about" style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 48 }}>
        <div className="cover-card" role="region" aria-labelledby="cover-title"
          style={{ display: "flex", flexWrap: "wrap", gap: 32, maxWidth: 1100, width: "100%", alignItems: "flex-start" }}>
          
          {/* Left */}
          <div className="cover-left" style={{ flex: "2 1 400px", minWidth: 360 }}>
            <h1 id="cover-title" className="notebook-title">{portfolio.title}</h1>
            <div className="notebook-sub">{portfolio.jobCategory}</div>
            <p className="notebook-summary">{portfolio.summary}</p>

            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <button className="btn-view" onClick={() => document.getElementById("skills").scrollIntoView({ behavior: "smooth" })}>View More</button>
              <a className="btn-view" href="#projects" style={{ textDecoration: "none" }}>Projects</a>
            </div>

            <button onClick={toggleVideo} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 16 }} aria-expanded={videoOpen}>
              {videoOpen ? "Hide Video" : "Watch Video"}
              <span style={{ display: "inline-block", transform: videoOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>▼</span>
            </button>
          </div>

          {/* Right */}
          <div style={{ flex: "0 0 320px", display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: 50 }}>
            {videoOpen ? (
              <video src="/about-me.mp4" controls style={{ width: 320, height: 320, borderRadius: 12, objectFit: "cover" }} aria-label="About Me Video" />
            ) : (
              <Polaroid name={"Elysha Sophia Binti Ridzuan"} photo="/profile.jpg" />
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "2rem 1rem", width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>Tools & Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 16 }}>
            {portfolio.skills?.technical?.map((skill, idx) => (
              <div key={idx} style={{ textAlign: "center", padding: 12 }}>
                <div style={{ fontFamily: "Patrick Hand, cursive" }}>{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Projects & Experience Section */}
          <section
            id="projects"
            style={{
              padding: "2rem 1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ maxWidth: 1200, width: "100%" }}>

              {/* Projects */}
              <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>
                Projects
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                  gap: 16,
                }}
              >
                {portfolio.projects &&
                  Object.entries(portfolio.projects).map(([projectId, project]) => (
                    <article key={projectId} className="doodle-card">
                      <h3 style={{ fontFamily: "Permanent Marker, cursive", margin: 0 }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: 12, margin: "8px 0", opacity: 1 }}>
                        {project.tags}
                      </p>
                      <p style={{ marginTop: 8 }}>{project.description}</p>

                      {/* Optional Media (manually added if needed) */}
                      {projectId === "projectId6" && (
                        <a
                          href="https://www.figma.com/design/XHQ6Ic2Ili6YFGTC3SogTc/HoneyBee-Physiotherapy-Centre?node-id=0-1&t=w6qfp3n6wbK7b2WG-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", marginTop: 8, color: "#0070f3", textDecoration: "underline" }}
                        >
                          Figma Design
                        </a>
                      )}

                      {/* Manually added links per project */}
                      <div style={{ marginTop: 8 }}>
                        {projectId === "projectId1" && (
                          <a
                            href="https://github.com/elly-02/HumanResourceManagement"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", color: "#0070f3", textDecoration: "underline" }}
                          >
                            GitHub Repository
                          </a>
                        )}
                        {projectId === "projectId2" && (
                          <>
                            <a
                              href="https://github.com/Charlotte-720/OWSB"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", color: "#0070f3", textDecoration: "underline" }}
                            >
                              GitHub Repository
                            </a>
                          </>
                        )}
                        {projectId === "projectId3" && (
                          <>
                            <a
                              href="https://github.com/gananwen/foodieBox"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", color: "#0070f3", textDecoration: "underline" }}
                            >
                              GitHub Repository
                            </a>
                            <a
                              href="https://www.figma.com/design/cnXv7k56l0ZSJCbcunizep/MAE?node-id=10-379&t=gJixVnDgpBhP7GFg-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", marginTop: 8, color: "#0070f3", textDecoration: "underline" }}
                            >
                              Figma Design
                            </a>
                          </>
                        )}
                        {projectId === "projectId4" && (
                          <>
                            <a
                              href="https://github.com/sevenpluseight/dstr-lab2"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", color: "#0070f3", textDecoration: "underline" }}
                            >
                              GitHub Repository
                            </a>
                          </>
                        )}
                        {projectId === "projectId5" && (
                          <>
                            <a
                              href="https://github.com/elly-02/Resume-JobMatching"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", color: "#0070f3", textDecoration: "underline" }}
                            >
                              GitHub Repository
                            </a>
                          </>
                        )}
                        {projectId === "projectId7" && (
                          <>
                             <a
                              href="https://www.canva.com/design/DAGsQWfX2VE/CY1KAobdWfCnXPAszVkEuw/edit?utm_content=DAGsQWfX2VE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", marginTop: 8, color: "#0070f3", textDecoration: "underline" }}
                            >
                              Canva Slide
                            </a>
                          </>
                        )}
                        {projectId === "projectId8" && (
                          <>
                            <a
                              href="https://www.canva.com/design/DAGzl4tJQOY/_HCfy15xO44Otg6pMiPyCw/edit?utm_content=DAGzl4tJQOY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", marginTop: 8, color: "#0070f3", textDecoration: "underline" }}
                            >
                              Canva Slide
                            </a>

                            <video
                              src="/AIDemoVid.mp4"
                              controls
                              style={{ width: "100%", marginTop: 8, borderRadius: 8 }}
                            />

                            <a
                              href="https://github.com/sevenpluseight/gerak-ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", marginTop: 8, color: "#0070f3", textDecoration: "underline" }}
                            >
                              GitHub Repository
                            </a>
                          </>
                        )}
                      </div>
                    </article>
                  ))}
              </div>

              {/* Experiences */}
              <h2
                className="notebook-title"
                style={{ fontSize: 28, margin: "2rem 0 12px 0" }}
              >
                Experience
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                  gap: 16,
                }}
              >
                {portfolio.experiences &&
                  Object.values(portfolio.experiences).map((exp, idx) => (
                    <article key={idx} className="doodle-card">
                      <h3 style={{ fontFamily: "Permanent Marker, cursive", margin: 0 }}>
                        {exp.title}
                      </h3>
                      <p style={{ fontSize: 12, margin: "6px 0", opacity: 1 }}>
                        {exp.company} {exp.location ? `• ${exp.location}` : ""}
                      </p>
                      <p style={{ fontSize: 12, margin: "6px 0", opacity: 1 }}>
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <ul className="doodle-list">
                        {exp.responsibilities?.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
              </div>
            </div>
          </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          padding: "2rem 1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 64,
        }}
      >
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
          <h2 className="notebook-title" style={{ fontSize: 28, marginBottom: 12 }}>
            Contact
          </h2>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="https://www.linkedin.com/in/elysha-sophia-ridzuan-612777316/" target="_blank" rel="noreferrer" className="btn-view">
              LinkedIn
            </a>
            <a href="https://github.com/elly-02" target="_blank" rel="noreferrer" className="btn-view">
              GitHub
            </a>
            <a href="mailto:elyshasophia.ridzuan@gmail.com" className="btn-view">
              Email
            </a>
            <a href="tel:+60132770302" className="btn-view">
              Phone
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-view">
              Resume
            </a>
            <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn-view">
              CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
