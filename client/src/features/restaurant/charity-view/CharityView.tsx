import useFetchCharities from '@/hooks/useFetchCharities';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
const CharityView = () => {
  const charityViewRef = useRef(null);
  useGSAP(() => {
    gsap.from(charityViewRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });
  const { data } = useFetchCharities();
  return (
    <main
      className="container m-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
      ref={charityViewRef}>
      {data.map((charity) => (
        <Card
          key={charity.charityId}
          className="max-w-[700px] flex flex-col lg:flex-row justify-between items-center gap-4">
          <CardContent className="order-2 lg:order-1">
            <div className="h-[200px] lg:h-[200px] rounded-md overflow-hidden">
              <img
                src={charity.charityPhotoUrl}
                alt="charity image"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
          <CardContent className="order-1 lg:order-2">
            <div className="flex flex-col gap-4 mt-5 p-4  rounded-lg shadow-md">
              <h1 className="text-3xl text-center font-bold text-customGreen">
                {charity.charityName}
              </h1>
              <p className="text-gray-800">
                <span className="font-semibold">Address:</span> {charity.streetAddress},{' '}
                {charity.barangay}, {charity.city}, {charity.province}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Contact Number:</span> {charity.contactNumber}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Email:</span> {charity.email}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default CharityView;