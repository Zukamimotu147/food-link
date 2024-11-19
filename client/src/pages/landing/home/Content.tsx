import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);
const Content = () => {
  const contentRef = useRef(null);
  //   const contentPinRef = useRef(null);

  useGSAP(() => {
    gsap.to('.contentText', {
      duration: 4,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      text: 'START SAVING FOOD TODAY',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: '-150px center',
        end: '80% center',
        toggleActions: 'restart pause none pause',
        // markers: true,
        scrub: true,
      },
    });

    tl.from('.content', {
      opacity: 0,
      y: -100,
      ease: 'none',
      duration: 1,
    })
      .from('.content1', { opacity: 0, y: -100, ease: 'none', duration: 1 })
      .from('.content2', { opacity: 0, y: -100, ease: 'none', duration: 1, delay: 1 })
      .from('.content3', { opacity: 0, x: -100, ease: 'none', duration: 1, delay: 1 })
      .from('.content4', { opacity: 0, x: 100, ease: 'none', duration: 1, delay: 1 });

    // const tl2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: contentPinRef.current,
    //     start: 'top top',
    //     end: '+=4000',
    //     pin: true,
    //     markers: true,
    //     scrub: true,
    //     anticipatePin: 1,
    //   },
    // });

    // tl2.from('.content5', { yPercent: 100 }).from('.content6', { yPercent: -100 });
  });
  return (
    <section ref={contentRef}>
      <div className="bg-customGreen text-white mt-3">
        <div className="content flex flex-col items-center justify-center max-container padding space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold">ABOUT FOOD WASTE</h1>
          <p className="max-w-[800px] text-balance text-center">
            Food waste is a global challenge. Understanding its scale and impacts helps us to make a
            real difference for the better . Let’s dive into the facts and statistics behind the
            topic of food waste.
          </p>
          <img
            src="https://spc.com.au/wp-content/uploads/2021/07/waste.png"
            alt="Food Waste"
            className=" h-[250px] w-[500px] object-cover"
          />
        </div>
      </div>
      <div className="content1 max-container padding flex flex-col sm:flex-row items-center gap-4">
        <img
          src=".../../../../src/assets/image 2.png"
          alt="Food Waste1"
          className=" h-[3125%] object-cover"
        />
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">
            HOW MUCH FOOD IS WASTED GLOBALLY?
          </h1>
          <p className="text-lg sm:text-2xl text-balance">
            According to WWF (2021), 40% of the food that we produce globally goes to waste. This
            means that 2.5 billion tonnes of food is wasted every year. This equates to 80,000
            kilograms of food being wasted around the world, every single second.
          </p>
        </div>
      </div>
      <div className="content2 max-container padding flex flex-col sm:flex-row items-center gap-4">
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">
            WHICH FOOD IS WASTED THE MOST?
          </h1>
          <p className="text-lg sm:text-2xl text-balance">
            Food waste appears across almost every food category. On average across the globe,
            vegetables (25%), cereals (24%), and fruits (12%) are the food most wasted at home.
            <br />
            <br />
            When it comes to food waste in consumer households, vegetables, cereals and fruit are
            followed by roots & tubers (9%), dairy & eggs (7%) and meat & fish (6%) (Chen, 2020).
          </p>
        </div>
        <img
          src=".../../../../src/assets/image 2.png"
          alt="Food Waste1"
          className=" h-[3125%] object-cover"
        />
      </div>
      <div className="padding bg-customGreen">
        <h1 className="contentText text-5xl font-bold text-white text-center"></h1>
      </div>
      <div className="content3 max-container padding flex flex-col sm:flex-row items-center gap-4">
        <img
          src=".../../../../src/assets/image 4.png"
          alt="Food Waste1"
          className=" h-[3125%] object-cover"
        />
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">FOOD WASTE DEFINITION</h1>
          <p className="text-lg sm:text-2xl text-balance">
            When we talk about food waste, we refer to all food intended for human consumption that
            goes to waste, from farm to fork. <br /> <br />
            This includes both 'food loss' - food wasted as part of production and supply chains -
            and 'food waste' happening at retail level and/or in consumer households.
          </p>
        </div>
      </div>
      <div className="bg-customGreen padding">
        <div className="content4 max-container padding flex flex-col sm:flex-row items-center gap-4">
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-white">WHAT IS SURPLUS FOOD?</h1>
            <p className="text-lg sm:text-2xl text-white text-balance">
              Surplus food is generated at any stage of the supply chain from farm to fork.
              <br /> <br /> Food surplus is not food waste, but unfortunately often ends up as
              waste. In fact, in most cases it's perfectly good food that for any of many reasons,
              is unlikely to be sold or consumed. Making the most of surplus food is a great way to
              reduce food waste (FAO, 2018).
            </p>
          </div>
          <img
            src=".../../../../src/assets/image 10.png"
            alt="Food Waste1"
            className=" h-[3125%] object-cover"
          />
        </div>
      </div>
      {/* <div ref={contentPinRef}>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-container padding space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">
              THE DIFFERENCE BETWEEN FOOD LOSS AND FOOD WASTE
            </h1>
            <p className="text-lg sm:text-2xl text-balance">
              Food loss happens at an earlier stage in the supply chain and this food does not
              re-enter the supply chain for any other production use, like animal feed. It happens
              at harvest, slaughter or catch, so before the food reaches the store shelves,
              restaurants, food service provider or the end consumer. The United Nations' Food and
              Agriculture Organization (FAO, 2019), defines food loss as a “decrease in the quantity
              or quality of food resulting from decisions and actions by food suppliers in the
              chain, excluding retailers, food service providers and consumers.” This loss of food
              can happen due to many different reasons.
              <br /> <br />
              According to WWF (2021), 1.2 billion tonnes of food loss happens at farms each year.{' '}
              <br /> <br />
              Food waste happens at the end of the supply chain, for example when the food has made
              it to retailers, grocery stores, food service providers and consumer households. The
              FAO defines food waste as “the decrease in the quantity or quality of food resulting
              from decisions and actions by retailers, food services and consumers” (FAO, 2019).
            </p>
            
          </div>
        </div>
      </div> */}
      {/* <div className="content6 grid grid-cols-3 grid-rows-2 gap-5 content5 max-container padding space-y-5">
          <h1 className="col-span-1 text-3xl sm:text-5xl font-bold text-customGreen">
            10% OF ALL GREENHOUSE GAS EMISSIONS WORLDWIDE
          </h1>
          <p className="text-lg sm:text-2xl text-balance col-span-2">
            Food waste has an enormous impact on society, the economy and the environment. As such,
            reducing food waste presents a powerful opportunity to make a positive impact on climate
            change, the cost of living, and food accessibility.
          </p>
          <div className="col-span-1">asd</div>
        </div> */}
    </section>
  );
};

export default Content;
