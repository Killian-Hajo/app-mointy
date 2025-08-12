import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'phosphor-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // Floating elements animation
    gsap.to('.floating-orb', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Spline 3D */}
      <div ref={splineRef} className="spline-container">
        <iframe 
          src='https://my.spline.design/orb-sCEyWBk5OiNzBMuXgFtC2nUE/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="3D Orb Animation"
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb absolute top-20 left-10 w-4 h-4 bg-accent rounded-full glow-accent opacity-60"></div>
        <div className="floating-orb absolute top-40 right-20 w-6 h-6 bg-primary rounded-full glow-primary opacity-40"></div>
        <div className="floating-orb absolute bottom-32 left-1/4 w-3 h-3 bg-accent rounded-full glow-accent opacity-80"></div>
        <div className="floating-orb absolute bottom-20 right-1/3 w-5 h-5 bg-primary rounded-full glow-primary opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="text-gradient-primary animate-text-shimmer">
              Mointy Hajo
            </span>
            <br />
            <span className="text-gradient-accent">
              CryptoMan
            </span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            Building the future of Crypto with cutting-edge blockchain solutions, 
            Plans to Invest, and immersive crypto experiences.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={handleHireMe}
              className="glass-button px-8 py-4 rounded-full font-medium text-lg group hover:scale-105 transition-all duration-300 bg-gradient-primary hover:glow-primary"
            >
              <span className="flex items-center gap-3">
                Talk to Me
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform duration-300" 
                />
              </span>
            </button>

            <button className="glass-button px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                <Download size={20} />
                Download Formation
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-accent rounded-full opacity-60"></div>
      </div>
    </section>
  );
};

export default HeroSection;