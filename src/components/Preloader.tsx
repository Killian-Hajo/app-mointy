import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([textRef.current, logoRef.current], { opacity: 0, y: 30 });
    gsap.set(progressRef.current, { width: '0%' });

    // Animation sequence
    tl.to([logoRef.current, textRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    })
    .to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out'
    }, '-=0.5')
    .to([textRef.current, logoRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.3')
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="flex flex-col items-center">
        <div ref={logoRef} className="text-6xl font-bold text-gradient-primary mb-4">
          M
        </div>
        <div ref={textRef} className="text-xl font-light text-muted-foreground mb-8">
          Loading Portfolio...
        </div>
        <div className="progress-container">
          <div ref={progressRef} className="progress-bar"></div>
        </div>
        <div className="text-sm text-muted-foreground mt-4 animate-pulse">
          Preparing immersive experience
        </div>
      </div>
    </div>
  );
};

export default Preloader;