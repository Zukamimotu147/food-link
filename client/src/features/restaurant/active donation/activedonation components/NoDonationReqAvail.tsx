import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// THANK YOU GPT
const NoDonationReqAvail = () => {
  const text = 'No Donation Request Available';

  // Function to split text into spans, including spaces
  const splitTextToSpans = (text: string) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter">
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  useGSAP(() => {
    const letters = document.querySelectorAll('.letter');

    // Create a timeline for the animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // Repeat indefinitely with a delay

    // Add the animation to the timeline
    tl.from(letters, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: {
        amount: 1, // Total duration for the stagger
        from: 'random', // Randomly stagger the letters
      },
      ease: 'easeInOut',
    }).to(letters, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: {
        amount: 1,
        from: 'random',
      },
      ease: 'easeInOut',
    });
  });

  return (
    <div className="text-center md:text-left">
      <div className="noDonation font-bold text-customGreen md:text-4xl text-2xl">
        {splitTextToSpans(text)}
      </div>
    </div>
  );
};

export default NoDonationReqAvail;
