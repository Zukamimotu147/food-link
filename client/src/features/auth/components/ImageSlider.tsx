import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const images = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500',
  'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=500',
  'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=500',
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        gsap.to(imageRef.current, {
          opacity: 1,
          duration: 0.5,
        });

        // Animate text
        gsap.fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      },
    });
  });

  return (
    <div className="w-full md:w-1/2 bg-blue-600 relative overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-sm">
          <div
            ref={textRef}
            className="flex flex-col items-center justify-center h-full text-white p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Join Our Food Donation Community</h3>
            <p className="text-lg">Help us make a difference by sharing food with those in need</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
