import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from './hooks/useReveal'
import { useCountUp } from './hooks/useCountUp'

type Project = { name: string; place: string; image?: string }
type ServiceItem = { num: string; title: string; desc: string; includes: string[]; images: { src: string; label: string }[] }

const serviceItems: ServiceItem[] = [
  {
    num: '01',
    title: 'Architecture & Interior Design',
    desc: 'Creating thoughtful architectural and interior spaces that balance aesthetics, functionality, materiality, and the way people experience a space.',
    includes: ['Architectural design', 'Interior design', 'Space planning', 'Concept development', 'Material & finish selection', 'Detailed design & visualization'],
    images: [
      { src: '/project1.jpeg', label: 'VJ Yashwin Supernova, Wakad' },
      { src: '/project2.jpeg', label: 'ANP Memento, Wakad' },
      { src: '/empire-square.jpeg', label: 'Empire Square' },
      { src: '/mg-opera.jpeg', label: 'MG Opera, Wakad' },
      { src: '/gaikwad-nirvana.jpeg', label: 'Gaikwad Nirvana' },
    ],
  },
  {
    num: '02',
    title: 'Modular Manufacturing',
    desc: 'Precision-crafted modular furniture and components manufactured with quality materials, refined detailing, and controlled execution.',
    includes: ['Modular kitchens', 'Wardrobes', 'Custom furniture', 'Storage solutions', 'Modular furniture components', 'Precision manufacturing & finishing'],
    images: [
      { src: '/project12.jpeg', label: 'Modular Kitchen' },
      { src: '/project3.jpeg', label: 'Kumar Presidency, Koregaon Park' },
      { src: '/project6.jpeg', label: 'Sukhwani Kingsley, Wakad' },
      { src: '/austin-arena.jpeg', label: 'Austin Arena' },
      { src: '/project17.jpeg', label: 'Custom Study & Storage' },
    ],
  },
  {
    num: '03',
    title: 'Turnkey Execution',
    desc: 'End-to-end execution — everything handled under one roof, from design and planning to final finishing and handover. One studio, one point of contact, zero coordination overhead.',
    includes: ['POP & false ceiling', 'Electrical work', 'Plumbing', 'Painting & flooring', 'Modular furniture', 'Interior finishing', 'Complete site execution'],
    images: [
      { src: '/aloha-wakad.jpeg', label: 'Aloha, Wakad' },
      { src: '/project9.jpeg', label: 'Study & Living — Full Execution' },
      { src: '/project11.jpeg', label: 'Entry Foyer — Complete Finish' },
      { src: '/project14.jpeg', label: 'TV Unit & Room — Turnkey' },
      { src: '/life-republic.jpeg', label: 'Life Republic' },
    ],
  },
]

const featuredProjects: Project[] = [
  { name: 'MG Opera', place: 'Wakad', image: '/project1.jpeg' },
  { name: 'Gaikwad Nirvana', place: 'Pune', image: '/gaikwad-nirvana.jpeg' },
  { name: 'VJ Supernova', place: 'Wakad', image: '/vj-supernova.jpeg' },
  { name: 'Yashone Infinitee', place: 'Punawale', image: '/vj-supernova.jpeg' },
  { name: 'VTP Belair', place: 'Pune', image: '/vtp-belair.jpeg' },
  { name: 'RGS Forte', place: 'Pune', image: '/rgs-forte.jpeg' },
  { name: 'Austin Arena', place: 'Pune', image: '/austin-arena.jpeg' },
  { name: 'Empire Square', place: 'Pune', image: '/empire-square.jpeg' },
  { name: 'VJ Supernova 2', place: 'Wakad', image: '/vj-supernova-2.jpeg' },
  { name: 'Kamalraj Athens', place: 'Wakad', image: '/life-republic-r7.jpeg' },
  { name: 'Life Republic', place: 'Pune', image: '/life-republic.jpeg' },
  { name: 'Life Republic R7', place: 'Pune', image: '/life-republic-r7.jpeg' },
  { name: 'Aloha Wakad', place: 'Wakad', image: '/aloha-wakad.jpeg' },
  { name: 'Stellar Homes', place: 'Hinjewadi', image: '/austin-arena.jpeg' },
]

const moreProjects: Project[] = [
  { name: 'ANP Memento', place: 'Wakad' },
  { name: 'Kumar Presidency', place: 'Koregaon Park' },
  { name: 'Park Titan', place: 'Wakad' },
  { name: 'The Address', place: 'Baner' },
  { name: 'Sukhwani Kingsley', place: 'Wakad' },
  { name: 'Sukhwani Skylines', place: 'Wakad' },
  { name: 'Park 59', place: 'Pimpri' },
  { name: 'Ganga Legend', place: 'Bavdhan' },
  { name: 'Runwal The Central Park', place: 'Pimpri-Chinchwad' },
]

const machines = [
  { num: '01', name: 'Panel Saw Machine', desc: 'Precision cutting for accurate dimensions.', image: '/panel-saw-machine.jpeg' },
  { num: '02', name: 'Xpress Pressing Machine', desc: 'Uniform pressing for strong and durable components.', image: '/xpress-pressing-machine.jpeg' },
  { num: '03', name: 'Multi Boring Machine', desc: 'Precision drilling for seamless furniture assembly.', image: '/multi-boring-machine.jpeg' },
  { num: '04', name: 'PVC Edge Banding Machine', desc: 'Clean, durable edges for a refined finish.', image: '/pvc-edge-banding-machine.jpeg' },
]

function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2)
  return (
    <div ref={ref} className={`reveal-wrap ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className={`reveal-inner ${className}`}>{children}</div>
    </div>
  )
}

function StatItem({ stat, index, visible }: { stat: { value: string; label: string; detail?: string; subLabel?: string; countTo?: number; suffix?: string }; index: number; visible: boolean }) {
  const count = useCountUp(stat.countTo || 0, visible && stat.countTo !== undefined)
  return (
    <div className="stat-card" style={{ transitionDelay: `${index * 0.12}s` }}>
      <div className="stat-card-inner">
        <span className="stat-label">{`0${index + 1}`}</span>
        <div className="stat-heading">{stat.label}</div>
        {stat.detail && <div className="stat-detail">{stat.detail}</div>}
        <div className="stat-value">
          {stat.countTo !== undefined ? <>{count}<em>{stat.suffix !== undefined ? stat.suffix : '+'}</em></> : stat.value}
        </div>
        <div className="stat-divider" />
        <span className="stat-text">{stat.subLabel || stat.label}</span>
      </div>
    </div>
  )
}

function TimelineStat({ value, countTo, label, visible }: { value?: string; countTo?: number; label: string; visible: boolean }) {
  const count = useCountUp(countTo || 0, visible && countTo !== undefined, 2200)
  return <span><b>{countTo !== undefined ? <>{count}{value || ''}</> : value}</b>{label}</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeService, setActiveService] = useState<number | null>(null)
  const [formOpen, setFormOpen] = useState(false)
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
  const moreProjectsReveal = useReveal<HTMLDivElement>(0.15)
  const residentialReveal = useReveal<HTMLDivElement>(0.2)
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
      if (next < 0) return featuredProjects.length - 1
      if (next >= featuredProjects.length) return 0
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

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
          <img src="/cozyhaven-logo.jpeg" alt="Cozyhaven Studio" />
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
            <img className="hero-image" src="/hero-main.jpeg" alt="Cozyhaven Studio interior" fetchPriority="high" />
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
              <button className="button line" onClick={() => setFormOpen(true)}>Get in touch</button>
            </div>
          </div>
          <div className="hero-rail hero-rail-left"><span>01</span><i /><span>14</span></div>
          <div className="hero-rail hero-rail-right">Architecture<br />Interiors<br />Furniture<br />Execution</div>
          <button className="scroll-note" onClick={() => scrollTo('studio')}>
            <span className="scroll-text">Scroll to explore</span>
            <span className="scroll-arrow"><span /></span>
          </button>
        </section>

        {/* ABOUT */}
        <section id="studio" className="about section" ref={aboutReveal.ref}>
          <div className={`about-visual ${aboutReveal.visible ? 'is-visible' : ''}`}>
            <div className="about-image-main">
              <img src="/aboutus-main.jpeg" alt="Cozyhaven Studio interior project" loading="lazy" />
            </div>
            <div className="about-image-sub">
              <img src="/about-us-small.jpeg" alt="Interior design detail" loading="lazy" />
            </div>
            <div className="about-image-label">The Studio</div>
          </div>
          <div className={`about-copy ${aboutReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">01 · ABOUT THE STUDIO</p>
            <h2>Thoughtful spaces,<br /><em>made to last.</em></h2>
            <div className="rule" />
            <p>CozyHaven Studio is a design and execution studio creating thoughtful spaces that blend aesthetics, functionality, and craftsmanship.</p>
            <p>From architectural exteriors and refined interiors to customized furniture and complete design execution, we bring every detail together with precision. Our team of skilled architects, designers, engineers, craftsmen and project experts transforms ideas into modern, functional, and inspiring spaces — crafted to reflect the people who live and work in them.</p>
            <div className="mini-stats">
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
            {serviceItems.map((service, index) => {
              const isOpen = activeService === index
              return (
                <div
                  className={`service-row ${isOpen ? 'is-open' : ''}`}
                  key={service.num}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveService(isOpen ? null : index)}
                  role="button"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveService(isOpen ? null : index) } }}
                >
                  <div className="service-row-head">
                    <span className="service-num">{service.num}</span>
                    <div className="service-body">
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                    </div>
                    <span className="service-arrow" aria-hidden="true">{isOpen ? '↑' : '→'}</span>
                  </div>
                  <div className="service-expand" aria-hidden={!isOpen}>
                    <div className="service-expand-inner">
                      <div className="service-includes">
                        {service.includes.map((item) => (
                          <span key={item} className="service-tag">{item}</span>
                        ))}
                      </div>
                      <div className="service-gallery">
                        <div className="service-gallery-feature">
                          <img src={service.images[0].src} alt={service.images[0].label} loading="lazy" />
                        </div>
                        <div className="service-gallery-grid">
                          {service.images.slice(1).map((img) => (
                            <div className="service-gallery-item" key={img.src}>
                              <img src={img.src} alt={img.label} loading="lazy" />
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="service-line" />
                </div>
              )
            })}
          </div>
        </section>

        {/* WHAT MAKES US UNIQUE */}
        <section className="statement" ref={statementReveal.ref}>
          <div className="statement-bg-text">CRAFTSMANSHIP</div>
          <div className={`statement-inner ${statementReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">WHAT MAKES US UNIQUE</p>
            <h2>Craftsmanship is<br /><em>in the detail.</em></h2>
            <div className="stat-grid">
              <StatItem stat={{ label: 'Founded By', detail: 'BTS Furniture', value: '30', subLabel: 'Years of Experience', suffix: '', countTo: 30 }} index={0} visible={statementReveal.visible} />
              <StatItem stat={{ label: 'Manufacturing', value: 'In-House', subLabel: 'Precision production' }} index={1} visible={statementReveal.visible} />
              <StatItem stat={{ label: 'Execution', value: 'End-to-End', subLabel: 'Complete project delivery' }} index={2} visible={statementReveal.visible} />
              <StatItem stat={{ label: 'Scale', value: 'Built for Scale', subLabel: 'Large & Custom Projects' }} index={3} visible={statementReveal.visible} />
              <StatItem stat={{ label: '3D & 2D', value: 'Visualisation', subLabel: 'Design clarity' }} index={4} visible={statementReveal.visible} />
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section className="founder section" ref={founderReveal.ref}>
          <div className={`founder-photo ${founderReveal.visible ? 'is-visible' : ''}`}>
            <img src="/founder.jpeg" alt="Shatrughan Sharma, founder of CozyHaven Studio" loading="lazy" />
            <div className="founder-photo-label">
              <span>Shatrughan Sharma</span>
              <span>Founder</span>
            </div>
            <div className="founder-photo-num">01</div>
          </div>
          <div className={`founder-copy ${founderReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">03 · MEET THE FOUNDERS</p>
            <h2>The hands behind<br /><em>CozyHaven Studio.</em></h2>
            <div className="founder-profile founder-profile-primary">
              <span className="founder-profile-num">01</span>
              <h3>Shatrughan Sharma</h3>
              <p className="founder-role">Founder · CozyHaven Studio</p>
              <p>Shatrughan Sharma came to Pune in 1996 with determination and a willingness to build from the ground up. Over 28+ years, his journey has grown from hands-on work into a company founded on craftsmanship, trust, and commitment.</p>
              <p>Today, his experience and vision continue to shape CozyHaven Studio — bringing together people, design, and precision to create spaces built to last.</p>
            </div>
            <div className="founder-divider" />
            <div className="founder-profile founder-profile-secondary">
              <span className="founder-profile-num">02</span>
              <h3>Roshan Sharma</h3>
              <p className="founder-role">Co-Founder | CozyHaven Studio</p>
              <p>A B.Tech Engineering graduate from Savitribai Phule Pune University (SPPU), with an additional degree in VFX &amp; Animation, Roshan brings together technical expertise, creative thinking, and business insight.</p>
              <p>With hands-on industry experience in project management, client coordination, and business operations, he focuses on business development, strategic growth, innovation, and operational excellence — helping shape the studio into a trusted, forward-thinking brand.</p>
            </div>
            <div className="timeline">
              <TimelineStat countTo={1996} label="The Beginning" visible={founderReveal.visible} />
              <TimelineStat countTo={28} value="+" label="Years of Experience" visible={founderReveal.visible} />
              <TimelineStat value="Today" label="Building BTS Furniture & CozyHaven Studio" visible={founderReveal.visible} />
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
              {featuredProjects.map((project, index) => (
                <img
                  key={project.name}
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className={index === activeProject ? 'is-active' : ''}
                />
              ))}
              <div className="project-counter"><span>{String(activeProject + 1).padStart(2, '0')}</span><i /><span>{String(featuredProjects.length).padStart(2, '0')}</span></div>
              {cursorOver && !dragging && (
                <div className="project-drag-hint">Drag</div>
              )}
            </div>
            <div className="project-copy">
              <p className="eyebrow">Featured Project</p>
              <div className="project-detail" key={activeProject}>
                <span className="project-detail-num">{String(activeProject + 1).padStart(2, '0')}</span>
                <h3>{featuredProjects[activeProject].name}</h3>
                <p>{featuredProjects[activeProject].place}</p>
              </div>
              <div className="project-nav">
                <button onClick={() => changeProject(-1)} aria-label="Previous project">←</button>
                <button onClick={() => changeProject(1)} aria-label="Next project">→</button>
              </div>
              <div className="project-dots">
                {featuredProjects.map((project, index) => (
                  <button key={project.name} className={index === activeProject ? 'active' : ''} onClick={() => setActiveProject(index)} aria-label={`View ${project.name}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="project-index">
            {featuredProjects.map((project, index) => (
              <button
                key={project.name}
                className={index === activeProject ? 'active' : ''}
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => setActiveProject(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.name}</strong>
                <small>{project.place}</small>
                <div className="project-index-line" />
              </button>
            ))}
          </div>
        </section>

        {/* MORE PROJECTS */}
        <section className="more-projects" ref={moreProjectsReveal.ref}>
          <div className={`more-projects-inner ${moreProjectsReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">SELECTED PROJECTS</p>
            <h2>More Projects</h2>
            <div className="more-projects-list">
              {moreProjects.map((project, index) => (
                <div className="more-projects-item" key={project.name} style={{ transitionDelay: `${index * 0.06}s` }}>
                  <span className="more-projects-num">{String(index + 1).padStart(2, '0')}</span>
                  <div className="more-projects-content">
                    <strong>{project.name}</strong>
                    <small>{project.place}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESIDENTIAL SCALE */}
        <section className="residential-scale" ref={residentialReveal.ref}>
          <div className="residential-scale-bg" />
          <div className="residential-scale-grid" />
          <div className={`residential-scale-inner ${residentialReveal.visible ? 'is-visible' : ''}`}>
            <p className="residential-scale-locations">Pune&nbsp;&nbsp;•&nbsp;&nbsp;Mumbai&nbsp;&nbsp;•&nbsp;&nbsp;Kolhapur&nbsp;&nbsp;•&nbsp;&nbsp;Solapur&nbsp;&nbsp;•&nbsp;&nbsp;Bengaluru&nbsp;&nbsp;•&nbsp;&nbsp;Hyderabad&nbsp;&nbsp;•&nbsp;&nbsp;Goa&nbsp;&nbsp;•&nbsp;&nbsp;+ Across India</p>
            <h2 className="residential-scale-heading">2BHK <span className="residential-scale-arrow">→</span> 5BHK <span className="residential-scale-plus">+</span> Bungalows</h2>
            <p className="residential-scale-sub">Residential projects of every scale</p>
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
              <button className="button gold" onClick={() => setFormOpen(true)}>Get in touch <span className="arrow">→</span></button>
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
            <span>© 2026 CozyHaven Studio. All rights reserved.</span>
            <span>Crafting Space. Creating Dreams.</span>
          </div>
        </div>
      </footer>

      {/* CONTACT OPTIONS MODAL */}
      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setFormOpen(false)} aria-label="Close">✕</button>
            <p className="eyebrow">GET IN TOUCH</p>
            <h3>Start a project</h3>
            <p className="modal-sub">Reach out and let's shape your space together.</p>
            <div className="actions" style={{ flexDirection: 'column', gap: '12px' }}>
              <a className="button gold" href="tel:+919561611052">Call Us · +91 95616 11052 <span className="arrow">→</span></a>
              <a className="button line" href="https://wa.me/919561611052" target="_blank" rel="noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
