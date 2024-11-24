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
  const addCharityFormRef = useRef(null);

  useGSAP(() => {
    gsap.from(addCharityFormRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });
  return (
    <Card
      className="bg-transparent backdrop-blur-none rounded-3xl shadow-2xl border border-gray-700/50 w-[300px] sm:w-[600px]"
      ref={addCharityFormRef}>
      <CardHeader>
        <FormHeader label={label} title={title} />
      </CardHeader>
      <CardContent className="bg-transparent">{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
