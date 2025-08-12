import { useState, useEffect } from 'react';
import { List, X, GithubLogo, LinkedinLogo, InstagramLogo } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    // Animation des éléments de navigation au chargement
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.5,
      ease: 'power2.out'
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        x: '100%',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 relative flex items-center justify-between">
          {/* Logo */}
          <div className="nav-item">
            <a href="#home" className="text-2xl font-bold text-gradient-primary">
              Mointy
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-item text-foreground hover:text-accent transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item glass-button p-2 rounded-full hover:glow-accent transition-all duration-300"
            >
              <InstagramLogo size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item glass-button p-2 rounded-full hover:glow-accent transition-all duration-300"
            >
              <LinkedinLogo size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden glass-button p-2 rounded-lg hover:glow-accent transition-all duration-300 z-50 relative"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu fixed top-0 right-0 h-full w-80 bg-gradient-hero border-l border-glass-border transform translate-x-full opacity-0 md:hidden">
          <div className="flex flex-col p-8 space-y-6 mt-16">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl text-foreground hover:text-accent transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            <div className="flex space-x-4 pt-6 border-t border-glass-border">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button p-3 rounded-full hover:glow-accent transition-all duration-300"
              >
                <GithubLogo size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button p-3 rounded-full hover:glow-accent transition-all duration-300"
              >
                <LinkedinLogo size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;