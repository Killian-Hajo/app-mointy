import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Lightning, 
  Globe, 
  ChartBar, 
  Shield 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'Smart Contracts', color: 'text-accent' },
    { icon: Palette, name: 'UI/UX Design', color: 'text-primary' },
    { icon: Lightning, name: 'DeFi Protocols', color: 'text-accent' },
    { icon: Globe, name: 'Web3 Integration', color: 'text-primary' },
    { icon: ChartBar, name: 'Crypto Analytics', color: 'text-accent' },
    { icon: Shield, name: 'Security Audits', color: 'text-primary' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Setup initial states
    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set('.skill-icon', {
      opacity: 0,
      scale: 0,
      rotation: 180
    });

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    }, '-=0.7')
    .to('.skill-icon', {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 bg-gradient-hero relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glow Ring */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
              
              {/* Profile Container */}
             <div className="relative w-full h-full glass-card rounded-full p-1 overflow-hidden">
  <img
    src="/app-mointy/lovable-uploads/2e9aa85d-d1ea-4b6c-9543-ae09142bae0e.png"
    alt="Mointy - Crypto Developer"
    className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-700"
  />
</div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full glow-accent float-animation"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full glow-primary float-delayed"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About{' '}
                <span className="text-gradient-accent">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate blockchain developer and crypto enthusiast with over 5 years 
                of experience in building cutting-edge Web3 applications. My expertise spans 
                across smart contract development, DeFi protocols, and creating immersive 
                crypto trading platforms.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding the future of finance, you'll find me researching the 
                latest crypto trends, contributing to open-source projects, or mentoring 
                aspiring blockchain developers.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-icon glass-card p-6 rounded-xl hover:scale-105 hover:glow-primary transition-all duration-300 group cursor-pointer"
                >
                  <skill.icon 
                    size={32} 
                    className={`${skill.color} mb-3 group-hover:scale-110 transition-transform duration-300`} 
                  />
                  <h3 className="font-medium text-sm">{skill.name}</h3>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-glass-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-accent">5+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">100%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;