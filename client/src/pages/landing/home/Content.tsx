import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/all';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);
const Content = () => {
  const contentRef = useRef(null);

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
        start: '-250px center',
        end: '87% center',
        toggleActions: 'restart pause reverse pause',
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
      .from('.content2', { opacity: 0, y: -100, ease: 'none', duration: 1 })
      .from('.content3', { opacity: 0, x: -100, ease: 'none', duration: 1 })
      .from('.content4', { opacity: 0, x: 100, ease: 'none', duration: 1 })
      .from('.content5', { opacity: 0, ease: 'none', duration: 1 })
      .from('.content6', { opacity: 0, ease: 'none', duration: 1 })
      .from('.content7', { opacity: 0, ease: 'none', duration: 1 })
      .from('.content8', { opacity: 0, x: 100, ease: 'none', duration: 1 })
      .from('.content9', { opacity: 0, x: -100, ease: 'none', duration: 1 })
      .from('.content10', { opacity: 0, y: -100, ease: 'none', duration: 1 });
  });

  return (
    <main ref={contentRef}>
      <section className="bg-customGreen text-white mt-3">
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
      </section>
      <section className="content1 max-container padding flex flex-col sm:flex-row items-center gap-4">
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
      </section>
      <section className="content2 max-container padding flex flex-col sm:flex-row items-center gap-4">
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
      </section>
      <section className="h-[100px] bg-customGreen flex justify-center items-center">
        <h1 className="contentText text-5xl font-bold text-white"></h1>
      </section>
      <section className="content3 max-container padding flex flex-col sm:flex-row items-center gap-4">
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
      </section>
      <section className="bg-customGreen">
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
      </section>
      <section className="content5 flex flex-col items-center justify-center max-container padding space-y-5">
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-customGreen">
          THE DIFFERENCE BETWEEN FOOD LOSS AND FOOD WASTE
        </h1>
        <p className="text-lg sm:text-xl text-balance">
          Food loss happens at an earlier stage in the supply chain and this food does not re-enter
          the supply chain for any other production use, like animal feed. It happens at harvest,
          slaughter or catch, so before the food reaches the store shelves, restaurants, food
          service provider or the end consumer. The United Nations' Food and Agriculture
          Organization (FAO, 2019), defines food loss as a “decrease in the quantity or quality of
          food resulting from decisions and actions by food suppliers in the chain, excluding
          retailers, food service providers and consumers.” This loss of food can happen due to many
          different reasons.
          <br /> <br />
          According to WWF (2021), 1.2 billion tonnes of food loss happens at farms each year.
          <br /> <br />
          Food waste happens at the end of the supply chain, for example when the food has made it
          to retailers, grocery stores, food service providers and consumer households. The FAO
          defines food waste as “the decrease in the quantity or quality of food resulting from
          decisions and actions by retailers, food services and consumers” (FAO, 2019).
        </p>
      </section>
      <section className="content6 flex flex-col items-center justify-center max-container padding space-y-5">
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-customGreen">
          WHY IS FOOD WASTE A PROBLEM?
        </h1>
        <p className="text-lg sm:text-xl text-balance text-center">
          Food waste has an enormous impact on society, the economy and the environment. As
          such,reducing food waste presents a powerful opportunity to make a positive impact on
          climate change, the cost of living, and food accessibility.
        </p>
      </section>
      <section className="content7 flex flex-col items-center justify-center max-container padding space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 sm:grid-rows-2 gap-5">
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">
              10% OF ALL GREENHOUSE GAS EMISSIONS WORLDWIDE
            </h1>
            <p className="text-balance">are caused by food waste (WWF, 2024)</p>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">25% OF FRESH WATER USED ANNUALLY</h1>
            <p className="text-balance">goes into food that ultimately goes to waste (WWF, 2024)</p>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">11.5% OF ALL LANG IN THE WORLD</h1>
            <p className="text-balance">
              Producing food that ultimately goes to waste takes up a land area larger than China
              (WWF, 2024)
            </p>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">$1.1 TRILLION</h1>
            <p className="text-balance">
              is the amount of money lost through food waste every year(WWF, 2024)
            </p>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">2,4 BILLION PEOPLE</h1>
            <p className="text-balance">
              do not have access to adequate, nutritious food (FAO, 2023)
            </p>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-customGreen font-bold text-lg">783 MILLION PEOPLE</h1>
            <p className="text-balance">are affected by hunger every day (FAO, 2023)</p>
          </div>
        </div>
      </section>
      <section className="bg-customGreen">
        <div className="content8 max-container padding flex flex-col sm:flex-row items-center gap-4">
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              A REAL OPPORTUNITY TO TACKLE CLIMATE CHANGE
            </h1>
            <p className="text-lg sm:text-2xl text-white text-balance">
              Reducing food waste is the number 1 action we can take to help tackle climate change,
              by limiting the temperature increase to 2°C by 2100 (Project Drawdown, 2020). Easy,
              effective and rewarding - Reducing or avoiding food waste helps us make a real
              positive impact on the environment.
            </p>
          </div>
          <img
            src=".../../../../src/assets/image 6.png"
            alt="Food Waste1"
            className=" h-[3125%] object-cover"
          />
        </div>
        <div className="content9 max-container padding flex flex-col sm:flex-row items-center gap-4">
          <img
            src=".../../../../src/assets/image 7.png"
            alt="Food Waste1"
            className=" h-[3125%] object-cover"
          />
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              HOW DOES FOOD WASTE AFFECT THE ENVIRONMENT AND CLIMATE ?
            </h1>
            <p className="text-lg sm:text-2xl text-white text-balance">
              As part of the process of food production, greenhouse gas emissions are released into
              the atmosphere. Additionally, the food system has an impact on biodiversity loss and
              our environmental ecosystems. When food is wasted, we do not only waste the food in
              front of us, we also waste all the valuable resources that have gone into creating the
              food. As such, food waste has a considerable impact on the environment and our
              planet's climate.
            </p>
          </div>
        </div>
      </section>
      <section className="content10 flex flex-col items-center justify-center max-container padding space-y-5">
        <h1 className="text-3xl sm:text-5xl font-bold text-customGreen">
          Join the Movement to End Food Waste
        </h1>
        <p className="text-lg sm:text-2xl text-balance text-center">
          Food Link is a platform that bridges the gap between surplus food and those in need. We
          connect restaurants with charities to make food donation simple and impactful.
        </p>
        <div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6646847/pexels-photo-6646847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Food Waste"
              className=" h-[3125%] object-cover"
            />
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <Link to="/login">
                <Button
                  variant={'secondary'}
                  className="bg-customGreen hover:bg-customGreen/90 text-white text-xl sm:text-4xl px-6 sm:py-10 sm:px-5 rounded-full">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-customGreen h-[100px]">
          <p className="text-white text-center pt-10"> 2024 Food Link. All rights reserved </p>
        </div>
      </footer>
    </main>
  );
};

export default Content;
