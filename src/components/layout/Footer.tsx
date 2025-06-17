// src/components/layout/Footer.tsx
import React, { useCallback } from 'react';
import { Twitter, Github, Disc as Discord, Rocket, Lock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useSoundContext } from '../../contexts/SoundContext';

const SCROLL_THRESHOLD_FOOTER = 60;

const Footer: React.FC = () => {
  const { playSound } = useSoundContext();

  const scrollToSection = useCallback((sectionId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    // Pastikan event.preventDefault() selalu dipanggil di awal
    event.preventDefault();
    playSound('/assets/sounds/robot-click.wav');
    console.log(`[Footer] Attempting to scroll to section: ${sectionId}`); // Untuk debugging

    const section = document.getElementById(sectionId);
    if (section) {
      const headerElement = document.querySelector('header#main-header');
      const headerHeight = headerElement ? headerElement.offsetHeight : SCROLL_THRESHOLD_FOOTER;

      const additionalPaddingBelowHeader = 40;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight + additionalPaddingBelowHeader;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    } else {
      console.warn(`[Footer] Section with ID "${sectionId}" not found for scrolling.`);
    }
  }, [playSound]);

  const navigationItems = [
    { name: 'Mission', id: 'mission' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Technology', id: 'technology' },
    { name: 'Community', id: 'community' },
    { name: 'Join', id: 'join' },
  ];

  const resourceItems = [
    { name: 'Whitepaper', type: 'locked', id: 'whitepaper_footer_resource' },
    { name: 'Tokenomics', type: 'locked', id: 'tokenomics_footer_resource' },
    { name: 'FAQs', type: 'coming_soon', id: 'faqs_footer_resource' },
    { name: 'Claim Airdrop', type: 'coming_soon', path: '/claim', id: 'claim_airdrop_link' },
  ];

  const legalItems = [
    { name: 'Terms of Service', path: '/terms-of-service', id: 'terms_of_service_link' },
    { name: 'Privacy Policy', path: '/privacy-policy', id: 'privacy_policy_link' },
  ];

  const handleResourceClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, resource: typeof resourceItems[0]) => {
    // Pastikan event.preventDefault() selalu dipanggil di awal
    event.preventDefault();
    playSound('/assets/sounds/robot-click.wav');
    console.log(`[Footer] Resource clicked: ${resource.name}`); // Untuk debugging

    if (resource.type === 'locked') {
      const message = resource.name === 'Whitepaper'
        ? 'Whitepaper: Access Sequestered - Awaiting Full Protocol Alignment!'
        : 'Tokenomics: Systems Locked - Access Pending Transmission!';
      toast.info(message, {
        position: 'bottom-center',
        duration: 3000,
        icon: <Lock className="h-4 w-4 text-yellow-400" />
      });
    } else if (resource.type === 'coming_soon') {
      toast.info(`${resource.name}: Information Matrix Compiling - Standby for Update!`, {
        position: 'bottom-center',
        duration: 3000,
        icon: <HelpCircle className="h-4 w-4 text-blue-400" />
      });
    }
    // Tidak ada tipe 'section' lagi di resourceItems yang baru, jadi tidak perlu scrollToSection dari sini
  }, [playSound]);

  return (
    <footer className="relative py-12 mt-20 border-t border-cyan-glow/20">
      <div className="tech-grid absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Rocket className="h-6 w-6 text-cyan-glow mr-2" />
              <span className="font-orbitron text-lg font-bold text-white">
                <span className="text-cyan-glow">$</span>CIGAR
              </span>
            </div>
            <p className="text-gray-400 text-sm">
            A crossworld alliance. Forged on Base. Powered by belief. Driven by revival.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href="javascript:void(0);" // Tetap javascript:void(0);
                    onClick={(e) => scrollToSection(item.id, e)}
                    className="text-gray-400 hover:text-cyan-glow transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceItems.map((item) => (
                <li key={item.id}>
                  {item.type === 'link' && item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => playSound('/assets/sounds/robot-click.wav')}
                      className="text-gray-400 hover:text-cyan-glow transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href="javascript:void(0);" // Tetap javascript:void(0);
                      onClick={(e) => handleResourceClick(e, item)}
                      className="text-gray-400 hover:text-cyan-glow transition-colors text-sm flex items-center"
                    >
                      {item.name}
                      {(item.type === 'locked') && <Lock className="h-3 w-3 text-yellow-400 ml-2" />}
                      {(item.type === 'coming_soon') && <span className="text-xs text-gray-500 ml-2">(Soon)</span>}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => playSound('/assets/sounds/robot-click.wav')}
                    className="text-gray-400 hover:text-cyan-glow transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Join The Fleet</h3>
            <div className="flex space-x-4">
              <a
                href="#" // Ganti dengan URL Twitter Anda
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('/assets/sounds/robot-click.wav')}
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Twitter className="h-5 w-5 text-cyan-glow" />
              </a>
              <a
                href="#" // Ganti dengan URL Discord Anda
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('/assets/sounds/robot-click.wav')}
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Discord className="h-5 w-5 text-cyan-glow" />
              </a>
              <a
                href="#" // Ganti dengan URL Github Anda (jika ada)
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('/assets/sounds/robot-click.wav')}
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Github className="h-5 w-5 text-cyan-glow" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-glow/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 $CIGAR Protocol. All rights reserved. Transmission from Smoketron.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;