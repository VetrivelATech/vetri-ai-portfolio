"use client";

import React, { useState, useEffect } from "react";
import ParticlesBackground from "./particlesBackground";

// Focus areas data
interface FocusArea {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

// Project structure
interface Project {
  title: string;
  category: "AI Systems" | "Agent Workflows" | "Machine Learning";
  tag: string;
  shortDesc: string;
  tech: string[];
  architecture: string;
  challenge: string;
  solution: string;
  demoUrl: string;
  codeUrl: string;
}

// Timeline structure
interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

// Skills data
interface SkillGroup {
  category: string;
  items: string[];
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Setup active section detection using IntersectionObserver
  useEffect(() => {
    const sections = ["about", "projects", "experience", "skills", "contact"];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formName.trim()) errors.name = "Name is required.";
    if (!formEmail.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formMessage.trim()) {
      errors.message = "Message cannot be empty.";
    } else if (formMessage.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormLoading(true);
    // Simulate API request
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 1500);
  };

  // Focus areas list
  const focusAreas: FocusArea[] = [
    {
      title: "AI Agents",
      desc: "Building autonomous systems utilizing multi-agent frameworks, advanced prompt routing, and self-correcting logic.",
      icon: (
        <svg className="w-8 h-8 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: "System Design",
      desc: "Designing distributed architectures, highly scalable microservices, and reliable, high-throughput data pipelines.",
      icon: (
        <svg className="w-8 h-8 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
    },
    {
      title: "Machine Learning",
      desc: "Developing and fine-tuning predictive algorithms, LLM system integration, and production deployment modeling.",
      icon: (
        <svg className="w-8 h-8 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v17.792m0-17.792L5.25 8.243m4.5-5.139L14.25 8.243m0 12.653V3.104m0 17.792l4.5-5.138m-4.5 5.138l-4.5-5.138" />
        </svg>
      ),
    },
    {
      title: "Scalable Backend",
      desc: "Optimizing database queries, caching layers, containerized deployment workflows, and secure API gateways.",
      icon: (
        <svg className="w-8 h-8 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 3h13.5m-13.5-6h13.5m-13.5-3h13.5M12 3v18" />
        </svg>
      ),
    },
  ];

  // Projects data
  const projectsList: Project[] = [
    {
      title: "NAVIS AI",
      category: "AI Systems",
      tag: "Route Intelligence",
      shortDesc: "Real-time AI pathing and route analytics engine featuring predictive traffic flow models and dynamic re-routing.",
      tech: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
      architecture: "Decoupled publisher-subscriber streaming system built with Redis and FastAPI workers. Incorporates custom graph models for rapid, low-latency node traversals.",
      challenge: "Processing real-time traffic coordinate streams from over 10,000 active nodes concurrently without blocking the main router thread.",
      solution: "Implemented an asynchronous worker queue utilizing Celery and Redis to buffer incoming payloads, while caching active path computations in a highly indexed PostgreSQL memory table.",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Aether Multi-Agent Hub",
      category: "Agent Workflows",
      tag: "Autonomous Orchestrator",
      shortDesc: "Orchestration system housing cooperative AI agents that collaborate, execute shell commands, and edit files.",
      tech: ["Next.js", "LangChain", "FastAPI", "Docker", "Weaviate"],
      architecture: "Agent architecture employing a centralized task router that dynamically decomposes requests into sub-actions assigned to specialty executor nodes.",
      challenge: "Preventing infinite reasoning loops and optimizing cost/token consumption during complex multi-step code-generation operations.",
      solution: "Designed a deterministic feedback controller that stops execution on repeated failures and asks for human feedback or adjusts prompt context parameters dynamically.",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Sentio Pipeline",
      category: "Machine Learning",
      tag: "Model Registry",
      shortDesc: "Automated ML training and validation registry providing versioned deployment tags and monitoring logs.",
      tech: ["Python", "PyTorch", "MLflow", "Kubernetes", "AWS S3"],
      architecture: "Cloud-native microservice framework running model evaluation tests automatically upon containerized pipeline commits.",
      challenge: "Minimizing inference drift and standardizing environment packaging across distinct machine learning runtimes.",
      solution: "Utilized strict Docker virtualization and automated MLflow testing steps which validate data integrity and compute drift metrics before pushing models to production nodes.",
      demoUrl: "#",
      codeUrl: "#",
    },
  ];

  // Timeline list
  const timelineData: TimelineItem[] = [
    {
      year: "2024 - PRESENT",
      title: "B.TECH AI & DATA SCIENCE Student",
      company: "AI Engineering Track",
      description: "Building strong foundation in AI engineering,system design,machine learning,full-stack development and real-world product development",
    },
    {
      year: "2025 - present",
      title: "Independent AI Systems Developer",
      company: "Independent Development",
      description: "Developing autonomous AI agents,routes intelligence systems like NAVIS,portfolio grade projects and hackathon-ready real-world solutions.",
    }

  ];

  // Skills groups
  const skillsData: SkillGroup[] = [
    {
      category: "Languages & Frameworks",
      items: ["Python", "JavaScript", "TypeScript", "Next.js", "React", "FastAPI", "SQL", "Git"],
    },
    {
      category: "AI, Models & Core ML",
      items: ["TensorFlow", "PyTorch", "OpenAI API", "Vector Databases"],
    },
    {
      category: "Data & Architecture",
      items: ["PostgreSQL", "MongoDB", "REST APIs",],
    },
    {
      category: "DevOps & Deployment",
      items: ["Git\GitHub", "Docker(Basic)", "Vercel Deployment", "Linux Basics"],
    },
  ];

  const filteredProjects = projectFilter === "All"
    ? projectsList
    : projectsList.filter(p => p.category === projectFilter);

  return (
    <main className="relative min-h-screen text-zinc-100 flex flex-col pt-20">
      {/* Decorative Grid and Particle System */}
      <div className="cyber-grid" />
      <ParticlesBackground />

      {/* Decorative Radial Glowing Blobs */}
      <div className="glow-blob w-[350px] h-[350px] bg-cyber-cyan/15 top-[-100px] left-[-50px] animate-pulse-slow" />
      <div className="glow-blob w-[450px] h-[450px] bg-cyber-purple/10 top-[25%] right-[-150px] animate-pulse-slow" />
      <div className="glow-blob w-[400px] h-[400px] bg-cyber-blue/10 bottom-[15%] left-[-200px] animate-pulse-slow" />

      {/* STICKY GLASS NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-20 glass-panel border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex justify-between items-center">
          {/* Logo Name */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "about")}
            className="text-lg md:text-xl font-bold tracking-[4px] text-white hover:text-cyber-cyan transition-colors"
          >
            VETRIVEL A<span className="text-cyber-cyan font-black">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { id: "about", label: "ABOUT" },
              { id: "projects", label: "PROJECTS" },
              { id: "experience", label: "EXPERIENCE" },
              { id: "skills", label: "SKILLS" },
              { id: "contact", label: "CONTACT" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs md:text-sm tracking-[2px] font-medium transition-all duration-300 relative py-1 hover:text-cyber-cyan ${activeSection === link.id ? "text-cyber-cyan" : "text-zinc-400"
                  }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-cyan rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
                )}
              </a>
            ))}
          </nav>

          {/* Connect Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-xs font-semibold tracking-[2px] border border-cyan-400 px-5 py-2.5 rounded-lg text-cyan-300 hover:bg-cyan-500/15 hover:text-white  transition-all duration-300"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <nav className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-[#06060c]/95 backdrop-blur-xl border-t border-white/5 flex flex-col justify-center items-center gap-8 px-6 z-40">
            {[
              { id: "about", label: "ABOUT" },
              { id: "projects", label: "PROJECTS" },
              { id: "experience", label: "EXPERIENCE" },
              { id: "skills", label: "SKILLS" },
              { id: "contact", label: "CONTACT" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-lg tracking-[4px] font-medium transition-all ${activeSection === link.id ? "text-cyber-cyan text-xl font-bold" : "text-zinc-400"
                  }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="mt-4 tracking-[4px] font-semibold text-cyber-cyan border border-cyber-cyan/40 px-8 py-3 rounded-xl hover:bg-cyber-cyan hover:text-black transition-all"
            >
              HIRE ME
            </a>
          </nav>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 md:py-32 flex flex-col items-center text-center relative z-10"
      >
        <span className="text-xs uppercase tracking-[8px] text-cyber-cyan font-semibold mb-6 px-4 py-1.5 rounded-full border border-cyber-cyan/15 bg-cyber-cyan/5">
          Artificial Intelligence & Systems Engineering
        </span>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-gradient-silver max-w-5xl">
          Engineering the <br />
          <span className="text-gradient-cyan-purple">Autonomous Future</span>
        </h1>

        <p className="max-w-3xl text-zinc-400 text-base md:text-xl leading-relaxed mt-8 text-gradient-silver">
          I am <strong className="text-zinc-200">Vetrivel A</strong>, a specialized AI Systems Architect.
          I build high-performance distributed machine learning pipelines, responsive multi-agent autonomous nodes,
          and production backend architectures that turn complex intelligence challenges into scalable solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-12 w-full justify-center px-6 sm:px-0">
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "projects")}
            className="btn-primary text-sm font-semibold tracking-[2px] px-10 py-4 rounded-xl text-white text-center cursor-pointer"
          >
            EXPLORE PROJECTS
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="btn-secondary text-sm font-semibold tracking-[2px] px-10 py-4 rounded-xl text-zinc-300 hover:text-white text-center cursor-pointer"
          >
            LET&apos;S CONNECT
          </a>
        </div>
      </section>

      {/* FOCUS / CAPABILITIES SECTION */}
      <section className="border-t border-white/5 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[6px] text-zinc-500 mb-3">Core Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Capabilities & Architecture Focus</h3>
            <div className="w-12 h-[3px] bg-cyber-purple mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 flex flex-col items-start hover:border-cyber-cyan/35 transition-all duration-300"
              >
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl mb-6 shadow-inner animate-float">
                  {area.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{area.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="border-t border-white/5 py-12 relative z-10 bg-[#06060c]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "3+", label: "FEATURED PRODUCTION SYSTEMS" },
            { num: "10+", label: "CORE SKILLS & TECH INTEGRATIONS" },
            { num: "24/7", label: "DEPLOYMENT READY BUILD MODE" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel border-white/5 rounded-2xl py-10 px-6 text-center hover:border-cyber-purple/20 transition-all duration-300"
            >
              <span className="text-5xl font-black text-gradient-cyan-purple tracking-tight block mb-2">{stat.num}</span>
              <span className="text-xs tracking-[3px] text-zinc-400 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="border-t border-white/5 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xs uppercase tracking-[6px] text-zinc-500 mb-3">Portfolio Catalog</h2>
              <h3 className="text-3xl md:text-5xl font-bold">Featured AI Implementations</h3>
            </div>

            {/* Filter controls */}
            <div className="flex gap-2 p-1.5 glass-panel rounded-xl border-white/5">
              {["All", "AI Systems", "Agent Workflows", "Machine Learning"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setProjectFilter(filter);
                    setExpandedProject(null);
                  }}
                  className={`text-xs md:text-sm px-4 py-2 rounded-lg font-medium tracking-wide transition-all ${projectFilter === filter
                    ? "bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  id={`filter-${filter.toLowerCase().replace(" ", "-")}`}
                >
                  {filter === "All" ? "ALL" : filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8">
            {filteredProjects.map((project, idx) => {
              const isExpanded = expandedProject === project.title;

              return (
                <article
                  key={idx}
                  className={`glass-card rounded-2xl border-white/5 overflow-hidden transition-all duration-500 flex flex-col ${isExpanded ? "border-cyber-cyan/30 bg-[#080812]/50 shadow-[0_0_30px_rgba(0,240,255,0.05)]" : ""
                    }`}
                  id={`project-card-${project.title.toLowerCase().replace(" ", "-")}`}
                >
                  <div className="p-8 md:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[3px] text-cyber-cyan">
                          {project.category}
                        </span>
                        <span className="text-[10px] text-zinc-400 px-2 py-0.5 border border-zinc-700 rounded-full font-medium">
                          {project.tag}
                        </span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white tracking-wide">{project.title}</h4>
                      <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{project.shortDesc}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[11px] bg-white/5 border border-white/5 px-3 py-1 rounded-md text-zinc-300 font-mono"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col lg:flex-row gap-4 w-full lg:w-auto shrink-0 justify-end">
                      <button
                        onClick={() => setExpandedProject(isExpanded ? null : project.title)}
                        className="text-xs font-bold tracking-[2px] bg-white/5 hover:bg-white/10 text-white px-5 py-3.5 rounded-xl border border-white/10 hover:border-cyber-cyan/30 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none"
                      >
                        {isExpanded ? "CLOSE DETAILS" : "INSIDE THE TECH"}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <a
                        href={project.demoUrl}
                        className="text-xs font-bold tracking-[2px] bg-cyber-cyan/10 hover:bg-cyber-cyan text-cyber-cyan hover:text-black border border-cyber-cyan/40 px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm flex-1 sm:flex-none"
                      >
                        EXPLORE
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Expanded Tech Architecture Section */}
                  {isExpanded && (
                    <div className="px-8 pb-10 pt-4 md:px-10 border-t border-white/5 bg-black/30 grid md:grid-cols-3 gap-6 animate-fadeIn">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-[2px] text-cyber-purple block">
                          SYSTEM ARCHITECTURE
                        </span>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">{project.architecture}</p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-[2px] text-red-400/90 block">
                          CORE CHALLENGE
                        </span>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">{project.challenge}</p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-[2px] text-emerald-400/90 block">
                          ENGINEERED SOLUTION
                        </span>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">{project.solution}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / EDUCATION TIMELINE */}
      <section id="experience" className="border-t border-white/5 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[6px] text-zinc-500 mb-3">Career Progression</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Engineering Experience</h3>
            <div className="w-12 h-[3px] bg-cyber-cyan mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-white/10 pl-6 md:pl-10 space-y-12">
            {timelineData.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Bullet Node */}
                <div className="absolute left-[-31px] md:left-[-45px] top-1.5 w-4.5 h-4.5 rounded-full border border-cyber-cyan bg-black shadow-[0_0_10px_#00f0ff] group-hover:scale-125 transition-transform duration-300" />

                <span className="text-xs font-bold tracking-[3px] text-cyber-cyan block mb-2 font-mono">
                  {item.year}
                </span>

                <div className="glass-panel border-white/5 p-6 md:p-8 rounded-2xl group-hover:border-white/10 transition-all">
                  <h4 className="text-xl md:text-2xl font-bold text-white leading-tight">{item.title}</h4>
                  <span className="text-sm font-semibold text-zinc-400 mt-1 block">
                    {item.company}
                  </span>
                  <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-sans">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SKILLS SECTION */}
      <section id="skills" className="border-t border-white/5 py-24 relative z-10 bg-[#06060c]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[6px] text-zinc-500 mb-3">System Stack</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Engineered Competencies</h3>
            <div className="w-12 h-[3px] bg-cyber-purple mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData.map((group, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border-white/5 hover:border-cyber-purple/30 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-white border-b border-white/5 pb-3 mb-4 tracking-wide">
                  {group.category}
                </h4>

                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium tracking-wide bg-white/5 border border-white/5 rounded-lg px-3.5 py-1.5 hover:border-cyber-cyan hover:text-white transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE CONTACT FORM SECTION */}
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="border-t border-white/5 py-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-5 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-xs uppercase tracking-[6px] text-zinc-500 mb-3">
                CONTACT
              </h2>

              <h3 className="text-3xl md:text-5xl font-bold tracking-wide">
                Bring AI Projects to Life
              </h3>
            </div>

            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              Ready to construct high-impact AI products, autonomous systems,
              full-stack applications and real-world engineering solutions.
            </p>

            <div className="space-y-4">

              <div className="border border-zinc-800 p-4 rounded-xl">
                <h4 className="font-semibold">Email</h4>
                <p className="text-zinc-400 text-sm">
                  vetrivelarumugam8@gmail.com
                </p>
              </div>

              <div className="border border-zinc-800 p-4 rounded-xl">
                <h4 className="font-semibold">LinkedIn</h4>
                <p className="text-zinc-400 text-sm">
                  https://www.linkedin.com/in/vetri-vel-b9a70a32b
                </p>
              </div>

              <div className="border border-zinc-800 p-4 rounded-xl">
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-zinc-400 text-sm">
                  VetrivelATech
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:col-span-3">
            <form className="space-y-6">

              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Project Subject"
                  className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={6}
                  placeholder="Describe your project..."
                  className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-6">

                <span className="px-4 py-2 border border-cyan-500 rounded-full text-xs text-cyan-400">
                  OPEN FOR INTERNSHIPS 2026
                </span>

                <button
                  type="submit"
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold transition"
                >
                  TRANSMIT MESSAGE
                </button>

              </div>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-auto bg-[#040409]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-500 tracking-wider">
            &copy; 2026 Vetrivel A. All rights reserved.
          </p>

          <p className="text-xs font-mono text-gradient-cyan-purple font-semibold italic">
            
          </p>

          <div className="flex gap-6 text-xs text-zinc-500 font-medium">
            <a href="#" className="hover:text-cyber-cyan transition-colors">PRIVACY</a>
            <span className="text-zinc-800">|</span>
            <a href="#" className="hover:text-cyber-cyan transition-colors">SYSTEMS</a>
          </div>
        </div>
      </footer>
    </main>
  );
}