import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart, InstagramLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: InstagramLogo, href: 'https://Instagram', label: 'Instagram' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: TwitterLogo, href: 'https://twitter.com', label: 'Twitter' }
  ];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Setup initial states
    gsap.set('.footer-content', {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set('.footer-particle', {
      opacity: 0,
      scale: 0
    });

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'bottom 100%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to('.footer-content', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    })
    .to('.footer-particle', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Floating particles animation
    gsap.to('.footer-floating', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-hero border-t border-glass-border overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="footer-floating absolute top-10 left-10 w-2 h-2 bg-accent rounded-full glow-accent opacity-60"></div>
        <div className="footer-floating absolute top-20 right-20 w-3 h-3 bg-primary rounded-full glow-primary opacity-40"></div>
        <div className="footer-floating absolute bottom-20 left-1/4 w-2 h-2 bg-accent rounded-full glow-accent opacity-80"></div>
        <div className="footer-floating absolute bottom-10 right-1/3 w-3 h-3 bg-primary rounded-full glow-primary opacity-50"></div>
        
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient-primary">
                Mointy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Building Plans for blockchain solutions 
                and cutting-edge crypto technologies.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-particle w-10 h-10 glass-card rounded-full flex items-center justify-center hover:glow-accent hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="footer-particle block text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get In Touch</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="footer-particle">mointy@cryptoman.dev</p>
                <p className="footer-particle">+1 (555) 123-4567</p>
                <p className="footer-particle">Paris, FR</p>
              </div>
              <div className="footer-particle flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Available for Sponsoring</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-glass-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                Made with{' '}
                <Heart size={16} className="text-red-400 animate-pulse" />{' '}
                by Killian Hajo © 2025
              </p>
              
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;