import { useState, useEffect, useRef } from 'react';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isInView;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-nordic-900 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-semibold text-nordic-900 text-lg tracking-tight">AuraGrid</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#about" className="text-sm text-nordic-600 hover:text-nordic-900 transition-colors duration-300">About</a>
            <a href="#services" className="text-sm text-nordic-600 hover:text-nordic-900 transition-colors duration-300">Services</a>
            <a href="#approach" className="text-sm text-nordic-600 hover:text-nordic-900 transition-colors duration-300">Approach</a>
            <a href="#contact" className="text-sm text-nordic-600 hover:text-nordic-900 transition-colors duration-300">Contact</a>
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="inline-flex items-center px-5 py-2.5 bg-nordic-900 text-white text-sm font-medium rounded-full hover:bg-nordic-800 transition-all duration-300 hover:shadow-lg">
              Get in Touch
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><path d="M4 8h16"/><path d="M4 16h16"/></>}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-nordic-100 px-6 py-6 space-y-4">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block text-nordic-700 py-2">About</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="block text-nordic-700 py-2">Services</a>
          <a href="#approach" onClick={() => setMobileOpen(false)} className="block text-nordic-700 py-2">Approach</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-nordic-700 py-2">Contact</a>
          <a href="#contact" className="inline-flex items-center px-5 py-2.5 bg-nordic-900 text-white text-sm font-medium rounded-full mt-4">
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-nordic-900"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-fade-in-up opacity-0-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light text-sage text-sm font-medium rounded-full mb-8">
                <span className="w-2 h-2 bg-sage rounded-full"></span>
                Berlin-based Engineering Consultancy
              </span>
            </div>

            <h1 className="animate-fade-in-up opacity-0-start delay-100 text-5xl lg:text-7xl font-light text-nordic-900 leading-[1.1] tracking-tight mb-8">
              Powering<br/>
              <span className="font-serif italic font-normal">tomorrow's</span><br/>
              energy grid
            </h1>

            <p className="animate-fade-in-up opacity-0-start delay-200 text-lg text-nordic-500 leading-relaxed max-w-lg mb-10">
              We deliver innovative engineering and consulting services for modern power systems — guiding utilities and renewable energy developers through the evolving energy landscape.
            </p>

            <div className="animate-fade-in-up opacity-0-start delay-300 flex flex-wrap gap-4">
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 bg-nordic-900 text-white text-sm font-medium rounded-full hover:bg-nordic-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                Explore Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#about" className="inline-flex items-center gap-2 px-7 py-3.5 border border-nordic-200 text-nordic-700 text-sm font-medium rounded-full hover:border-nordic-400 transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>

          <div className="animate-fade-in opacity-0-start delay-400 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-sage-light/50 to-blue-50 rounded-3xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-nordic-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-br from-nordic-100 to-nordic-50 rounded-xl flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-sage-light to-green-50 rounded-xl flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6b8f71" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '200+', label: 'Projects Delivered' },
    { number: '50+', label: 'Utility Partners' },
    { number: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <section ref={ref} className="py-20 bg-nordic-50 border-y border-nordic-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-4xl lg:text-5xl font-light text-nordic-900 mb-2">{stat.number}</div>
              <div className="text-sm text-nordic-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-sm font-medium text-sage tracking-wider uppercase mb-4 block">About Us</span>
            <h2 className="text-4xl lg:text-5xl font-light text-nordic-900 leading-tight mb-8">
              Engineering a<br/>
              <span className="font-serif italic">sustainable</span> future
            </h2>
            <div className="space-y-6 text-nordic-600 leading-relaxed">
              <p>
                At AuraGrid Solutions, we specialize in providing cutting-edge engineering and consulting services aimed at transforming power systems for a sustainable future.
              </p>
              <p>
                Our mission is to guide utilities, renewable energy developers, and industries through the evolving energy landscape, ensuring grid resilience, reliability, and operational efficiency.
              </p>
              <p>
                We deliver solutions that create a cleaner, smarter, and more resilient electricity network — supporting the transition to renewable energy at every step.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="bg-nordic-50 rounded-2xl p-10 lg:p-14">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b8f71" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-nordic-900 mb-1">Grid Resilience</h4>
                      <p className="text-sm text-nordic-500">Building robust systems that withstand modern challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-nordic-900 mb-1">Innovation First</h4>
                      <p className="text-sm text-nordic-500">Leveraging latest technologies for optimal solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                        <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-nordic-900 mb-1">Clean Energy</h4>
                      <p className="text-sm text-nordic-500">Accelerating the transition to renewable sources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h18v18H3zM3 9h18M9 21V9"/>
        </svg>
      ),
      title: 'Transmission & Distribution Planning',
      description: 'Expert planning and analysis to optimize the efficiency and reliability of your utility\'s grid infrastructure.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      title: 'Power System Studies',
      description: 'In-depth studies and simulations to ensure your grid meets operational and regulatory standards.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ),
      title: 'Renewable Energy Integration',
      description: 'Comprehensive strategies for integrating renewable energy sources and inverter-based technologies into existing power systems.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Grid Code Compliance',
      description: 'Navigate the complexities of grid code requirements for utilities and energy providers with confidence.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      title: 'Smart Grid Technologies',
      description: 'Advising on the latest smart grid advancements to enhance operational efficiency and grid intelligence.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 20h20M5 20V10l7-7 7 7v10M9 20v-6h6v6"/>
        </svg>
      ),
      title: 'Industrial Power Systems',
      description: 'Specialized consulting on design and engineering of industrial power systems for manufacturing and processing facilities.',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-24 lg:py-32 bg-nordic-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <span className={`text-sm font-medium text-sage tracking-wider uppercase mb-4 block transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>What We Do</span>
          <h2 className={`text-4xl lg:text-5xl font-light text-nordic-900 leading-tight transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Comprehensive power<br/>
            <span className="font-serif italic">system solutions</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group bg-white rounded-2xl p-8 border border-nordic-100 hover:border-nordic-200 hover:shadow-lg transition-all duration-500 cursor-default ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-nordic-50 group-hover:bg-sage-light flex items-center justify-center text-nordic-600 group-hover:text-sage transition-all duration-300 mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-medium text-nordic-900 mb-3">{service.title}</h3>
              <p className="text-sm text-nordic-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const steps = [
    { num: '01', title: 'Discovery', desc: 'We begin by understanding your unique challenges, goals, and existing infrastructure.' },
    { num: '02', title: 'Analysis', desc: 'Our engineers conduct thorough studies and simulations to identify optimal solutions.' },
    { num: '03', title: 'Strategy', desc: 'We develop a comprehensive roadmap tailored to your specific requirements.' },
    { num: '04', title: 'Implementation', desc: 'We guide you through execution, ensuring seamless integration and results.' },
  ];

  return (
    <section id="approach" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-sm font-medium text-sage tracking-wider uppercase mb-4 block">Our Approach</span>
            <h2 className="text-4xl lg:text-5xl font-light text-nordic-900 leading-tight mb-8">
              A methodical path to<br/>
              <span className="font-serif italic">excellence</span>
            </h2>
            <p className="text-nordic-600 leading-relaxed">
              Our proven methodology ensures every project delivers measurable results. We combine deep technical expertise with strategic thinking to transform complex power system challenges into elegant solutions.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="text-3xl font-light text-nordic-200 group-hover:text-sage transition-colors duration-300">{step.num}</div>
                  <div>
                    <h4 className="font-medium text-nordic-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-nordic-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 bg-nordic-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-sage"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-medium text-sage-light tracking-wider uppercase mb-4 block">Get Started</span>
          <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
            Ready to transform<br/>
            <span className="font-serif italic">your power systems?</span>
          </h2>
          <p className="text-nordic-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Discover how we can support your energy transition. Let's discuss your challenges and explore solutions together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:info@auragridsolutions.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-nordic-900 text-sm font-medium rounded-full hover:bg-nordic-100 transition-all duration-300 hover:shadow-xl">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>
              </svg>
              Contact Us
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 border border-nordic-700 text-white text-sm font-medium rounded-full hover:border-nordic-500 transition-all duration-300">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-nordic-900 border-t border-nordic-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-white font-medium">AuraGrid Solutions</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#about" className="text-sm text-nordic-400 hover:text-white transition-colors">About</a>
            <a href="#services" className="text-sm text-nordic-400 hover:text-white transition-colors">Services</a>
            <a href="#approach" className="text-sm text-nordic-400 hover:text-white transition-colors">Approach</a>
            <a href="#contact" className="text-sm text-nordic-400 hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-sm text-nordic-500">
            © 2024 AuraGrid Solutions. Berlin, Germany.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navigation />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Approach />
      <Contact />
      <Footer />
    </div>
  );
}
