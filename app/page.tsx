/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// COMPONENTS
// ============================================================================

const AbstractMist = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mistData, setMistData] = useState<any[]>([]);
  
  useEffect(() => {
    const newMist = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: 0.8 + Math.random() * 1.5,
      opacity: 0.05 + Math.random() * 0.1,
      background: i % 3 === 0 ? "var(--color-merona-red)" : i % 3 === 1 ? "var(--color-merona-gold)" : "var(--color-merona-purple)",
      blur: 20 + Math.random() * 20,
    }));
    
    requestAnimationFrame(() => {
      setMistData(newMist);
    });
  }, []);

  useGSAP(() => {
    if (mistData.length === 0) return;
    
    const particles = gsap.utils.toArray(".mist-particle");
    particles.forEach((p: any) => {
      gsap.to(p, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        rotation: "random(-30, 30)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 5)",
        force3D: true,
      });
    });
  }, { scope: containerRef, dependencies: [mistData] });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0c121d_0%,#050b14_100%)] pointer-events-none"></div>
      {mistData.map((data, i) => (
        <div 
          key={i} 
          className="mist-particle absolute w-32 h-32 rounded-full will-change-transform"
          style={{
            left: data.left,
            top: data.top,
            background: data.background,
            opacity: data.opacity,
            filter: `blur(${data.blur}px)`,
            transform: `scale(${data.scale})`
          }}
        ></div>
      ))}
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/1000/1000')] opacity-5 mix-blend-overlay"></div>
    </div>
  );
};

const OrbitalNav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isNavVisible = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      gsap.to(navRef.current, { y: 0, autoAlpha: 1, duration: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const isTriggerZone = e.clientY < window.innerHeight / 4;
      if (isTriggerZone && !isNavVisible.current) {
        isNavVisible.current = true;
        gsap.to(navRef.current, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", overwrite: true, force3D: true });
      } else if (!isTriggerZone && isNavVisible.current) {
        isNavVisible.current = false;
        gsap.to(navRef.current, { y: -200, autoAlpha: 0, duration: 0.8, ease: "expo.in", delay: 0.7, overwrite: true, force3D: true });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const scrollToInquire = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("inquire");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 pt-6 md:pt-10">
      <nav
        ref={navRef}
        style={{ transform: isMobile ? "translateY(0px)" : "translateY(-200px)", opacity: isMobile ? 1 : 0 }}
        className="pointer-events-auto relative flex items-center group"
      >
        {/* Eccentric Static Background */}
        <div className="absolute inset-0 bg-merona-red transform -skew-x-12 translate-x-3 translate-y-3 opacity-20"></div>
        <div className="absolute inset-0 bg-merona-gold transform skew-x-12 -translate-x-3 -translate-y-3 opacity-20"></div>
        
        <div className="relative flex items-stretch shadow-2xl border border-merona-gold/40 bg-merona-navy overflow-hidden">
          {/* Logo Section */}
          <button 
            type="button"
            onClick={scrollToTop}
            title="Back to top"
            className="bg-merona-gold p-4 md:p-6 flex items-center justify-center border-r border-merona-navy relative cursor-pointer hover:bg-merona-pearl transition-colors duration-300"
          >
            <span className="font-abril text-2xl md:text-3xl text-merona-navy leading-none">M.</span>
          </button>
          
          {/* Status/Generic Section */}
          <div className="flex items-center px-6 md:px-12 border-r border-merona-gold/20">
            <div className="flex flex-col">
              <span className="text-[10px] font-space font-bold text-merona-gold uppercase tracking-[0.2em]">Merona Media</span>
              <span className="text-[8px] font-mono text-merona-pearl/40 uppercase">Aesthete Collection 2026</span>
            </div>
          </div>

          {/* Action Section */}
          <button 
            type="button"
            onClick={scrollToInquire}
            aria-label="Scroll to inquiry section"
            className="bg-merona-pearl hover:bg-merona-gold transition-colors duration-300 px-6 md:px-10 flex items-center gap-3 group/action border-l border-merona-gold/20 cursor-pointer"
          >
             <span className="font-space font-bold text-[10px] md:text-xs tracking-widest text-merona-navy uppercase">Inquire</span>
             <ArrowUpRight className="w-4 h-4 text-merona-navy group-hover/action:translate-x-1 group-hover/action:-translate-y-1 transition-transform" />
          </button>
        </div>
      </nav>
    </div>
  );
};

const ZDiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%", // Reduced from 200%
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Scale massive text out towards the user
    // The visual pivot shouldn't drift drastically; using center origin
    tl.to(textRef.current, {
      scale: 30, // Reduced from 120 to drastically improve scrolling performance and prevent repainting spikes
      autoAlpha: 0, // Using autoAlpha prevents the gigantic scale from being processed in the invisible state
      ease: "power2.inOut",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-merona-navy">
      {/* Background rich texture video/image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/velvet/1920/1080" 
          alt="Abstract Velvet Texture" 
          className="w-full h-full object-cover opacity-60 mix-blend-color-dodge will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-merona-navy to-transparent"></div>
      </div>

      {/* Extreme Typography Z-Dive */}
      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center justify-center pointer-events-none transform-gpu will-change-transform" style={{ transformOrigin: "50% 50%" }}>
        <h2 className="font-space font-bold uppercase tracking-[0.5em] text-merona-gold text-sm md:text-xl mb-4">
          Merona Media
        </h2>
        <h1 className="font-playfair italic text-[15vw] leading-[0.8] text-merona-pearl drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] select-none">
          Design<br/>
          <span className="font-abril not-italic text-merona-red text-[18vw] tracking-tighter mix-blend-screen block">It<span className="inline-block relative">s<span className="absolute inset-0 text-white opacity-0">s</span></span>elf.</span>
        </h1>
      </div>
    </section>
  );
};

const PerspectiveShift = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Horizontal slide 
    const panels = gsap.utils.toArray('.facet-panel');
    
    gsap.to(trackRef.current, {
      x: () => -(trackRef.current?.scrollWidth || 0) + window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=230%", // Reduced from 300%
        pin: true,
        scrub: 0.5, // Reduced from 1 for snappier feel
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full overflow-hidden bg-merona-purple relative">
      <div ref={trackRef} className="flex h-full w-[300vw] will-change-transform transform-gpu">
        
        {/* Facet 1: The Medium - Cinematic Videography */}
        <div className="facet-panel w-screen h-full flex flex-col justify-center items-start px-[10vw] relative shrink-0 border-r border-merona-gold/10 overflow-hidden bg-[#0A050D]">
          {/* Awe-inspiring cinematic background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/cinematic_videography_1792755512947.jpg"
              alt="Cinematic Videography Set"
              className="w-full h-full object-cover opacity-35 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a050d] via-[#0a050d]/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a050d] via-transparent to-[#0a050d]/70"></div>
          </div>
          <div className="absolute top-1/4 right-[10vw] w-96 h-96 bg-merona-red rounded-full mix-blend-screen filter blur-[150px] opacity-35 pointer-events-none"></div>
          <span className="font-space text-merona-gold tracking-[0.3em] uppercase text-sm mb-6 relative z-10">01 // The Medium</span>
          <h2 className="font-abril text-6xl md:text-8xl text-merona-pearl leading-none max-w-4xl relative z-10">
            Cinematic<br/>
            <span className="text-stroke-gold">Videography.</span>
          </h2>
          <p className="mt-8 font-playfair italic text-2xl md:text-3xl text-merona-pearl/85 max-w-2xl border-l-[3px] border-merona-red pl-6 relative z-10 bg-black/40 backdrop-blur-sm p-4">
            We don&apos;t capture moments. We manufacture memories in 24 frames per second. An overwhelming visual assault disguised as elegance.
          </p>
        </div>

        {/* Facet 2: The Catalyst - Immersive Web Design */}
        <div className="facet-panel w-screen h-full flex flex-col justify-center items-start px-[10vw] relative shrink-0 border-r border-merona-gold/10 overflow-hidden bg-[#07130F]">
          {/* Awe-inspiring cyberspace interface background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/immersive_web_design_1792755512002.jpg"
              alt="Immersive Web Design Architecture"
              className="w-full h-full object-cover opacity-45 mix-blend-screen hover:opacity-65 transition-all duration-1000 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07130f] via-[#07130f]/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130f] via-transparent to-[#07130f]/70"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-merona-emerald rounded-full mix-blend-color-dodge filter blur-[200px] opacity-25 transform -translate-y-1/2 pointer-events-none"></div>
          <span className="font-space text-merona-gold tracking-[0.3em] uppercase text-sm mb-6 relative z-10">02 // The Interaction</span>
          <h2 className="font-abril text-6xl md:text-8xl text-merona-pearl leading-none max-w-4xl relative z-10">
            Immersive<br/>
            <span className="text-merona-emerald">Web Design.</span>
          </h2>
          <p className="mt-8 font-space text-lg text-merona-pearl/90 max-w-2xl relative z-10 bg-black/50 backdrop-blur-md p-6 border border-merona-emerald/40 shadow-2xl">
            A digital instrument playing the user. We build spaces that breathe, react, and remember. Brutal performance meets baroque opulence.
          </p>
        </div>

        {/* Facet 3: The Artifact - Editorial Book Design */}
        <div className="facet-panel w-screen h-full flex flex-col justify-center items-start px-[10vw] relative shrink-0 overflow-hidden bg-merona-navy">
          {/* Awe-inspiring editorial book design background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/editorial_book_design_1792755513967.jpg"
              alt="Editorial Book Design Masterpiece"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-merona-navy via-merona-navy/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-merona-navy via-transparent to-merona-navy/70"></div>
          </div>
          <span className="font-space text-merona-gold tracking-[0.3em] uppercase text-sm mb-6 relative z-10">03 // The Artifact</span>
          <h2 className="font-abril text-6xl md:text-8xl text-merona-pearl leading-none max-w-4xl relative z-10 drop-shadow-2xl">
            Editorial<br/>
            <span className="font-playfair italic text-merona-gold border-b-4 border-merona-red pb-2">Book Design.</span>
          </h2>
          <p className="mt-8 font-sans font-light text-xl text-merona-pearl/90 max-w-2xl relative z-10 bg-black/40 backdrop-blur-sm p-5 border-l-2 border-merona-gold">
            Weight, texture, and the irreversible permanence of ink. Typography engineered for an echoing impact in the physical realm.
          </p>
        </div>
      </div>
    </section>
  );
};

const ManifestoChamber = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Parallax marquees moving at different speeds
    gsap.to(".marquee-1", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(".marquee-2", {
      xPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-40 md:py-64 overflow-hidden bg-[#050B14]">
      {/* Background Marquees */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none overflow-hidden">
        <div className="marquee-1 whitespace-nowrap text-[8vw] font-abril text-merona-red w-[200vw]">
          MAXIMALISM FOREVER • MORE IS MORE • MAXIMALISM FOREVER • MORE IS MORE • MAXIMALISM FOREVER
        </div>
        <div className="marquee-2 whitespace-nowrap text-[8vw] font-space font-bold uppercase text-merona-gold w-[200vw] ml-[-100vw]">
          ABUNDANCE IS THE ONLY TRUTH — ABUNDANCE IS THE ONLY TRUTH — ABUNDANCE IS THE ONLY TRUTH
        </div>
        <div className="marquee-1 whitespace-nowrap text-[8vw] font-playfair italic text-merona-emerald w-[200vw]">
          DESIGN ITSELF • DESIGN ITSELF • DESIGN ITSELF • DESIGN ITSELF • DESIGN ITSELF
        </div>
      </div>

      {/* Center Statement */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-24 rounded-[3rem] shadow-[0_0_100px_rgba(139,26,46,0.2)] transform hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
          <h3 className="font-abril text-4xl md:text-6xl lg:text-7xl leading-tight text-center text-merona-pearl">
            We reject the <span className="text-stroke-gold">barren aesthetics</span> of modern minimalism.
          </h3>
          <p className="mt-12 text-center font-playfair italic text-2xl text-merona-pearl/80">
            Richness triggers desire. We engineer desire through sensory abundance, flawless curation, and absolute excess.
          </p>
        </div>
      </div>
    </section>
  );
};

const InteractiveLensShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);
  
  useGSAP(() => {
    gsap.set(".custom-lens", { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(".custom-lens", "x", { duration: 0.2, ease: "power3" });
    yTo.current = gsap.quickTo(".custom-lens", "y", { duration: 0.2, ease: "power3" });
  }, { scope: containerRef });

  // Custom cursor logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-40 min-h-screen bg-merona-navy overflow-hidden cursor-none"
      onMouseEnter={() => { setIsHovered(true); document.body.classList.add('show-lens'); }}
      onMouseLeave={() => { setIsHovered(false); document.body.classList.remove('show-lens'); }}
    >
      <div className="custom-lens will-change-transform"></div>
      
      <div className="px-[10vw] will-change-transform">
        <h2 className="font-space text-sm tracking-[0.4em] uppercase text-merona-gold mb-24 text-center">
          Forensic Examination
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 lg:gap-12 relative z-10">
          {[
            { 
              id: "01", 
              title: "Lens Coating", 
              img: "/images/forensic_lens_coating_1792755514249.jpg",
              desc: "Anti-reflective iridescent multi-layer nanocoating engineered for precision color transmission."
            },
            { 
              id: "02", 
              title: "Code Structure", 
              img: "/images/forensic_code_structure_1792755514565.jpg",
              desc: "Monolithic GPU-accelerated architectural logic executed with sub-millisecond precision."
            },
            { 
              id: "03", 
              title: "Ink Weight", 
              img: "/images/forensic_ink_weight_1792755514219.jpg",
              desc: "Viscous carbon pigment and gold leaf embedding into 600gsm raw cotton rag substrate."
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group flex flex-col">
              <div className="text-[120px] font-abril leading-none text-merona-red/20 absolute -top-16 -left-8 z-0 transition-transform group-hover:-translate-y-4 duration-500 select-none">
                {item.id}
              </div>
              <div className="relative z-10 overflow-hidden border-2 border-merona-gold/30 rounded-2xl aspect-square bg-[#050B14] shadow-2xl">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mix-blend-luminosity hover:mix-blend-normal"
                />
              </div>
              <div className="mt-8 flex items-baseline justify-between">
                <h4 className="font-playfair text-3xl font-bold text-merona-pearl">{item.title}</h4>
                <div className="w-12 h-[1px] bg-merona-gold"></div>
              </div>
              <p className="mt-4 font-space text-xs tracking-widest uppercase text-merona-pearl/70 pr-8 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CustomDropdown = ({ 
  options, 
  placeholder,
  required
}: { 
  options: {value: string, label: string}[], 
  placeholder: string,
  required?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-merona-navy border ${isOpen ? 'border-merona-gold' : 'border-merona-gold/20'} rounded-none px-5 py-3 font-sans text-sm focus:outline-none transition-colors cursor-pointer flex justify-between items-center group`}
      >
        <span className={selected ? 'text-merona-pearl' : 'text-merona-pearl/50'}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
        <div className="flex items-center justify-center">
            <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-merona-gold transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
        </div>
      </div>
      
      <div 
        className={`absolute z-50 w-full left-0 top-full mt-0 bg-merona-navy border border-merona-gold border-t-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
      >
        <div className="max-h-60 overflow-y-auto w-full relative z-10 flex flex-col">
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { setSelected(opt.value); setIsOpen(false); }}
              className="px-5 py-3.5 font-sans text-sm text-merona-pearl/80 hover:text-merona-navy hover:bg-merona-gold cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>{opt.label}</span>
              {selected === opt.value && <div className="w-1.5 h-1.5 bg-merona-navy rounded-none"></div>}
            </div>
          ))}
        </div>
      </div>
      <input type="hidden" required={required && !selected} name="serviceRequest" value={selected || ""} />
    </div>
  );
};

const TransactionalClimax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    // Reverse singularity effect
    gsap.from(capsuleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
      scale: 3,
      opacity: 0,
      y: 200,
      rotationX: 45,
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} id="inquire" className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-merona-navy group">
      
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <AbstractMist />
      </div>

      <div 
        ref={capsuleRef} 
        className="relative z-10 w-[90%] max-w-4xl p-8 md:p-16 rounded-none bg-merona-navy border border-merona-gold/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center transform-gpu overflow-hidden"
      >
        {/* Subtle glass effect on form capsule */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/1000/1000')] bg-blend-overlay opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-[1px] bg-merona-navy rounded-none pointer-events-none"></div>

        {!submitted ? (
          <>
            <h2 className="relative z-10 font-abril text-3xl md:text-6xl text-center text-merona-pearl mb-10 max-w-3xl leading-tight">
              It is time to fill a <span className="italic font-playfair text-merona-gold">super different form.</span>
            </h2>

            <form onSubmit={handleSubmit} className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-space text-[9px] uppercase tracking-widest text-merona-gold ml-2">Your Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="E.g. Alexander McQueen"
                  className="bg-merona-navy border border-merona-gold/20 rounded-none px-5 py-3 font-sans text-merona-pearl text-sm focus:outline-none focus:border-merona-gold transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-space text-[9px] uppercase tracking-widest text-merona-gold ml-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="hello@luxury.com"
                  className="bg-merona-navy border border-merona-gold/20 rounded-none px-5 py-3 font-sans text-merona-pearl text-sm focus:outline-none focus:border-merona-gold transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-space text-[9px] uppercase tracking-widest text-merona-gold ml-2">Service Request</label>
                <CustomDropdown 
                  placeholder="Select your medium"
                  options={[
                    { value: "videography", label: "Cinematic Videography" },
                    { value: "web", label: "Immersive Web Design" },
                    { value: "editorial", label: "Editorial Book Design" },
                    { value: "graphic", label: "Maximalist Graphics" },
                    { value: "other", label: "Bespoke Vision" }
                  ]}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-space text-[9px] uppercase tracking-widest text-merona-gold ml-2">Project Vision</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="Tell us about the design you need..."
                  className="bg-merona-navy border border-merona-gold/20 rounded-none px-5 py-3 font-sans text-merona-pearl text-sm focus:outline-none focus:border-merona-gold transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-5">
                <button type="submit" className="group/btn relative bg-merona-gold text-merona-navy px-10 py-3 rounded-none font-space font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-sm">
                  <span className="relative z-10">Send Request</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-merona-pearl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="relative z-10 text-center py-20">
            <h2 className="font-abril text-4xl md:text-6xl text-merona-pearl mb-6">Received.</h2>
            <p className="font-playfair italic text-2xl text-merona-gold">We will reach out when the design calls.</p>
          </div>
        )}
      </div>

    </section>
  );
};



// ============================================================================
// MAIN PAGE ASSEMBLE
// ============================================================================

export default function MeronaLanding() {
  return (
    <main className="w-full relative selection:bg-merona-gold selection:text-merona-navy">
      <OrbitalNav />
      <ZDiveHero />
      <PerspectiveShift />
      <InteractiveLensShowcase />
      <ManifestoChamber />
      <TransactionalClimax />
    </main>
  );
}
