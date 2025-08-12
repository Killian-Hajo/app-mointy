import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'CryptoTrader Pro',
      description: 'Advanced trading platform with real-time analytics and automated strategies.',
      image: '/lovable-uploads/59b772b3-7756-4f6b-94a9-22e05d453d5c.png',
      tech: ['React', 'Web3.js', 'Solidity', 'Node.js'],
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'DeFi Yield Farm',
      description: 'Decentralized yield farming protocol with smart contract security audits.',
      image: '/lovable-uploads/71ce20a5-42cc-4824-9441-6763f2a0511a.png',
      tech: ['Solidity', 'Hardhat', 'React', 'Ethers.js'],
      github: '#',
      live: '#'
    },
    {
  id: 3,
  title: 'NFT Marketplace',
  description: 'Full-featured NFT marketplace with minting, trading, and auction capabilities.',
  image: `${process.env.PUBLIC_URL}/lovable-uploads/e411c197-7e74-4d80-bb78-a2132381d96a.png`,
  tech: ['Next.js', 'IPFS', 'OpenSea API', 'Web3'],
  github: '#',
  live: '#'
    },
    {
      id: 4,
      title: 'Crypto Portfolio Tracker',
      description: 'Real-time portfolio tracking with advanced analytics and profit/loss calculations.',
      image: '/lovable-uploads/d865bcbf-2613-43fb-88c9-d28094a93425.png',
      tech: ['React', 'TypeScript', 'Chart.js', 'REST APIs'],
      github: '#',
      live: '#'
    },
    {
      id: 5,
      title: 'Blockchain Voting System',
      description: 'Transparent and secure voting system built on Ethereum blockchain.',
      image: '/app-mointy/lovable-uploads/dae16725-ae32-48f7-b158-bb39bdf7bb69.png',
      tech: ['Solidity', 'Web3.js', 'React', 'Metamask'],
      github: '#',
      live: '#'
    },
    {
      id: 6,
      title: 'Crypto Education Platform',
      description: 'Interactive learning platform for blockchain technology and cryptocurrency.',
      image: '/lovable-uploads/fdf4f7b5-3e63-42b3-92ad-0bb591c84a45.png',
      tech: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Setup initial states
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set('.project-card', {
      opacity: 0,
      y: 80,
      scale: 0.8
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

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    })
    .to('.project-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Featured{' '}
          <span className="text-gradient-primary">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-card rounded-xl overflow-hidden group hover:scale-105 hover:glow-primary transition-all duration-500 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    className="glass-button p-2 rounded-full hover:glow-accent transition-all duration-300"
                  >
                    <GithubLogo size={16} />
                  </a>
                  <a
                    href={project.live}
                    className="glass-button p-2 rounded-full hover:glow-accent transition-all duration-300"
                  >
                    <Globe size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button className="w-full glass-button py-2 rounded-lg font-medium group-hover:bg-gradient-primary group-hover:glow-primary transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    View Project
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <button className="glass-button px-8 py-4 rounded-full font-medium text-lg hover:scale-105 hover:glow-accent transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;