import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  //   CardTitle,
} from '@/components/ui/card';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CardWrapperProps = {
  label?: string;
  title?: string;

  children: React.ReactNode;
};
const CardWrapper = ({ title, children }: CardWrapperProps) => {
  const addCharityFormRef = useRef(null);

  useGSAP(() => {
    gsap.from(addCharityFormRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });
  return (
    <Card className="cursor-pointer max-w-full" ref={addCharityFormRef}>
      <CardHeader>
        <p className="font-bold text-1xl sm:text-2xl lg:text-3xl text-customGreen text-center truncate max-w-full">
          {title}
        </p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
