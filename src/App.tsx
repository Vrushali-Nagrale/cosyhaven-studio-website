import { useEffect, useState } from 'react'

type Project = { name: string; place: string; image: string }

const projects: Project[] = [
  { name: 'VJ Yashwin Supernova', place: 'Wakad', image: '/project1.jpeg' },
  { name: 'ANP Memento', place: 'Wakad', image: '/project2.jpeg' },
  { name: 'Kumar Presidency', place: 'Koregaon Park', image: '/project3.jpeg' },
  { name: 'Park Titanium', place: 'Wakad', image: '/project 4.jpeg' },
  { name: 'The Address', place: 'Baner', image: '/project5.jpeg' },
  { name: 'Sukhwani Kingsley', place: 'Wakad', image: '/project6.jpeg' },
  { name: 'Sukhwani Skylines', place: 'Wakad', image: '/project 7.jpeg' },
  { name: 'MG Opera', place: 'Wakad', image: '/project8.jpeg' },
]

const services = ['Architecture & Interior Execution', 'Residential Interiors', 'Furniture Manufacturing', 'Turnkey Projects', 'Customized Solutions']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <div className="site-shell">
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={closeMenu}><img src="/cozyhaven logo.jpeg" alt="Cozyhaven Studio"/><span>COZYHAVEN <b>STUDIO</b></span></a>
      <nav className={menuOpen ? 'open' : ''}>
        <a href="#work" onClick={closeMenu}>Work</a><a href="#studio" onClick={closeMenu}>Studio</a><a href="#services" onClick={closeMenu}>Services</a><a href="#manufacturing" onClick={closeMenu}>Manufacturing</a><a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <button className={`menu-button ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><i/><i/></button>
    </header>

    <main id="top">
      <section className="hero"><img className="hero-image" src="/hero main.jpeg" alt="Cozyhaven Studio interior"/><div className="hero-shade"/><div className="hero-content"><p className="eyebrow">COZYHAVEN STUDIO · EST. 2023</p><h1>Crafting Space.<br/><em>Creating Dreams.</em></h1><p className="hero-copy">Architecture · Interior Design · Furniture Manufacturing · Turnkey Execution</p><div className="actions"><a className="button gold" href="#work">Explore our work <span>↗</span></a><a className="button line" href="#contact">Start a project</a></div></div><a className="scroll-note" href="#studio">Scroll to explore <span>↓</span></a></section>

      <section id="studio" className="about section"><div className="about-image"><img src="/about studio.jpeg" alt="Cozyhaven Studio workspace"/></div><div className="about-copy"><p className="eyebrow">01 · ABOUT THE STUDIO</p><h2>Thoughtful spaces,<br/><em>made to last.</em></h2><div className="rule"/><p>Cosyhaven Studio is a design and execution studio creating thoughtful spaces that blend aesthetics, functionality, and craftsmanship.</p><p>From architectural exteriors and refined interiors to customized furniture and complete design execution, we bring every detail together with precision. Our team of skilled designers, craftsmen, and project experts transforms ideas into modern, functional, and inspiring spaces — crafted to reflect the people who live and work in them.</p><div className="mini-stats"><span><b>15+</b>Years of Experience</span><span><b>200+</b>Projects Completed</span></div></div></section>

      <section id="services" className="services section"><div className="section-intro"><p className="eyebrow">02 · WHAT WE DO</p><h2>Design, detail<br/><em>& delivery.</em></h2></div><div className="service-list">{services.map((service, index) => <div className="service-row" key={service}><span>0{index + 1}</span><h3>{service}</h3><p>{['Designing and executing interiors and exteriors from concept to completion.','Creating elegant, comfortable, and functional spaces made for everyday living.','Crafting custom furniture with quality materials and precise workmanship.','Managing everything from design and civil work to finishing — under one roof.','Tailored spaces and furniture designed around your needs and style.'][index]}</p><b>↗</b></div>)}</div></section>

      <section className="statement"><p className="eyebrow">WHAT MAKES US UNIQUE</p><h2>Craftsmanship is<br/><em>in the detail.</em></h2><div className="stat-grid"><div><b>15+</b><span>Years of Experience</span></div><div><b>In-House</b><span>Manufacturing</span></div><div><b>End-to-End</b><span>Execution</span></div><div><b>Built for Scale</b><span>Large & Custom Projects</span></div></div></section>

      <section className="founder section"><div className="founder-photo"><img src="/founder.jpeg" alt="Shatrughan Sharma, founder"/></div><div className="founder-copy"><p className="eyebrow">03 · MEET THE FOUNDER</p><h2>Shatrughan<br/><em>Sharma</em></h2><p className="lead">From humble beginnings to building a vision.</p><div className="rule"/><p>Shatrughan Sharma came to Pune in 1996, with responsibilities, determination, and a willingness to build from the ground up. Over 28+ years, his journey has evolved from hands-on work to building a company founded on craftsmanship, trust, and commitment.</p><p>Today, his experience and vision continue to shape Cosyhaven Studio — bringing together people, design, and precision to create spaces built to last.</p><div className="timeline"><span><b>1996</b>The Beginning</span><span><b>28+</b>Years of Experience</span><span><b>Today</b>Building Cozyhaven Studio</span></div></div></section>

      <section id="work" className="work section"><div className="section-intro"><p className="eyebrow">04 · SELECTED PROJECTS</p><h2>Spaces with<br/><em>intention.</em></h2></div><div className="project-feature"><div className="project-image"><img src={projects[activeProject].image} alt={projects[activeProject].name}/><span>0{activeProject + 1} / 08</span></div><div className="project-copy"><p className="eyebrow">Featured Project</p><h3>{projects[activeProject].name}</h3><p>{projects[activeProject].place}</p><div className="project-dots">{projects.map((project, index) => <button key={project.name} className={index === activeProject ? 'active' : ''} onClick={() => setActiveProject(index)} aria-label={`View ${project.name}`}/>)}</div></div></div><div className="project-index">{projects.map((project, index) => <button key={project.name} className={index === activeProject ? 'active' : ''} onMouseEnter={() => setActiveProject(index)} onClick={() => setActiveProject(index)}><span>0{index + 1}</span><strong>{project.name}</strong><small>{project.place}</small></button>)}</div></section>

      <section id="manufacturing" className="manufacturing section"><div><p className="eyebrow">05 · MANUFACTURING UNIT</p><h2>Precision.<br/><em>Craftsmanship. Scale.</em></h2><p>Our in-house manufacturing unit brings quality, accuracy, and smooth execution under one roof.</p></div><div className="machine-grid"><figure><img src="/panel saw machine.jpeg" alt="Panel saw machine"/><figcaption>01 — Panel Saw Machine<br/><small>Precision cutting for accurate dimensions.</small></figcaption></figure><figure><img src="/xpress pressing machine.jpeg" alt="Xpress pressing machine"/><figcaption>02 — Xpress Pressing Machine<br/><small>Uniform pressing for strong and durable components.</small></figcaption></figure><figure><img src="/multi boring machine.jpeg" alt="Multi boring machine"/><figcaption>03 — Multi Boring Machine<br/><small>Precision drilling for seamless furniture assembly.</small></figcaption></figure><figure><img src="/pvc edge banding machine.jpeg" alt="PVC edge banding machine"/><figcaption>04 — PVC Edge Banding Machine<br/><small>Clean, durable edges for a refined finish.</small></figcaption></figure></div></section>

      <section id="contact" className="contact section"><p className="eyebrow">06 · START A CONVERSATION</p><h2>Let's create something<br/><em>built to last.</em></h2><p>Tell us about your space and let’s shape it together.</p><div className="actions"><a className="button gold" href="mailto:cozyhavenstudio9@gmail.com">Start a project ↗</a><a className="button line" href="https://wa.me/919561611052" target="_blank" rel="noreferrer">WhatsApp us ↗</a></div><div className="contact-grid"><div><small>Phone / WhatsApp</small><a href="tel:9561611052">9561611052</a></div><div><small>Email</small><a href="mailto:cozyhavenstudio9@gmail.com">cozyhavenstudio9@gmail.com</a></div><div><small>Office Address</small><a href="https://www.google.com/maps/search/?api=1&query=New+Wakad+Hinjawadi+Link+Rd+Bhatewara+Nagar+Hinjawadi+Wakad+Pimpri-Chinchwad+Maharashtra+411057" target="_blank" rel="noreferrer">New Wakad - Hinjawadi Link Rd, Bhatewara Nagar, Hinjawadi, Wakad, Pimpri-Chinchwad, Maharashtra 411057</a></div><div><small>Business Hours</small><span>10:00 AM – 9:30 PM<br/>Sunday – Monday · 7 Days</span></div></div></section>
    </main>
    <footer><div className="footer-brand">COZYHAVEN <b>STUDIO</b><p>Crafting Space. Creating Dreams.</p></div><div className="footer-links"><a href="#work">Work</a><a href="#studio">Studio</a><a href="#services">Services</a><a href="#contact">Contact</a></div><div className="footer-links"><a href="https://www.instagram.com/cozyhavenstudio?igsi=cjR5dm5udnBjN3o=" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://youtube.com/@cozyhavenstudio?si=mwLGt4kNMWMq-wgA" target="_blank" rel="noreferrer">YouTube ↗</a><a href="mailto:cozyhavenstudio9@gmail.com">Email ↗</a></div><small>© 2023 Cozyhaven Studio · 9561611052</small></footer>
  </div>
}
