import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from './hooks/useReveal'
import { useCountUp } from './hooks/useCountUp'

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

const services = [
  { title: 'Architecture & Interior Execution', desc: 'Designing and executing interiors and exteriors from concept to completion.', image: '/project9.jpeg' },
  { title: 'Residential Interiors', desc: 'Creating elegant, comfortable, and functional spaces made for everyday living.', image: '/project11.jpeg' },
  { title: 'Furniture Manufacturing', desc: 'Crafting custom furniture with quality materials and precise workmanship.', image: '/project12.jpeg' },
  { title: 'Turnkey Projects', desc: 'Managing everything from design and civil work to finishing — under one roof.', image: '/project13.jpeg' },
  { title: 'Customized Solutions', desc: 'Tailored spaces and furniture designed around your needs and style.', image: '/project14.jpeg' },
]

const machines = [
  { num: '01', name: 'Panel Saw Machine', desc: 'Precision cutting for accurate dimensions.', image: '/panel saw machine.jpeg' },
  { num: '02', name: 'Xpress Pressing Machine', desc: 'Uniform pressing for strong and durable components.', image: '/xpress pressing machine.jpeg' },
  { num: '03', name: 'Multi Boring Machine', desc: 'Precision drilling for seamless furniture assembly.', image: '/multi boring machine.jpeg' },
  { num: '04', name: 'PVC Edge Banding Machine', desc: 'Clean, durable edges for a refined finish.', image: '/pvc edge banding machine.jpeg' },
]

const projectTypes = ['Residential Interior', 'Commercial Interior', 'Architecture', 'Furniture', 'Turnkey Project', 'Other']

function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2)
  return (
    <div ref={ref} className={`reveal-wrap ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className={`reveal-inner ${className}`}>{children}</div>
    </div>
  )
}

function StatItem({ stat, index, visible }: { stat: { value: string; label: string; countTo?: number }; index: number; visible: boolean }) {
  const count = useCountUp(stat.countTo || 0, visible && stat.countTo !== undefined)
  return (
    <div className="stat-card" style={{ transitionDelay: `${index * 0.12}s` }}>
      <div className="stat-card-inner">
        <span className="stat-label">{`0${index + 1}`}</span>
        <div className="stat-value">
          {stat.countTo !== undefined ? <>{count}<em>+</em></> : stat.value}
        </div>
        <div className="stat-divider" />
        <span className="stat-text">{stat.label}</span>
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [cursorOver, setCursorOver] = useState(false)

  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const projectImageRef = useRef<HTMLDivElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)

  const aboutReveal = useReveal<HTMLDivElement>(0.15)
  const servicesReveal = useReveal<HTMLDivElement>(0.1)
  const statementReveal = useReveal<HTMLDivElement>(0.2)
  const founderReveal = useReveal<HTMLDivElement>(0.15)
  const workReveal = useReveal<HTMLDivElement>(0.1)
  const mfgReveal = useReveal<HTMLDivElement>(0.1)
  const contactReveal = useReveal<HTMLDivElement>(0.15)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (heroBgRef.current) {
        const scrolled = window.scrollY
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.25}px) scale(${1 + scrolled * 0.0002})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || formOpen ? 'hidden' : ''
  }, [menuOpen, formOpen])

  const closeMenu = () => setMenuOpen(false)

  const changeProject = useCallback((dir: number) => {
    setActiveProject((prev) => {
      const next = prev + dir
      if (next < 0) return projects.length - 1
      if (next >= projects.length) return 0
      return next
    })
  }, [])

  // Drag / swipe handlers
  const onDragStart = (e: React.PointerEvent) => {
    setDragging(true)
    dragStartX.current = e.clientX
    dragDelta.current = 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onDragMove = (e: React.PointerEvent) => {
    if (!dragging) return
    dragDelta.current = e.clientX - dragStartX.current
  }
  const onDragEnd = () => {
    if (!dragging) return
    setDragging(false)
    if (Math.abs(dragDelta.current) > 50) {
      changeProject(dragDelta.current > 0 ? -1 : 1)
    }
    dragDelta.current = 0
  }

  const scrollTo = (id: string) => {
    closeMenu()
    setFormOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormOpen(false)
    }, 3500)
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
          <img src="/cozyhaven logo.jpeg" alt="Cozyhaven Studio" />
          <span>COZYHAVEN <b>STUDIO</b></span>
        </a>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work') }}>Work</a>
          <a href="#studio" onClick={(e) => { e.preventDefault(); scrollTo('studio') }}>Studio</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>Services</a>
          <a href="#manufacturing" onClick={(e) => { e.preventDefault(); scrollTo('manufacturing') }}>Manufacturing</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a>
        </nav>
        <button className={`menu-button ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><i /><i /></button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" ref={heroBgRef}>
            <img className="hero-image" src="/hero main.jpeg" alt="Cozyhaven Studio interior" fetchPriority="high" />
          </div>
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-eyebrow">COZYHAVEN STUDIO · EST. 2023</p>
            <h1>
              <span className="hero-line"><span>Crafting Space.</span></span>
              <span className="hero-line"><span><em>Creating Dreams.</em></span></span>
            </h1>
            <p className="hero-copy">Architecture · Interior Design · Furniture Manufacturing · Turnkey Execution</p>
            <div className="actions">
              <button className="button gold" onClick={() => scrollTo('work')}>Explore our work <span className="arrow">→</span></button>
              <button className="button line" onClick={() => setFormOpen(true)}>Start a project</button>
            </div>
          </div>
          <button className="scroll-note" onClick={() => scrollTo('studio')}>
            <span className="scroll-text">Scroll to explore</span>
            <span className="scroll-arrow"><span /></span>
          </button>
        </section>

        {/* ABOUT */}
        <section id="studio" className="about section" ref={aboutReveal.ref}>
          <div className={`about-visual ${aboutReveal.visible ? 'is-visible' : ''}`}>
            <div className="about-image-main">
              <img src="/about studio.jpeg" alt="Cozyhaven Studio workspace" loading="lazy" />
            </div>
            <div className="about-image-sub">
              <img src="/project15.jpeg" alt="Interior detail" loading="lazy" />
            </div>
            <div className="about-image-label">The Studio</div>
          </div>
          <div className={`about-copy ${aboutReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">01 · ABOUT THE STUDIO</p>
            <h2>Thoughtful spaces,<br /><em>made to last.</em></h2>
            <div className="rule" />
            <p>Cosyhaven Studio is a design and execution studio creating thoughtful spaces that blend aesthetics, functionality, and craftsmanship.</p>
            <p>From architectural exteriors and refined interiors to customized furniture and complete design execution, we bring every detail together with precision. Our team of skilled designers, craftsmen, and project experts transforms ideas into modern, functional, and inspiring spaces — crafted to reflect the people who live and work in them.</p>
            <div className="mini-stats">
              <span><b>15+</b>Years of Experience</span>
              <span><b>200+</b>Projects Completed</span>
            </div>
          </div>
        </section>

        {/* SERVICES / WHAT WE DO */}
        <section id="services" className="services section" ref={servicesReveal.ref}>
          <div className={`section-intro ${servicesReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">02 · WHAT WE DO</p>
            <h2>Design, detail<br /><em>& delivery.</em></h2>
          </div>
          <div className={`service-list ${servicesReveal.visible ? 'is-visible' : ''}`}>
            {services.map((service, index) => (
              <div className="service-row" key={service.title} style={{ transitionDelay: `${index * 0.1}s` }}>
                <span className="service-num">0{index + 1}</span>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <div className="service-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <span className="service-arrow">→</span>
                <div className="service-line" />
              </div>
            ))}
          </div>
        </section>

        {/* WHAT MAKES US UNIQUE */}
        <section className="statement" ref={statementReveal.ref}>
          <div className="statement-bg-text">CRAFTSMANSHIP</div>
          <div className={`statement-inner ${statementReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">WHAT MAKES US UNIQUE</p>
            <h2>Craftsmanship is<br /><em>in the detail.</em></h2>
            <div className="stat-grid">
              <StatItem stat={{ value: '15+', label: 'Years of Experience', countTo: 15 }} index={0} visible={statementReveal.visible} />
              <StatItem stat={{ value: 'In-House', label: 'Manufacturing' }} index={1} visible={statementReveal.visible} />
              <StatItem stat={{ value: 'End-to-End', label: 'Execution' }} index={2} visible={statementReveal.visible} />
              <StatItem stat={{ value: 'Built for Scale', label: 'Large & Custom Projects' }} index={3} visible={statementReveal.visible} />
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="founder section" ref={founderReveal.ref}>
          <div className={`founder-photo ${founderReveal.visible ? 'is-visible' : ''}`}>
            <img src="/founder.jpeg" alt="Shatrughan Sharma, founder" loading="lazy" />
            <div className="founder-photo-label">
              <span>Shatrughan Sharma</span>
              <span>Founder</span>
            </div>
            <div className="founder-photo-num">01</div>
          </div>
          <div className={`founder-copy ${founderReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">03 · MEET THE FOUNDER</p>
            <h2>Shatrughan<br /><em>Sharma</em></h2>
            <p className="lead">From humble beginnings to building a vision.</p>
            <div className="rule" />
            <p>Shatrughan Sharma came to Pune in 1996, with responsibilities, determination, and a willingness to build from the ground up. Over 28+ years, his journey has evolved from hands-on work to building a company founded on craftsmanship, trust, and commitment.</p>
            <p>Today, his experience and vision continue to shape Cosyhaven Studio — bringing together people, design, and precision to create spaces built to last.</p>
            <div className="timeline">
              <span><b>1996</b>The Beginning</span>
              <span><b>28+</b>Years of Experience</span>
              <span><b>Today</b>Building Cozyhaven Studio</span>
            </div>
          </div>
        </section>

        {/* SELECTED PROJECTS */}
        <section id="work" className="work section" ref={workReveal.ref}>
          <div className={`section-intro ${workReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">04 · SELECTED PROJECTS</p>
            <h2>Spaces with<br /><em>intention.</em></h2>
          </div>
          <div className={`project-feature ${workReveal.visible ? 'is-visible' : ''}`}>
            <div
              className="project-image"
              ref={projectImageRef}
              onPointerDown={onDragStart}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerLeave={onDragEnd}
              onMouseEnter={() => setCursorOver(true)}
              onMouseLeave={() => setCursorOver(false)}
              style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            >
              {projects.map((project, index) => (
                <img
                  key={project.name}
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className={index === activeProject ? 'is-active' : ''}
                />
              ))}
              <div className="project-counter"><span>0{activeProject + 1}</span><i /><span>0{projects.length}</span></div>
              {cursorOver && !dragging && (
                <div className="project-drag-hint">Drag</div>
              )}
            </div>
            <div className="project-copy">
              <p className="eyebrow">Featured Project</p>
              <div className="project-detail">
                <span className="project-detail-num">{`0${activeProject + 1}`}</span>
                <h3>{projects[activeProject].name}</h3>
                <p>{projects[activeProject].place}</p>
              </div>
              <div className="project-nav">
                <button onClick={() => changeProject(-1)} aria-label="Previous project">←</button>
                <button onClick={() => changeProject(1)} aria-label="Next project">→</button>
              </div>
              <div className="project-dots">
                {projects.map((project, index) => (
                  <button key={project.name} className={index === activeProject ? 'active' : ''} onClick={() => setActiveProject(index)} aria-label={`View ${project.name}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="project-index">
            {projects.map((project, index) => (
              <button
                key={project.name}
                className={index === activeProject ? 'active' : ''}
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => setActiveProject(index)}
              >
                <span>0{index + 1}</span>
                <strong>{project.name}</strong>
                <small>{project.place}</small>
                <div className="project-index-line" />
              </button>
            ))}
          </div>
        </section>

        {/* MANUFACTURING */}
        <section id="manufacturing" className="manufacturing section" ref={mfgReveal.ref}>
          <div className={`mfg-intro ${mfgReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">05 · MANUFACTURING UNIT</p>
            <h2>Precision.<br /><em>Craftsmanship. Scale.</em></h2>
            <p>Our in-house manufacturing unit brings quality, accuracy, and smooth execution under one roof.</p>
          </div>
          <div className={`machine-grid ${mfgReveal.visible ? 'is-visible' : ''}`}>
            {machines.map((machine, index) => (
              <figure key={machine.num} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="machine-image-wrap">
                  <img src={machine.image} alt={machine.name} loading="lazy" />
                  <span className="machine-num">{machine.num}</span>
                </div>
                <figcaption>
                  <h4>{machine.name}</h4>
                  <small>{machine.desc}</small>
                </figcaption>
              </figure>
            ))}
            <figure style={{ transitionDelay: `${4 * 0.1}s` }}>
              <div className="machine-image-wrap">
                <img src="/staking.jpeg" alt="Raw material storage" loading="lazy" />
                <span className="machine-num">05</span>
              </div>
              <figcaption>
                <h4>Raw Material Storage</h4>
                <small>Organized storage for efficient production and smooth execution.</small>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact" ref={contactReveal.ref}>
          <div className="contact-bg">
            <img src="/project16.jpeg" alt="" loading="lazy" />
          </div>
          <div className="contact-shade" />
          <div className={`contact-inner ${contactReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">06 · START A CONVERSATION</p>
            <h2>Let's create something<br /><em>built to last.</em></h2>
            <p>Tell us about your space and let's shape it together.</p>
            <div className="actions">
              <button className="button gold" onClick={() => setFormOpen(true)}>Start a project <span className="arrow">→</span></button>
              <a className="button line" href="https://wa.me/919561611052" target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.3A10 10 0 1 0 12 2z" /><path d="M8.5 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2.1.4 0 .5l-.4.5c-.1.2-.3.3-.1.6a6 6 0 0 0 2.9 2.5c.3.1.4 0 .6-.2l.4-.5c.2-.2.3-.2.6-.1l1.5.8c.2.1.3.2.3.4v.6c0 .3-.3.6-.5.7a3 3 0 0 1-2.3 0 8 8 0 0 1-4.3-4 3 3 0 0 1-.3-2.4z" fill="currentColor" stroke="none" /></svg>
                WhatsApp us
              </a>
            </div>
            <div className="contact-grid">
              <div><small>Phone / WhatsApp</small><a href="tel:9561611052">9561611052</a></div>
              <div><small>Email</small><a href="mailto:cozyhavenstudio9@gmail.com">cozyhavenstudio9@gmail.com</a></div>
              <div><small>Office Address</small><a href="https://www.google.com/maps/search/?api=1&query=New+Wakad+Hinjawadi+Link+Rd+Bhatewara+Nagar+Hinjawadi+Wakad+Pimpri-Chinchwad+Maharashtra+411057" target="_blank" rel="noreferrer">New Wakad - Hinjawadi Link Rd, Bhatewara Nagar, Hinjawadi, Wakad, Pimpri-Chinchwad, Maharashtra 411057</a></div>
              <div><small>Business Hours</small><span>10:00 AM – 9:30 PM<br />Sunday – Monday · 7 Days</span></div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-wordmark">COZYHAVEN</div>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo">COZYHAVEN <b>STUDIO</b></span>
              <p>Architecture · Interior Design · Furniture · Turnkey Execution</p>
              <small>Est. 2023</small>
            </div>
            <div className="footer-links">
              <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>Home</a>
              <a href="#studio" onClick={(e) => { e.preventDefault(); scrollTo('studio') }}>About</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>Services</a>
              <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work') }}>Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a>
            </div>
            <div className="footer-links">
              <a href="https://www.instagram.com/cozyhavenstudio?igsi=cjR5dm5udnBjN3o=" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://youtube.com/@cozyhavenstudio?si=mwLGt4kNMWMq-wgA" target="_blank" rel="noreferrer">YouTube ↗</a>
              <a href="https://wa.me/919561611052" target="_blank" rel="noreferrer">WhatsApp ↗</a>
              <a href="mailto:cozyhavenstudio9@gmail.com">Email ↗</a>
              <a href="tel:9561611052">9561611052</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <span>© 2026 Cozyhaven Studio. All rights reserved.</span>
            <span>Crafting Space. Creating Dreams.</span>
          </div>
        </div>
      </footer>

      {/* PROJECT ENQUIRY MODAL */}
      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setFormOpen(false)} aria-label="Close form">✕</button>
            {!formSubmitted ? (
              <>
                <p className="eyebrow">PROJECT ENQUIRY</p>
                <h3>Start a project</h3>
                <p className="modal-sub">Tell us about your space and we'll get back to you.</p>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <label>Name<input type="text" required placeholder="Your name" /></label>
                    <label>Phone<input type="tel" required placeholder="Phone number" /></label>
                  </div>
                  <div className="form-row">
                    <label>Email<input type="email" required placeholder="Email address" /></label>
                    <label>Project Type
                      <select required defaultValue="">
                        <option value="" disabled>Select type</option>
                        {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="form-row">
                    <label>Project Location<input type="text" placeholder="City / Area" /></label>
                    <label>Approximate Budget<input type="text" placeholder="₹ Range" /></label>
                  </div>
                  <label className="form-full">Tell us about your project<textarea rows={3} placeholder="Share your vision..." /></label>
                  <button type="submit" className="button gold form-submit">Submit project enquiry <span className="arrow">→</span></button>
                </form>
              </>
            ) : (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Thank you</h3>
                <p>Your enquiry has been received. We'll be in touch shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
