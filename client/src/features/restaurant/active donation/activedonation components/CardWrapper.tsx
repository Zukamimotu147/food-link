import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  //   CardTitle,
} from '@/components/ui/card';
import FormHeader from './FormHeader';
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
const CardWrapper = ({ label, title, children }: CardWrapperProps) => {
  const activeDonationRef = useRef(null);

  useGSAP(() => {
    gsap.from(activeDonationRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });
  return (
    <Card className="cursor-pointer" ref={activeDonationRef}>
      <CardHeader>
        <FormHeader label={label} title={title} />
      </CardHeader>
      <CardContent className="bg-transparent">{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
