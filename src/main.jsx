import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { portfolio as data } from './data.js'
import './styles.css'

function Icon({ type, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (type === 'github') return <svg {...common}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.5 1.1 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8.1 18V22" /></svg>
  if (type === 'linkedin') return <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  if (type === 'arrow') return <svg {...common}><path d="M7 17 17 7M7 7h10v10" /></svg>
  if (type === 'sun') return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
  return <svg {...common}><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /></svg>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' } catch { return false }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
    <nav className="nav shell" aria-label={data.copy.mainNavigation}>
      <a className="wordmark" href="#home" aria-label={data.copy.homeLabel}>{data.name.split(' ').map(part => part[0]).join('')}<span>.</span></a>
      <button className="menu-toggle icon-button" aria-label={open ? data.copy.menuClose : data.copy.menuOpen} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span /><span /></button>
      <div className={`nav-links ${open ? 'is-open' : ''}`} id="primary-navigation">
        {data.sections.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <button className="theme-toggle icon-button" onClick={() => setDark(!dark)} aria-label={dark ? data.copy.lightMode : data.copy.darkMode}><Icon type={dark ? 'sun' : 'moon'} size={17} /></button>
      </div>
    </nav>
    </header>
  </>
}

function SectionHeading({ eyebrow, title, note }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{note && <p>{note}</p>}</div>
}

function SocialLinks({ compact = false }) {
  return <div className={`social-links ${compact ? 'compact' : ''}`}>
    <a href={data.social.github} target="_blank" rel="noreferrer" aria-label={`${data.copy.github} profile`}><Icon type="github" />{compact ? null : <span>{data.copy.github}</span>}<Icon type="arrow" size={13} /></a>
    <a href={data.social.linkedin} target="_blank" rel="noreferrer" aria-label={`${data.copy.linkedin} profile`}><Icon type="linkedin" />{compact ? null : <span>{data.copy.linkedin}</span>}<Icon type="arrow" size={13} /></a>
  </div>
}

function Hero() {
  return <section className="hero shell" id="home">
    <div className="hero-copy">
      <div className="availability"><span className="status-dot" /> {data.copy.heroAvailability}</div>
      <h1>{data.name}<span className="accent-period">.</span></h1>
      <p className="hero-role">{data.role}</p>
      <p className="hero-intro">{data.intro}</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">{data.copy.viewProjects} <Icon type="arrow" size={15} /></a>
        <a className="button button-outline" href="/Nurul_Hasan_cv.pdf" download>{data.copy.downloadCv} <span className="download-mark">↓</span></a>
        <a className="button button-text" href="#contact">{data.copy.contact} <span>↗</span></a>
      </div>
      <SocialLinks />
    </div>
    <aside className="hero-aside" aria-label={data.copy.currentFocus}>
      <div className="aside-label"><span>{data.copy.focusEyebrow}</span><span className="aside-line" /></div>
      <figure className="portrait-frame"><img src={data.portrait.src} alt={data.portrait.alt} fetchPriority="high" decoding="async" /></figure>
      <p className="focus-title">{data.copy.focusTitle}</p>
      <p className="focus-description">{data.copy.focusDescription}</p>
      <a href="#projects" className="aside-link">{data.copy.exploreWork} <span>↓</span></a>
    </aside>
    <div className="hero-bottom"><span>{data.contact.location.toUpperCase()}</span><a href="#about">{data.copy.scrollExplore} <span>↓</span></a></div>
  </section>
}

function About() {
  return <section className="section shell" id="about">
    <SectionHeading eyebrow={data.copy.aboutEyebrow} title={data.copy.aboutTitle} />
    <div className="about-grid"><p className="about-copy">{data.summary}</p><div className="about-aside"><span className="aside-number">01</span><p>{data.copy.aboutAside}</p></div></div>
  </section>
}

function SkillGroup({ group, index }) {
  return <article className="skill-group"><span className="skill-index">0{index + 1}</span><h3>{group.title}</h3><div className="tag-list">{group.items.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div></article>
}

function Skills() {
  return <section className="section section-tint" id="skills"><div className="shell"><SectionHeading eyebrow={data.copy.skillsEyebrow} title={data.copy.skillsTitle} note={data.copy.skillsNote} /><div className="skills-grid">{data.skillGroups.map((group, index) => <SkillGroup key={group.title} group={group} index={index} />)}</div></div></section>
}

function TimelineItem() {
  const exp = data.experience
  return <article className="timeline-item"><div className="timeline-rail"><span className="timeline-dot" /></div><div className="timeline-content"><div className="timeline-top"><div><p className="company-name">{exp.company}</p><h3>{exp.role}</h3></div><span className="status-pill">{exp.status}</span></div><ul className="detail-list">{exp.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>
}

function Experience() {
  return <section className="section shell" id="experience"><SectionHeading eyebrow={data.copy.experienceEyebrow} title={data.copy.experienceTitle} /><TimelineItem /></section>
}

function ProjectCard({ project, index }) {
  return <article className={`project-card ${project.featured ? 'project-featured' : ''}`}>
    <div className="project-top"><span className="project-number">PROJECT / 0{index + 1}</span><span className={`project-label ${project.featured ? 'label-accent' : ''}`}>{project.label}</span></div>
    <h3>{project.title}</h3>
    {project.technologies.length > 0 && <div className="tag-list project-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>}
    <ul className="project-points">{project.points.map(point => <li key={point}>{point}</li>)}</ul>
    {project.repositoryUrl
      ? <a className="repo-placeholder" href={project.repositoryUrl} target="_blank" rel="noreferrer"><Icon type="github" size={16} /> {data.copy.github} <Icon type="arrow" size={13} /></a>
      : <button className="repo-placeholder" type="button" disabled title={data.copy.repoNote}><Icon type="github" size={16} /> {data.copy.github} <span>{data.copy.repoLabel}</span></button>}
  </article>
}

function Projects() {
  return <section className="section section-tint" id="projects"><div className="shell"><SectionHeading eyebrow={data.copy.projectsEyebrow} title={data.copy.projectsTitle} note={data.copy.projectsNote} /><div className="projects-grid">{data.projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div><p className="repo-note">{data.copy.repoNote}</p></div></section>
}

function Education() {
  const edu = data.education
  return <section className="section shell" id="education"><SectionHeading eyebrow={data.copy.educationEyebrow} title={data.copy.educationTitle} /><div className="education-layout"><article className="education-card"><div className="edu-top"><span className="edu-icon">B</span><span className="status-pill">{edu.status}</span></div><h3>{edu.institution}</h3><p className="edu-degree">{edu.degree}</p><div className="edu-meta"><span>{edu.location}</span><span>{edu.dates}</span></div></article><aside className="languages-card"><span className="eyebrow">{data.copy.languagesEyebrow}</span><h3>{data.copy.languagesTitle}</h3><ul>{data.languages.map(language => <li key={language.name}><span>{language.name}</span><span>{language.level}</span></li>)}</ul></aside></div></section>
}

function Contact() {
  return <section className="contact-section" id="contact"><div className="shell contact-inner"><div><span className="eyebrow">{data.copy.contactEyebrow}</span><h2>{data.copy.contactTitle.split('\n').map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{index === 1 ? <span>{line}</span> : line}</React.Fragment>)}</h2><a className="button button-light" href={`mailto:${data.contact.email}`}>{data.copy.emailMe} <Icon type="arrow" size={15} /></a></div><div className="contact-details"><a href={`mailto:${data.contact.email}`}><span>{data.copy.emailLabel}</span>{data.contact.email}</a><a href={`tel:${data.contact.phone.replaceAll(' ', '')}`}><span>{data.copy.phoneLabel}</span>{data.contact.phone}</a><p><span>{data.copy.locationLabel}</span>{data.contact.location}</p><SocialLinks compact /></div></div></section>
}

function Footer() {
  return <footer className="footer shell"><a className="footer-name" href="#home">{data.name}<span>.</span></a><span>© {data.footerYear} {data.name}</span><a className="back-top" href="#home">{data.copy.backToTop} ↑</a></footer>
}

function App() {
  useEffect(() => {
    document.title = data.seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.seo.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', data.seo.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', data.seo.description)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    document.querySelectorAll('.section, .contact-section').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return <><Navbar /><main id="main-content" tabIndex={-1}><Hero /><About /><Skills /><Experience /><Projects /><Education /><Contact /></main><Footer /></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
