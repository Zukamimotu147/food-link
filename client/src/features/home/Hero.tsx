import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    if (textRef.current) {
      const text = new SplitType(textRef.current, { types: 'chars' });
      gsap.timeline({ repeat: -1, repeatDelay: 10 }).from(text.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Food Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 ref={textRef} className="text-6xl md:text-8xl font-bold mb-6">
          FOOD LINK
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Connecting excess food with those in need
        </p>
      </div>
    </div>
  );
};

export default Hero;
