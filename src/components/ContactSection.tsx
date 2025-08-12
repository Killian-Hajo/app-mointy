import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo, Envelope, Phone, MapPin, InstagramLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Envelope,
      label: 'Email',
      value: 'mointy@cryptoman.dev',
      href: 'mailto:mointy@cryptoman.dev'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Paris, FR',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: InstagramLogo,
      label: 'Instagram',
      href: 'https://instagram.com',
      color: 'hover:text-foreground'
    },
    {
      icon: LinkedinLogo,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: TwitterLogo,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Setup initial states
    gsap.set([formRef.current, infoRef.current], {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set('.contact-input', {
      opacity: 0,
      x: -40
    });

    gsap.set('.contact-info-item', {
      opacity: 0,
      x: 40
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

    tl.to([formRef.current, infoRef.current], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out'
    })
    .to('.contact-input', {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.8')
    .to('.contact-info-item', {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.8');

    // Floating particles animation
    gsap.to('.floating-particle', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate button on submit
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Here you would typically send the form data
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 bg-gradient-hero relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-particle absolute top-20 left-20 w-3 h-3 bg-accent rounded-full glow-accent opacity-60"></div>
        <div className="floating-particle absolute top-40 right-32 w-2 h-2 bg-primary rounded-full glow-primary opacity-80"></div>
        <div className="floating-particle absolute bottom-32 left-1/3 w-4 h-4 bg-accent rounded-full glow-accent opacity-40"></div>
        <div className="floating-particle absolute bottom-20 right-1/4 w-3 h-3 bg-primary rounded-full glow-primary opacity-70"></div>
        
        <div className="absolute top-40 left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build{' '}
            <span className="text-gradient-accent">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your crypto project to life? Let's discuss how we can 
            create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="contact-input">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card rounded-xl border border-glass-border focus:border-accent focus:glow-accent transition-all duration-300 bg-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="contact-input">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card rounded-xl border border-glass-border focus:border-accent focus:glow-accent transition-all duration-300 bg-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="contact-input">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-card rounded-xl border border-glass-border focus:border-accent focus:glow-accent transition-all duration-300 bg-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn w-full glass-button py-4 rounded-xl font-medium text-lg bg-gradient-primary hover:glow-primary transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-3">
                    Send Message
                    <PaperPlaneTilt 
                      size={20} 
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                    />
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact-info-item flex items-center gap-4 group hover:text-accent transition-colors duration-300"
                  >
                    <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center group-hover:glow-accent transition-all duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-info-item w-12 h-12 glass-card rounded-xl flex items-center justify-center ${social.color} hover:scale-110 hover:glow-accent transition-all duration-300`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Availability</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for new projects</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Currently accepting new crypto and Web3 projects. 
                Response time: 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;