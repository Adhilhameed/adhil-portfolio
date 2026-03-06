import { useState, useEffect, useRef } from "react";

// ─── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Floating Orbs Background ─────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.12,
          animation: `floatOrb${i % 3} ${14 + i * 3}s ease-in-out infinite`,
          width: `${200 + i * 80}px`, height: `${200 + i * 80}px`,
          background: i % 3 === 0 ? "#00d9ff" : i % 3 === 1 ? "#7c3aed" : "#10b981",
          left: `${(i * 17) % 90}%`, top: `${(i * 23) % 80}%`,
        }} />
      ))}
      <style>{`
        @keyframes floatOrb0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-60px)} }
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,40px)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,50px)} }
      `}</style>
    </div>
  );
}

// ─── Grid Overlay ─────────────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03,
      backgroundImage: "linear-gradient(#00d9ff 1px,transparent 1px),linear-gradient(90deg,#00d9ff 1px,transparent 1px)",
      backgroundSize: "60px 60px"
    }} />
  );
}

// ─── Skills Data (Updated) ────────────────────────────────────────────────────
const skills = [
  { name: "Docker & Docker Compose", icon: "🐳", level: 80, color: "#2496ed" },
  { name: "CI/CD / GitHub Actions",  icon: "⚙️", level: 85, color: "#00d9ff" },
  { name: "Prometheus & Grafana",    icon: "🔥", level: 75, color: "#f59e0b" },
  { name: "Python / Flask",          icon: "🐍", level: 70, color: "#ffd43b" },
  { name: "Linux / WSL2",            icon: "🐧", level: 75, color: "#10b981" },
  { name: "AWS / Cloud",             icon: "☁️", level: 70, color: "#ff9900" },
  { name: "React",                   icon: "⚛️", level: 70, color: "#61dafb" },
  { name: "Loki & Alertmanager",     icon: "🚨", level: 65, color: "#7c3aed" },
];

// ─── Projects Data (Updated) ──────────────────────────────────────────────────
const projects = [
  {
    title: "DevOps Monitoring Platform",
    desc: "Built a full-stack observability platform for 3 Python Flask microservices (Auth, Orders, Inventory). Instrumented with Prometheus, visualized in Grafana dashboards using the RED method, aggregated logs via Loki, and configured Alertmanager for real-time Slack alerts. Deployed with Docker Compose.",
    tags: ["Python", "Flask", "Docker", "Prometheus", "Grafana", "Loki", "Alertmanager"],
    color: "#00d9ff", icon: "📊",
    github: "https://github.com/Adhilhameed/devops-monitoring", live: "#"
  },
  {
    title: "DevOps Portfolio Platform",
    desc: "React-based portfolio containerized with Docker and integrated with GitHub Actions for automated CI workflows. Demonstrates modern DevOps practices including version control, automated builds, and cloud deployment to Vercel.",
    tags: ["React", "Docker", "GitHub Actions", "Vercel"],
    color: "#f59e0b", icon: "💼",
    github: "https://github.com/Adhilhameed/devops-project", live: "#"
  },
];

// ─── Experience Data (Updated) ────────────────────────────────────────────────
const experience = [
  {
    role: "Cloud & DevOps Intern",
    company: "Ovniq Technologies",
    period: "2026 – Present",
    desc: "Supporting Docker-based deployments, setting up CI/CD workflows with GitHub Actions, and resolving cloud infrastructure issues. Working on containerization and deployment automation.",
    color: "#00d9ff"
  },
];

// ─── Education Data (New) ─────────────────────────────────────────────────────
const education = [
  {
    degree: "Bachelor of Technology",
    field: "Information Technology",
    school: "Bannari Amman Institute of Technology",
    period: "2021 — 2025",
    desc: "Focused on software engineering, cloud computing, and distributed systems. Graduated with First Class.",
    grade: "CGPA: 6.9/10",
    color: "#00d9ff",
  },
  {
    degree: "Higher Secondary Education",
    field: "Science (Physics, Chemistry, Mathematics)",
    school: "Rose Mary Matric Higher Secondary School",
    period: "2006 — 2021",
    desc: "Completed schooling from LKG to Class 12. Consistently achieved academic excellence.",
    grade: "10th: 91.6%  |  12th: 90.8%",
    color: "#10b981",
  },
];

const certs = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2026", icon: "☁️" },
];

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ skill, inView, delay }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>
        <span style={{ color: "#e2e8f0" }}>{skill.icon} {skill.name}</span>
        <span style={{ color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "3px",
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
          width: inView ? `${skill.level}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: `0 0 10px ${skill.color}66`
        }} />
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} style={{
      padding: "100px 0", position: "relative", zIndex: 1,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease", ...style
    }}>
      {children}
    </section>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
function SectionTitle({ label, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "64px" }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00d9ff", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase" }}>
        // {label}
      </span>
      <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#f1f5f9", margin: "12px 0 0", letterSpacing: "-1px" }}>
        {title}
      </h2>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px,5vw,80px)",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      background: scrolled ? "rgba(5,10,25,0.85)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,217,255,0.1)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px"
    }}>
      <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: "20px", color: "#00d9ff", letterSpacing: "2px" }}>
        &lt;DevPortfolio /&gt;
      </div>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#94a3b8",
            textDecoration: "none", letterSpacing: "1px", transition: "color 0.2s",
            padding: "4px 0", borderBottom: "1px solid transparent"
          }}
            onMouseEnter={e => { e.target.style.color = "#00d9ff"; e.target.style.borderBottomColor = "#00d9ff"; }}
            onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.borderBottomColor = "transparent"; }}
          >{l}</a>
        ))}
        <a href="#contact" style={{
          fontFamily: "'Orbitron',sans-serif", fontSize: "12px", fontWeight: 700,
          color: "#0a0f1e", background: "#00d9ff", padding: "10px 20px", borderRadius: "4px",
          textDecoration: "none", letterSpacing: "1px", transition: "all 0.2s",
          boxShadow: "0 0 20px rgba(0,217,255,0.3)"
        }}
          onMouseEnter={e => { e.target.style.background = "#7c3aed"; e.target.style.boxShadow = "0 0 20px rgba(124,58,237,0.4)"; }}
          onMouseLeave={e => { e.target.style.background = "#00d9ff"; e.target.style.boxShadow = "0 0 20px rgba(0,217,255,0.3)"; }}
        >HIRE ME</a>
      </div>
    </nav>
  );
}

// ─── Hero Section (Updated) ───────────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(["DevOps Enthusiast", "Cloud Learner", "Monitoring & Observability", "Aspiring Cloud & DevOps Engineer"]);
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, padding: "0 clamp(20px,8vw,120px)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroReveal { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin-ring { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes counter-spin { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .hero-tag { animation: heroReveal 0.8s ease forwards; opacity: 0; }
        .hero-tag:nth-child(1){animation-delay:0.1s}
        .hero-tag:nth-child(2){animation-delay:0.3s}
        .hero-tag:nth-child(3){animation-delay:0.5s}
        .hero-tag:nth-child(4){animation-delay:0.7s}
        .hero-tag:nth-child(5){animation-delay:0.9s}
        .hero-tag:nth-child(6){animation-delay:1.1s}
        .avatar-float { animation: float 4s ease-in-out infinite; }
        .project-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .project-card:hover { transform: translateY(-6px) !important; }
        .btn-primary:hover { transform: scale(1.04) !important; }
        .social-btn:hover { transform: translateY(-3px) scale(1.1) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050a19; }
        ::-webkit-scrollbar-thumb { background: #00d9ff44; border-radius: 3px; }
      `}</style>

      <div style={{ maxWidth: "700px" }}>
        <div className="hero-tag" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00d9ff", fontSize: "14px", letterSpacing: "3px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
          AVAILABLE FOR WORK
        </div>
        <div className="hero-tag">
          <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(14px,2vw,18px)", fontWeight: 400, color: "#64748b", margin: "0 0 8px", letterSpacing: "2px" }}>Hi, I'm</h1>
        </div>
        <div className="hero-tag">
          <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(42px,7vw,80px)", fontWeight: 900, color: "#f1f5f9", margin: "0 0 4px", lineHeight: 1.05, letterSpacing: "-2px" }}>
            ADHIL HAMEED
          </h1>
        </div>
        <div className="hero-tag" style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(18px,3vw,28px)", color: "#00d9ff", fontWeight: 700 }}>{typed}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(18px,3vw,28px)", color: "#00d9ff", animation: "blink 1s step-end infinite" }}>|</span>
        </div>
        <div className="hero-tag">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,2vw,18px)", color: "#94a3b8", lineHeight: 1.8, margin: "0 0 48px", maxWidth: "560px", fontWeight: 300 }}>
            Aspiring Cloud & DevOps Engineer with hands-on experience in{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 500 }}>Docker, Prometheus, Grafana, GitHub Actions and CI/CD</span>.
            Passionate about building observable, automated infrastructure. Currently interning at Ovniq Technologies and seeking opportunities to grow as a DevOps Engineer.
          </p>
        </div>
        <div className="hero-tag" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-primary" style={{
            fontFamily: "'Orbitron',sans-serif", fontSize: "13px", fontWeight: 700,
            color: "#0a0f1e", background: "linear-gradient(135deg,#00d9ff,#7c3aed)",
            padding: "16px 36px", borderRadius: "4px", textDecoration: "none",
            letterSpacing: "1px", transition: "transform 0.2s",
            boxShadow: "0 0 30px rgba(0,217,255,0.25)", display: "inline-block"
          }}>VIEW PROJECTS</a>
          <a href="#" className="btn-primary" style={{
            fontFamily: "'Orbitron',sans-serif", fontSize: "13px", fontWeight: 700,
            color: "#00d9ff", background: "transparent",
            border: "1px solid #00d9ff33", padding: "16px 36px", borderRadius: "4px",
            textDecoration: "none", letterSpacing: "1px", transition: "all 0.2s", display: "inline-block"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#00d9ff"; e.target.style.background = "rgba(0,217,255,0.08)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#00d9ff33"; e.target.style.background = "transparent"; }}
          >DOWNLOAD CV</a>
        </div>
        <div className="hero-tag" style={{ display: "flex", gap: "14px", marginTop: "48px" }}>
          {[
            { icon: "⚡", label: "GitHub", color: "#f1f5f9", href: "https://github.com/Adhilhameed" },
            { icon: "💼", label: "LinkedIn", color: "#0077b5", href: "#" },
            { icon: "✉️", label: "Email", color: "#00d9ff", href: "#contact" },
          ].map(s => (
            <a key={s.label} href={s.href} className="social-btn" style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: "12px",
              color: "#64748b", textDecoration: "none", display: "flex",
              alignItems: "center", gap: "6px", padding: "10px 16px",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px",
              transition: "all 0.2s", background: "rgba(255,255,255,0.02)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#64748b"; }}
            >{s.icon} {s.label}</a>
          ))}
        </div>
      </div>

      {/* Decorative right-side element */}
      <div className="avatar-float" style={{ position: "absolute", right: "clamp(20px,8vw,120px)", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "280px", height: "280px" }}>
          <div style={{ position: "absolute", inset: "-30px", border: "1px dashed rgba(0,217,255,0.2)", borderRadius: "50%", animation: "spin-ring 20s linear infinite" }} />
          <div style={{ position: "absolute", inset: "-60px", border: "1px dashed rgba(124,58,237,0.15)", borderRadius: "50%", animation: "counter-spin 30s linear infinite" }} />
          <div style={{ width: "280px", height: "280px", borderRadius: "50%", background: "linear-gradient(135deg,#0d1b3e,#1a0a3c)", border: "2px solid rgba(0,217,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100px", boxShadow: "0 0 60px rgba(0,217,255,0.15), inset 0 0 40px rgba(124,58,237,0.1)" }}>🧑‍💻</div>
          {["🐳", "📊", "🔥", "🚀"].map((icon, i) => (
            <div key={i} style={{ position: "absolute", width: "44px", height: "44px", background: "rgba(10,15,30,0.9)", border: "1px solid rgba(0,217,255,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 0 15px rgba(0,217,255,0.15)", top: `${50 + 55 * Math.sin(i * Math.PI / 2)}%`, left: `${50 + 55 * Math.cos(i * Math.PI / 2)}%`, transform: "translate(-50%,-50%)" }}>{icon}</div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#334155", letterSpacing: "2px" }}>SCROLL</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #334155, transparent)", animation: "float 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── Skills Section (Updated) ─────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useInView();
  return (
    <Section id="skills">
      <div style={{ padding: "0 clamp(20px,8vw,120px)" }}>
        <SectionTitle label="expertise" title="Tech Stack" />
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "12px 48px" }}>
          {skills.map((s, i) => <SkillBar key={s.name} skill={s} inView={inView} delay={i * 60} />)}
        </div>
        <div style={{ display: "flex", gap: "0", marginTop: "80px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { val: "3+", label: "Months Experience", color: "#00d9ff" },
            { val: "2", label: "Projects Built", color: "#7c3aed" },
            { val: "8+", label: "Containers Deployed", color: "#10b981" },
            { val: "1", label: "Cloud Certification", color: "#f59e0b" },
          ].map((stat, i) => (
            <div key={i} style={{ flex: 1, padding: "36px 20px", textAlign: "center", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: stat.color, marginBottom: "8px" }}>{stat.val}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#64748b", letterSpacing: "1px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Projects Section (Updated) ───────────────────────────────────────────────
function Projects() {
  return (
    <Section id="projects">
      <div style={{ padding: "0 clamp(20px,8vw,120px)" }}>
        <SectionTitle label="work" title="Featured Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px" }}>
          {projects.map((p, i) => (
            <div key={i} className="project-card" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.color}22`, borderRadius: "16px", padding: "32px", cursor: "pointer", boxShadow: `0 0 30px ${p.color}0a` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${p.color}22`; e.currentTarget.style.borderColor = `${p.color}55`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 30px ${p.color}0a`; e.currentTarget.style.borderColor = `${p.color}22`; }}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: "-0.5px" }}>{p.title}</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: p.color, background: `${p.color}14`, padding: "4px 10px", borderRadius: "4px", letterSpacing: "0.5px" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {[{ label: "GitHub", href: p.github }, { label: "Live Demo", href: p.live }].map(btn => (
                  <a key={btn.label} href={btn.href} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: p.color, textDecoration: "none", padding: "8px 16px", border: `1px solid ${p.color}44`, borderRadius: "6px", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.target.style.background = `${p.color}18`; e.target.style.borderColor = p.color; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = `${p.color}44`; }}
                  >{btn.label} →</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Experience Section (Updated) ────────────────────────────────────────────
function Experience() {
  return (
    <Section id="experience">
      <div style={{ padding: "0 clamp(20px,8vw,120px)" }}>
        <SectionTitle label="career" title="Work Experience" />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: "linear-gradient(to bottom,transparent,#00d9ff44,transparent)" }} />
          {experience.map((e, i) => (
            <div key={i} style={{ paddingLeft: "48px", marginBottom: "56px", position: "relative" }}>
              <div style={{ position: "absolute", left: "-8px", top: "4px", width: "16px", height: "16px", borderRadius: "50%", background: e.color, boxShadow: `0 0 15px ${e.color}`, border: "2px solid #050a19" }} />
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: e.color, letterSpacing: "1px", marginBottom: "8px" }}>{e.period}</div>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 4px" }}>{e.role}</h3>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>{e.company}</div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "#94a3b8", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Education Section (New) ──────────────────────────────────────────────────
function Education() {
  return (
    <Section id="education">
      <div style={{ padding: "0 clamp(20px,8vw,120px)" }}>
        <SectionTitle label="background" title="Education" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
          {education.map((edu, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${edu.color}22`, borderRadius: "16px", padding: "32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: edu.color, letterSpacing: "1px", marginBottom: "12px" }}>{edu.period}</div>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px" }}>{edu.degree}</h3>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: edu.color, marginBottom: "4px" }}>{edu.field}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#64748b", marginBottom: "12px" }}>{edu.school}</div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: "0 0 16px", fontWeight: 300 }}>{edu.desc}</p>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: edu.color, background: `${edu.color}14`, padding: "8px 14px", borderRadius: "6px", display: "inline-block" }}>{edu.grade}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ maxWidth: "1000px", margin: "48px auto 0" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#00d9ff", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px", textAlign: "center" }}>// Certifications</div>
          {certs.map((cert, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,217,255,0.1)", borderRadius: "12px", padding: "20px 28px" }}>
              <span style={{ fontSize: "32px" }}>{cert.icon}</span>
              <div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "#f1f5f9", fontWeight: 500 }}>{cert.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{cert.issuer} · {cert.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <Section id="contact">
      <div style={{ padding: "0 clamp(20px,8vw,120px)" }}>
        <SectionTitle label="get in touch" title="Contact Me" />
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          {!sent ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,217,255,0.1)", borderRadius: "20px", padding: "48px" }}>
              {["name", "email"].map(field => (
                <div key={field} style={{ marginBottom: "20px" }}>
                  <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#64748b", letterSpacing: "1px", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>{field}</label>
                  <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px 18px", color: "#e2e8f0", fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "#00d9ff44"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#64748b", letterSpacing: "1px", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5}
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px 18px", color: "#e2e8f0", fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#00d9ff44"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
              <button onClick={() => setSent(true)} style={{ width: "100%", fontFamily: "'Orbitron',sans-serif", fontSize: "13px", fontWeight: 700, color: "#0a0f1e", background: "linear-gradient(135deg,#00d9ff,#7c3aed)", border: "none", padding: "18px", borderRadius: "8px", cursor: "pointer", letterSpacing: "2px", transition: "transform 0.2s", boxShadow: "0 0 30px rgba(0,217,255,0.2)" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              >SEND MESSAGE →</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "20px" }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>✅</div>
              <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "22px", color: "#10b981", margin: "0 0 12px" }}>Message Sent!</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "#64748b" }}>I'll get back to you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "40px clamp(20px,8vw,120px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, flexWrap: "wrap", gap: "16px" }}>
      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "14px", color: "#00d9ff", fontWeight: 700 }}>&lt;DevPortfolio /&gt;</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#334155" }}>
        // Built with React + Docker + GitHub Actions + Vercel
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#050a19", minHeight: "100vh", color: "#f1f5f9", overflowX: "hidden" }}>
      <FloatingOrbs />
      <GridOverlay />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}