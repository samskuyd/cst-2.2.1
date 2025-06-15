// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Rocket, Menu, X, Copy, ExternalLink, LogOut, Lock } from 'lucide-react'; // Lock tetap diimpor untuk toast
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { toast } from 'sonner';
import { useSoundContext } from '../../contexts/SoundContext';

const SCROLL_THRESHOLD = 60;
const SCROLL_DEBOUNCE_MS = 100;

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };
  return debounced as F & { cancel: () => void };
}

interface HeaderProps {
  onStoryMenuReset?: () => void; 
}

const Header = React.memo<HeaderProps>(({ onStoryMenuReset }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { playSound } = useSoundContext();

  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  const prevIsScrolledRef = useRef(isScrolled);

  useEffect(() => {
    prevIsScrolledRef.current = isScrolled;
  }, [isScrolled]);

  const performScrollChecks = useCallback(() => {
    const currentScrollY = window.scrollY;
    const newIsScrolled = currentScrollY > SCROLL_THRESHOLD;
    if (newIsScrolled !== prevIsScrolledRef.current) {
      setIsScrolled(newIsScrolled);
    }
  }, []);

  const debouncedScrollHandler = useCallback(debounce(performScrollChecks, SCROLL_DEBOUNCE_MS), [performScrollChecks]);

  useEffect(() => {
    performScrollChecks();
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      debouncedScrollHandler.cancel();
    };
  }, [debouncedScrollHandler, performScrollChecks]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    if (mobileMenuOpen) { 
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow;
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [mobileMenuOpen]); 

  const toggleMobileMenu = useCallback(() => {
    playSound('/assets/sounds/robot-click.wav');
    setMobileMenuOpen(prev => !prev);
    setShowProfileMenu(false); 
  }, [playSound]);

  const toggleProfileMenu = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    playSound('/assets/sounds/robot-click.wav');
    setShowProfileMenu(prev => !prev);
  }, [playSound]);

  const closeProfileMenu = useCallback(() => {
    setShowProfileMenu(false);
  }, []);


  const handleDisconnectCb = useCallback(async () => {
    playSound('/assets/sounds/robot-click.wav');
    try {
      if (connector?.id === 'metaMask' && window.ethereum) {
        await window.ethereum.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
      }
      disconnect();
      closeProfileMenu(); 
      setMobileMenuOpen(false); 
    } catch (error) { 
      console.error('Error during disconnect:', error);
      toast.error("Failed to disconnect wallet.", { position: 'bottom-center' });
    }
  }, [connector, disconnect, closeProfileMenu, playSound]);

  const copyAddressCb = useCallback(async () => {
    playSound('/assets/sounds/robot-click.wav');
    if (address) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(address);
          toast.success('Address copied to clipboard!', { position: 'bottom-center', duration: 2000 });
          return; 
        } catch (err) {
          console.error('navigator.clipboard.writeText failed: ', err);
        }
      }
      const textArea = document.createElement("textarea");
      textArea.value = address;
      textArea.style.position = "fixed";  
      textArea.style.left = "-9999px";    
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          toast.success('Address copied (fallback)!', { position: 'bottom-center', duration: 2000 });
        } else {
          toast.error('Failed to copy address using fallback.', { position: 'bottom-center', duration: 3000 });
        }
      } catch (err) {
        toast.error('Copying address is not supported on your browser.', { position: 'bottom-center', duration: 3000 });
      } finally {
        document.body.removeChild(textArea);
      }
    } else {
      toast.error('No address to copy.', { position: 'bottom-center' });
    }
  }, [address, playSound]);

  const truncatedAddress = useMemo(() => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [address]);

  const balanceDisplay = useMemo(() => {
    if (!balance) {
      return address ? 'Loading...' : '0 ETH'; 
    }
    const fullBalanceString = formatEther(balance.value); 
    if (fullBalanceString === "0") {
        return "0 ETH";
    }
    if (fullBalanceString.includes('.')) {
        const parts = fullBalanceString.split('.');
        const integerPart = parts[0];
        let decimalPart = parts[1] || "";
        if (integerPart === "0") {
            const significantDecimals = decimalPart.substring(0, 4); 
            return `0.${significantDecimals} ETH`;
        } else {
            const displayDecimal = decimalPart.substring(0, 4);
            if (displayDecimal === "0000" && integerPart !== "0") {
                 return `${integerPart} ETH`;
            }
            const trimmedDecimal = displayDecimal.replace(/0+$/, '');
            return `${integerPart}${trimmedDecimal.length > 0 ? '.' : ''}${trimmedDecimal} ETH`;
        }
    } else {
        return `${fullBalanceString} ETH`;
    }
  }, [balance, address]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileMenu && !(event.target as HTMLElement).closest('[data-profile-menu-boundary]')) {
        closeProfileMenu();
      }
    };
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu, closeProfileMenu]);

  const ProfileMenuContent = useMemo(() => {
    if (!address) return null;
    return (
      <div className="p-4" style={{ overflowY: 'auto' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-cyan-glow font-orbitron">Wallet Profile</h3>
          <button onClick={() => { playSound('/assets/sounds/robot-click.wav'); closeProfileMenu(); }} className="text-gray-400 hover:text-cyan-glow transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
            <span className="text-sm text-gray-300 break-all">{truncatedAddress}</span>
            <button onClick={copyAddressCb} className="text-cyan-glow hover:text-cyan-glow/80 transition-colors ml-2 shrink-0">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-black/50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Balance</span>
              <span className="text-cyan-glow font-orbitron">{balanceDisplay}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => {
              playSound('/assets/sounds/robot-click.wav');
              if (address) window.open(`https://etherscan.io/address/${address}`, '_blank');
              closeProfileMenu();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-cyan-glow transition-colors"
          >
            <span>View on Explorer</span> <ExternalLink className="h-4 w-4" />
          </button>
          <button onClick={handleDisconnectCb} className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            <span>Disconnect</span> <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }, [address, closeProfileMenu, truncatedAddress, copyAddressCb, balanceDisplay, handleDisconnectCb, playSound]);

  const CustomConnectButton = () => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, openChainModal, mounted }) => {
          if (!mounted) {
            return <div style={{ minWidth: '150px', height: '42px' }} aria-hidden="true" />;
          }
          const connected = mounted && account && chain;
          if (!connected) {
            return (
              <button
                onClick={() => {
                  playSound('/assets/sounds/robot-click.wav');
                  openConnectModal();
                }}
                className="button-primary"
              >
                Connect Wallet
              </button>
            );
          }
          if (chain.unsupported) {
            return (
              <button
                onClick={() => {
                  playSound('/assets/sounds/robot-click.wav');
                  openChainModal();
                }}
                className="button-primary text-red-500"
              >
                Wrong network
              </button>
            );
          }
          return (
            <div className="relative" data-profile-menu-boundary>
              <button
                onClick={toggleProfileMenu}
                className="button-primary px-3 py-2 flex items-center space-x-2"
              >
                <span>{truncatedAddress}</span>
              </button>
              <div
                className={`
                  z-[100] bg-gray-900/95 backdrop-blur-md shadow-xl
                  transition-all duration-300 ease-in-out
                  md:absolute md:right-0 md:top-full md:mt-2 md:w-72 md:rounded-lg md:border md:border-cyan-glow/30
                  fixed inset-x-0 bottom-0 border-t border-cyan-glow/30 md:inset-auto md:border-none md:rounded-none
                  max-h-[70vh] md:max-h-[80vh] overflow-y-auto
                  ${showProfileMenu
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible translate-y-full md:translate-y-0'
                  }
                `}
                data-profile-menu-boundary
              >
                {ProfileMenuContent}
              </div>
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  };

  const navItems = useMemo(() => ['Mission', 'Story', 'Roadmap', 'Tokenomics', 'Community'], []);

  const scrollToSection = useCallback((sectionId: string, event?: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    if (event) {
        event.preventDefault(); 
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const headerElement = document.querySelector('header#main-header');
      const headerHeight = headerElement ? headerElement.offsetHeight : SCROLL_THRESHOLD; 
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight + 70;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Section with ID "${sectionId}" not found for scrolling.`);
    }
  }, []);

  const handleNavLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, itemText: string, isMobileMenu: boolean = false) => {
    const sectionId = itemText.toLowerCase();

    if (itemText.toLowerCase() === 'tokenomics') {
      playSound('/assets/sounds/lock_sound_effect.wav'); // Contoh suara gembok (pastikan ada file ini)
      event.preventDefault(); 
      toast.info('Tokenomics: Systems Locked - Access Pending Transmission!', { 
        position: 'bottom-center', 
        duration: 3000,
        icon: <Lock className="h-4 w-4 text-yellow-400" /> // Ikon gembok di toast
      });
    } else if (sectionId === 'story' && onStoryMenuReset) {
      playSound('/assets/sounds/robot-click.wav');
      event.preventDefault(); 
      onStoryMenuReset();
    } else {
      playSound('/assets/sounds/robot-click.wav');
      scrollToSection(sectionId, event);
    }

    if (isMobileMenu) {
      setMobileMenuOpen(false);
      setShowProfileMenu(false);
    }
  }, [playSound, onStoryMenuReset, scrollToSection]);


  return (
    <>
      <header
        id="main-header" 
        className={`fixed top-0 left-0 w-full z-50 transition-[padding,background-color,opacity] duration-300 ease-in-out ${
          isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => {
                playSound('/assets/sounds/robot-click.wav');
                scrollToSection('mission', e); 
              }}
              title="To Mission Section"
            >
              <img
                src="/assets/images/logoCigar.webp"
                alt="CIGAR Logo"
                className="h-8 w-8"
              />
              <span className="font-orbitron text-xl font-bold text-white">
                CIGAR
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-7">
              {navItems.map((item) => {
                const isComingSoon = item.toLowerCase() === 'tokenomics';
                return (
                  // Tidak perlu div pembungkus 'relative group' jika tidak ada badge absolut
                  <a
                    key={item}
                    href={isComingSoon ? "#" : `#${item.toLowerCase()}`} 
                    className={`font-exo transition-colors relative flex items-center 
                                ${isComingSoon 
                                  ? 'text-gray-500 cursor-not-allowed hover:text-gray-500' // Styling disabled
                                  : 'text-gray-300 hover:text-cyan-glow group'
                                }`}
                    onClick={(e) => handleNavLinkClick(e, item)}
                    aria-disabled={isComingSoon}
                  >
                    {/* Tidak ada ikon gembok di sini lagi */}
                    {item} 
                    {!isComingSoon && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow group-hover:w-full transition-all duration-300"></span>
                    )}
                  </a>
                );
              })}
            </nav>
            <div className="hidden md:block">
              <CustomConnectButton />
            </div>
            <button
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-cyan-glow" /> : <Menu className="h-6 w-6 text-cyan-glow" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-md z-[9999] md:hidden animate-slideIn">
          <div className="flex flex-col min-h-screen">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} className="text-cyan-glow hover:text-cyan-glow/80 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center flex-grow">
              {navItems.map((item) => {
                const isComingSoon = item.toLowerCase() === 'tokenomics';
                return (
                  // Tidak perlu div pembungkus 'relative group' di sini juga
                  <a 
                    key={item}
                    href={isComingSoon ? "#" : `#${item.toLowerCase()}`} 
                    className={`font-exo text-xl transition-colors py-4 flex items-center 
                                ${isComingSoon 
                                  ? 'text-gray-600 cursor-not-allowed' 
                                  : 'text-gray-300 hover:text-cyan-glow'}`}
                    onClick={(e) => handleNavLinkClick(e, item, true)}
                    aria-disabled={isComingSoon}
                  >
                    {/* Tidak ada ikon gembok atau badge 'SOON' di sini */}
                    {item}
                  </a>
                );
              })}
              <div className="mt-6 w-full px-4 flex justify-center">
                <CustomConnectButton />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
});

Header.displayName = 'Header';
export default Header;