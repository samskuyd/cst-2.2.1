// src/components/sections/HeroSection.tsx
import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button'; // Pastikan path ini benar
import { Rocket, ChevronDown, Lock } from 'lucide-react'; // Lock icon
import { toast } from 'sonner'; // Untuk notifikasi

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPos = window.scrollY;
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.2');
        (el as HTMLElement).style.transform = `translateY(${scrollPos * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string, event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
        event.preventDefault(); 
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const headerElement = document.querySelector('header#main-header'); 
      const headerHeight = headerElement ? headerElement.offsetHeight : 60; 
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight + 70;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Section with ID "${sectionId}" not found for scrolling.`);
    }
  };

  const handleBeginMissionClick = (event: React.MouseEvent<HTMLElement>) => {
    scrollToSection('join', event); 
  };

  const handleViewWhitepaperClick = () => {
    // Fungsi ini sekarang hanya menampilkan toast
    toast.info('Whitepaper: Access Sequestered - Awaiting Full Protocol Alignment!', { 
        position: 'bottom-center',
        duration: 3000,
        icon: <Lock className="h-4 w-4 text-yellow-400" />
    });
  };
  
  return (
    <section 
      id="mission" 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/40 to-black z-0"></div>
      <div className="tech-grid absolute inset-0 opacity-10 z-0"></div>
      
      {/* Floating Ship & Planet */}
      <div 
        className="absolute w-64 h-64 md:w-96 md:h-96 opacity-30 md:opacity-40 parallax animate-float" 
        data-speed="-0.1"
        style={{
          top: '15%', left: '10%',
          backgroundImage: "url('/assets/images/king.png')", 
          backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.8) hue-rotate(140deg)',
        }}
      ></div>
      <div 
        className="absolute w-40 h-40 md:w-72 md:h-72 opacity-20 md:opacity-30 parallax" 
        data-speed="0.05"
        style={{
          bottom: '5%', right: '10%',
          backgroundImage: "url('/assets/images/smoketron_planet.png')", 
          backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.8) hue-rotate(60deg)',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-4 inline-block">
          <Rocket className="h-12 w-12 md:h-16 md:w-16 text-cyan-glow mx-auto mb-4 animate-pulse" />
        </div>
        
        <div className="space-y-1 mb-6">
          <p className="text-cyan-glow font-exo uppercase tracking-widest text-sm md:text-base">Transmission Intercepted: Year 2025</p>
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white glow-text">
            Welcome to the <br /> <span className="text-cyan-glow">$CIGAR</span> Experience
          </h1>
        </div>
        
        <p className="font-spaceMono text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          $CIGAR is more than a token. It's a mission. And you're now part of it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={handleBeginMissionClick}
            className="font-bold tracking-wider"
          >
            Begin The Mission
          </Button>
          
          {/* Tombol View Whitepaper dengan efek "Tergembok" */}
          <div className="relative group"> {/* Kontainer untuk tombol dan badge */}
            {/* Tidak ada lagi elemen img atau div untuk rantai di sini */}
            
            <Button 
              variant="outline" 
              size="lg" 
              glowColor="magenta" 
              onClick={handleViewWhitepaperClick} // Tetap bisa diklik untuk menampilkan toast
              className="font-bold tracking-wider text-magenta-glow/70 hover:text-magenta-glow/90 border-magenta-glow/50 hover:border-magenta-glow/70 cursor-pointer focus:ring-0 relative"
              // Kelas opacity-70 diubah menjadi text-magenta-glow/70 dan border-magenta-glow/50
              // untuk memberi kesan pudar tapi ikon tetap solid.
              // z-0 tidak lagi diperlukan jika tidak ada overlay rantai.
            >
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-400" /> {/* Ikon Gembok */}
              View Whitepaper
            </Button>

            {/* Badge "LOCKED" */}
            <span 
              className="absolute -top-3 -right-4 z-20 {/* Naikkan z-index jika perlu agar di atas tombol */}
                         bg-red-600/90 backdrop-blur-sm border-2 border-red-400/70 text-white 
                         text-xs sm:text-sm font-black px-3 py-1 rounded-lg shadow-xl 
                         shadow-red-500/50 transform transition-all duration-300 
                         group-hover:scale-110 group-hover:bg-red-500 pointer-events-none rotate-[-6deg] group-hover:rotate-[-3deg]"
            >
              LOCKED
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        onClick={(e) => scrollToSection('lore', e)}
      >
        <div className="flex flex-col items-center">
          <span className="text-cyan-glow text-sm mb-2 font-exo">Scroll to Explore</span>
          <ChevronDown className="h-6 w-6 text-cyan-glow animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
