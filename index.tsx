import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Scale, Gavel, Shield, Briefcase, Users, FileText, ArrowRight, Menu, X, ChevronRight, Phone, Mail, MapPin, CheckCircle, Instagram, Linkedin, Facebook, Clock, Quote } from 'lucide-react';

// Declaration for GSAP usage since we are loading it via script tag
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for animations
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const valuesRef = useRef(null);
  const aboutRef = useRef(null);
  const areasRef = useRef(null);
  const testimonialsRef = useRef(null);
  const testimonialSliderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Hero Animation
      const tl = window.gsap.timeline();
      tl.fromTo(textRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );

      // Values Animation
      window.gsap.fromTo(".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          }
        }
      );

      // About Image Parallax
      window.gsap.to(".about-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }, 
      });

      // Stats Counter Animation
      window.gsap.utils.toArray(".stat-number").forEach((el: any) => {
        const endValue = parseInt(el.getAttribute("data-target"));
        window.gsap.to(el, {
          innerText: endValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Infinite Testimonial Carousel
      const ctx = window.gsap.context(() => {
        const animation = window.gsap.to(testimonialSliderRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 40,
          ease: "linear",
        });

        // Pause on hover
        testimonialSliderRef.current.addEventListener("mouseenter", () => animation.pause());
        testimonialSliderRef.current.addEventListener("mouseleave", () => animation.play());
      }, testimonialsRef);

      return () => ctx.revert();
    }
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'O Escritório', href: '#sobre' },
    { name: 'Atuação', href: '#atuacao' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  const testimonials = [
    {
      name: "Carlos Eduardo Mendes",
      role: "CEO, TechSolutions",
      text: "A agilidade e a precisão técnica da equipe foram fundamentais para o sucesso da reestruturação da nossa empresa. Profissionais de altíssimo nível."
    },
    {
      name: "Fernanda Alencar",
      role: "Diretora Comercial",
      text: "Senti-me amparada durante todo o processo. A humanidade no atendimento combinada com a competência jurídica é o diferencial deles."
    },
    {
      name: "Roberto Campos",
      role: "Investidor Imobiliário",
      text: "Assessoria impecável em contratos complexos. A visão estratégica da Passarelli Advocacia evitou prejuízos e garantiu segurança aos meus negócios."
    },
    {
      name: "Juliana Vilela",
      role: "Gerente de RH",
      text: "A consultoria trabalhista preventiva reduziu drasticamente nosso passivo. Parceiros essenciais para o nosso crescimento sustentável."
    },
    {
      name: "André Souza",
      role: "Empresário",
      text: "Excelente atuação no contencioso cível. Conseguiram reverter uma situação que parecia perdida com uma tese jurídica brilhante."
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal-dark font-sans selection:bg-gold-500 selection:text-white overflow-x-hidden">
      
      {/* Top Bar - Desktop Only */}
      <div className={`fixed top-0 left-0 w-full z-[60] bg-black border-b border-white/10 transition-transform duration-500 ease-in-out ${scrolled ? '-translate-y-full' : 'translate-y-0'} hidden md:block h-12`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center text-xs tracking-wide">
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold-500" />
              <span>Seg - Sex: 09h às 18h</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gold-500" />
              <span>(11) 99999-9999</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
             <span className="text-gray-600">|</span>
             <a href="#" className="hover:text-gold-400 transition-colors"><Instagram size={16}/></a>
             <a href="#" className="hover:text-gold-400 transition-colors"><Linkedin size={16}/></a>
             <a href="#" className="hover:text-gold-400 transition-colors"><Facebook size={16}/></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b ${
          scrolled 
            ? 'top-0 bg-charcoal/95 backdrop-blur-md border-gold-500/20 py-4 shadow-2xl' 
            : 'top-0 md:top-12 bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="text-gold-400 w-8 h-8" strokeWidth={1.5} />
            <span className="font-serif text-2xl tracking-widest text-white font-semibold">
              PASSARELLI <span className="text-gold-400 font-light">ADVOCACIA</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="px-6 py-2 border border-gold-500/50 text-gold-400 hover:bg-gold-500 hover:text-charcoal-dark transition-all duration-300 uppercase text-xs tracking-widest font-semibold rounded-sm">
              Fale Conosco
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gold-400">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-charcoal-dark border-b border-gold-500/20 p-6 flex flex-col gap-4 md:hidden animate-fade-in-down z-50 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
             {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-center text-gray-300 hover:text-gold-400 uppercase tracking-widest py-3 border-b border-white/5 last:border-0"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Contact & Socials Info */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center gap-4 text-gray-400">
               <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-gold-500" />
                  <span>Seg - Sex: 09h às 18h</span>
               </div>
               <div className="flex gap-6 mt-2">
                 <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 transition-colors"><Instagram size={18}/></a>
                 <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 transition-colors"><Linkedin size={18}/></a>
                 <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 transition-colors"><Facebook size={18}/></a>
               </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/90 via-charcoal-dark/60 to-charcoal-dark z-10"></div>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop" 
            alt="Law Office Interior" 
            className="w-full h-[120%] -mt-[10%] object-cover opacity-60 hero-bg"
          />
        </div>

        <div ref={textRef} className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-16 md:mt-0">
          <div className="inline-block mb-6">
            <div className="h-[1px] w-24 bg-gold-500 mb-2 mx-auto"></div>
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs md:text-sm font-medium">Tradição & Modernidade</p>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-8 leading-tight">
            PASSARELLI <br />
            <span className="text-gold-gradient font-semibold">ADVOCACIA</span>
          </h1>

          <p className="font-sans text-gray-300 text-base md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 px-4">
            Assessoria jurídica com alto padrão de qualidade desde 2005.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#contato" className="group relative px-8 py-4 bg-gold-gradient rounded-sm overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer w-full md:w-auto text-center">
              <span className="relative z-10 text-charcoal-dark font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
                Entre em Contato
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            <a href="#sobre" className="group px-8 py-4 border border-white/20 rounded-sm hover:border-gold-500/50 transition-all duration-300 backdrop-blur-sm cursor-pointer w-full md:w-auto text-center">
              <span className="text-white group-hover:text-gold-400 font-medium tracking-widest uppercase text-sm transition-colors">
                Conheça o Escritório
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Infinite Marquee Section */}
      <div className="bg-gold-500 py-3 overflow-hidden relative border-y border-gold-300 z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className="text-charcoal-dark font-serif font-bold tracking-widest text-sm uppercase">Excelência Jurídica</span>
              <span className="mx-6 text-charcoal-dark/50">•</span>
              <span className="text-charcoal-dark font-serif font-bold tracking-widest text-sm uppercase">20 Anos de História</span>
              <span className="mx-6 text-charcoal-dark/50">•</span>
              <span className="text-charcoal-dark font-serif font-bold tracking-widest text-sm uppercase">Ética & Transparência</span>
              <span className="mx-6 text-charcoal-dark/50">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* About / Split Section */}
      <section id="sobre" ref={aboutRef} className="py-24 bg-charcoal-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] overflow-hidden rounded-sm border border-white/10 group">
              <div className="absolute inset-0 bg-gold-500/10 z-10 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" 
                alt="Meeting Room" 
                className="about-image w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 bg-charcoal/90 backdrop-blur-md p-6 border-l-4 border-gold-500">
                <p className="text-gold-400 font-serif text-2xl mb-1">Fundado em 2005</p>
                <p className="text-gray-400 text-xs tracking-widest uppercase">São Paulo, Brasil</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <div className="mb-8">
                 <span className="text-gold-400 uppercase tracking-[0.2em] text-xs font-semibold">Sobre Nós</span>
                 <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6 leading-tight">
                   Defendendo seus direitos com <span className="text-gold-gradient">maestria</span>.
                 </h2>
                 <p className="text-gray-400 leading-relaxed font-light text-lg mb-6">
                   A Passarelli Advocacia se destaca não apenas pelo conhecimento técnico, mas pela compreensão profunda das necessidades de cada cliente. Combinamos a tradição do direito com estratégias modernas para entregar resultados.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300 text-sm">Atendimento personalizado e exclusivo para cada demanda.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300 text-sm">Equipe multidisciplinar e altamente qualificada.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="text-gold-500 mt-1 flex-shrink-0" size={20} />
                      <p className="text-gray-300 text-sm">Transparência total em todas as etapas processuais.</p>
                    </div>
                 </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 mt-8">
                 <div>
                   <h3 className="text-3xl md:text-4xl text-white font-serif mb-2"><span className="stat-number" data-target="20">0</span>+</h3>
                   <p className="text-gold-500 text-[10px] md:text-xs uppercase tracking-widest">Anos de Atuação</p>
                 </div>
                 <div>
                   <h3 className="text-3xl md:text-4xl text-white font-serif mb-2"><span className="stat-number" data-target="1500">0</span>+</h3>
                   <p className="text-gold-500 text-[10px] md:text-xs uppercase tracking-widest">Casos Resolvidos</p>
                 </div>
                 <div>
                   <h3 className="text-3xl md:text-4xl text-white font-serif mb-2">98%</h3>
                   <p className="text-gold-500 text-[10px] md:text-xs uppercase tracking-widest">Satisfação</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Nossos Valores</h2>
            <div className="w-16 h-[2px] bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Value 1 */}
            <div className="value-card group p-8 border border-white/5 bg-charcoal-light/50 hover:bg-charcoal-light hover:border-gold-500/30 transition-all duration-500 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gold-500 group-hover:h-full transition-all duration-500"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 group-hover:scale-110 transition-transform duration-500">
                <Briefcase size={28} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-gold-200 transition-colors">Excelência</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                Compromisso com a qualidade e precisão técnica em cada trabalho realizado.
              </p>
            </div>

            {/* Value 2 */}
            <div className="value-card group p-8 border border-white/5 bg-charcoal-light/50 hover:bg-charcoal-light hover:border-gold-500/30 transition-all duration-500 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gold-500 group-hover:h-full transition-all duration-500 delay-100"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 group-hover:scale-110 transition-transform duration-500">
                <Scale size={28} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-gold-200 transition-colors">Ética</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                Conduta pautada pela verdade, transparência e valores éticos elevados.
              </p>
            </div>

            {/* Value 3 */}
            <div className="value-card group p-8 border border-white/5 bg-charcoal-light/50 hover:bg-charcoal-light hover:border-gold-500/30 transition-all duration-500 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gold-500 group-hover:h-full transition-all duration-500 delay-200"></div>
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 group-hover:scale-110 transition-transform duration-500">
                <Users size={28} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-gold-200 transition-colors">Experiência</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                Advogados gabaritados com visão local e global em diversas áreas do direito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Practice */}
      <section id="atuacao" ref={areasRef} className="py-24 bg-charcoal-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold-400 uppercase tracking-[0.2em] text-xs font-semibold">Expertise</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6">Áreas de Atuação</h2>
              <p className="text-gray-400 font-light text-lg">
                Oferecemos assessoria jurídica completa em diversas áreas do direito.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-gold-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold group">
              Ver Todas as Áreas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AreaCard title="Direito Civil" description="Principal ramo do direito privado." icon={<Scale size={24} />} />
            <AreaCard title="Direito Empresarial" description="Estudo das sociedades empresárias." icon={<Briefcase size={24} />} />
            <AreaCard title="Direito do Consumidor" description="Defesa dos direitos dos consumidores." icon={<Users size={24} />} />
            <AreaCard title="Direito Trabalhista" description="Relações entre empregados e empregadores." icon={<Gavel size={24} />} />
            <AreaCard title="Direito Administrativo" description="Normas que regem órgãos e atividades públicas." icon={<Shield size={24} />} />
            <AreaCard title="Planejamento Sucessório" description="Estruturas para partilha do patrimônio familiar." icon={<FileText size={24} />} />
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/30 text-gold-400 rounded-sm hover:bg-gold-500/10 transition-colors uppercase text-sm tracking-widest">
              Ver Todas as Áreas
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" ref={testimonialsRef} className="py-24 bg-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <span className="text-gold-400 uppercase tracking-[0.2em] text-xs font-semibold">Depoimentos</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-4">O Que Dizem Nossos Clientes</h2>
          </div>
        </div>

        <div className="w-full relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none"></div>
          
          <div className="overflow-hidden flex">
            <div ref={testimonialSliderRef} className="flex gap-8 w-max pl-6 pr-6">
              {/* Duplicate array for infinite loop */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="w-[85vw] md:w-[450px] p-8 bg-charcoal-light border border-white/5 rounded-sm relative group hover:border-gold-500/30 transition-colors duration-300">
                  <div className="absolute top-8 right-8 text-gold-500/20 group-hover:text-gold-500/40 transition-colors">
                    <Quote size={40} />
                  </div>
                  <div className="mb-6">
                    <h4 className="text-white font-serif text-lg">{t.name}</h4>
                    <p className="text-gold-500 text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed italic text-sm relative z-10">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-charcoal relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-4xl text-white mb-6">Entre em Contato</h2>
              <p className="text-gray-400 mb-12 font-light text-lg">
                Estamos prontos para ouvir seu caso. Agende uma consulta com nossos especialistas.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-500/10 rounded-sm text-gold-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg">Telefone</h4>
                    <p className="text-gray-400 mt-1">+55 (11) 99999-9999</p>
                    <p className="text-gray-500 text-sm">Seg - Sex, 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-500/10 rounded-sm text-gold-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg">E-mail</h4>
                    <p className="text-gray-400 mt-1">contato@passarelli.adv.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-500/10 rounded-sm text-gold-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg">Localização</h4>
                    <p className="text-gray-400 mt-1">Av. Paulista, 1000 - Bela Vista</p>
                    <p className="text-gray-400">São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-charcoal-light p-8 md:p-10 rounded-sm border border-white/5 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold-500 font-semibold">Nome</label>
                    <input type="text" className="w-full bg-black/20 border-b border-white/10 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold-500 font-semibold">Telefone</label>
                    <input type="tel" className="w-full bg-black/20 border-b border-white/10 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500 font-semibold">E-mail</label>
                  <input type="email" className="w-full bg-black/20 border-b border-white/10 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500 font-semibold">Mensagem</label>
                  <textarea rows={4} className="w-full bg-black/20 border-b border-white/10 text-white p-3 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600" placeholder="Descreva brevemente sua necessidade..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gold-gradient py-4 text-charcoal-dark font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300 mt-4">
                  Enviar Mensagem
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                <Scale className="text-gold-400 w-6 h-6" />
                <span className="font-serif text-xl tracking-widest text-white font-semibold">
                  PASSARELLI
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Excelência jurídica e compromisso ético para defender seus interesses com a máxima dedicação.
              </p>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-white font-serif mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-gold-400 transition-colors cursor-pointer">Sobre Nós</li>
                <li className="hover:text-gold-400 transition-colors cursor-pointer">Áreas de Atuação</li>
                <li className="hover:text-gold-400 transition-colors cursor-pointer">Equipe</li>
                <li className="hover:text-gold-400 transition-colors cursor-pointer">Blog Jurídico</li>
              </ul>
            </div>

             <div className="col-span-1 md:col-span-2">
              <h4 className="text-white font-serif mb-6">Newsletter</h4>
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-sm mb-2">Receba atualizações jurídicas exclusivas.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="flex-1 bg-white/5 border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button className="bg-white/10 text-white py-3 px-6 hover:bg-gold-600 hover:text-charcoal-dark transition-colors uppercase text-xs tracking-widest font-semibold">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 Passarelli Advocacia. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-gold-400 cursor-pointer transition-colors">Política de Privacidade</span>
              <span className="hover:text-gold-400 cursor-pointer transition-colors">Termos de Uso</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[40] p-4 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Fale conosco no WhatsApp"
      >
        <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors"></div>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

// Subcomponent for Area Cards
const AreaCard = ({ title, description, icon }: { title: string, description: string, icon: any }) => (
  <div className="group p-8 bg-charcoal-light border border-white/5 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 cursor-default">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 rounded-full bg-black/40 text-gold-500 group-hover:text-white group-hover:bg-gold-500 transition-all duration-300">
        {React.cloneElement(icon, { strokeWidth: 1.5 })}
      </div>
      <ChevronRight className="text-gray-600 group-hover:text-gold-400 transition-colors opacity-0 group-hover:opacity-100" size={18} />
    </div>
    <h3 className="text-white font-serif text-lg mb-3 group-hover:text-gold-200 transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm font-light leading-relaxed group-hover:text-gray-400 transition-colors">
      {description}
    </p>
  </div>
);

// Styles for custom animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  .animate-fade-in-down {
    animation: fadeInDown 0.3s ease-out forwards;
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);