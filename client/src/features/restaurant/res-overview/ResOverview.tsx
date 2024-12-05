import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useFetchTotalCharities from '@/hooks/useFetchTotalCharities';
import useFetchTotalUsers from '@/hooks/useFetchTotalUsers';
import ResPieChart from './ResPieChart';
import ResTotalDonationChart from './ResTotalDonationChart';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ResOverview = () => {
  const { totalCharities } = useFetchTotalCharities();
  const { totalUsers } = useFetchTotalUsers();
  const resOverviewRef = useRef(null);
  const totalUserCount = totalUsers.reduce((acc, user) => acc + user.count, 0);
  const totalCharitiesCount = totalCharities.reduce((acc, charity) => acc + charity.count, 0);

  useGSAP(() => {
    gsap.from(resOverviewRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });

  return (
    <main className="container m-auto" ref={resOverviewRef}>
      <section className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="h-[150px] w-full  rounded-xl bg-customGreen/90 flex flex-col justify-center items-center box md:h-[200px] lg:h-[250px]">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center">
              {totalUserCount}
            </h1>
            <p className="text-white text-center text-lg md:text-xl lg:text-2xl md:leading-tight lg:leading-snug">
              Total Users
            </p>
          </div>
          <div className="h-[150px] w-full  rounded-xl bg-customGreen/90 flex flex-col justify-center items-center box md:h-[200px] lg:h-[250px]">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center">
              {totalCharitiesCount}
            </h1>
            <p className="text-white text-center text-lg md:text-xl lg:text-2xl md:leading-tight lg:leading-snug">
              Total Charities
            </p>
          </div>
        </div>
      </section>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-4">
        <ResTotalDonationChart />
        <ResPieChart />
      </div>
    </main>
  );
};

export default ResOverview;
