import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import Team from './Team';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const aboutUsRef = useRef(null);
  useGSAP(() => {
    gsap.to('.teamText', {
      duration: 2,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      text: 'Meet Our Team',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutUsRef.current,
        start: '-250px center',
        end: '80% center',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
      },
    });

    tl.from('.aboutContent', {
      opacity: 0,
      x: 100,
      ease: 'none',
      duration: 1,
    })
      .from('.aboutContent1', { opacity: 0, x: -100, ease: 'none', duration: 1 })
      .from('.aboutContent2', { opacity: 0, y: 100, ease: 'none', duration: 1 });
  });
  return (
    <main>
      <section className="max-container h-screen padding">
        <h1 className="teamText text-6xl font-bold text-center text-customGreen h-[100px] mt-10 sm:mt-0"></h1>
        <Team />
      </section>
      <div ref={aboutUsRef}>
        <section className="aboutContent max-container padding flex flex-col sm:flex-row items-center gap-4">
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">Mission</h1>
            <p className="text-lg sm:text-2xl text-balance">
              At food link, our mission is simple, to bridge the gaps in our food system to build
              healthier communities
            </p>
          </div>
          <img
            src=".../../../../src/assets/image 11.png"
            alt="Food Waste1"
            className=" h-[3125%] object-cover"
          />
        </section>
        <section className="aboutContent1 max-container padding flex flex-col sm:flex-row items-center gap-4">
          <img
            src=".../../../../src/assets/image 12.png"
            alt="Food Waste1"
            className=" h-[3125%] object-cover"
          />
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">Vision</h1>
            <p className="text-lg sm:text-2xl text-balance">
              Food link envisions a world where our food ecosystem thrives on real time,
              open-network collaboration and scalable distribution services to enable equitable
              access to healthy food resources At food link, our mission is simple, to bridge the
              gaps in our food system to build healthier communities
            </p>
          </div>
        </section>
        <section className="bg-customGreen">
          <div className="aboutContent2 max-container padding flex flex-col sm:flex-row items-center gap-14">
            <img
              src="https://images.pexels.com/photos/6646884/pexels-photo-6646884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Food Waste1"
              className="h-[250px] sm:h-[400px] object-cover"
            />
            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl font-bold text-white">What we are doing</h1>
              <ul className="text-lg sm:text-2xl text-white text-balance space-y-4 list-disc">
                <li>
                  We connect restaurants with charities to ensure surplus food goes to those in
                  need, helping reduce food waste and combat hunger.
                </li>
                <li>
                  Our platform allows restaurants to easily donate excess food, which is then
                  matched with charities based on their needs and location.
                </li>
                <li>
                  We simplify the donation process, making it easy for restaurants to contribute
                  food while ensuring it reaches the right charity at the right time.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="bg-customGreen h-[100px] mt-20">
          <p className="text-white text-center pt-10"> 2024 Food Link. All rights reserved </p>
        </div>
      </footer>
    </main>
  );
};

export default AboutUs;
