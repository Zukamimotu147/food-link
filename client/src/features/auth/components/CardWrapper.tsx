import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);
type CardWrapperProps = {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
};
const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  const authFormRef = useRef(null);

  useGSAP(() => {
    gsap.from(authFormRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
  });
  return (
    <Card
      className="md:w-1/5 xl:w-1/4 bg-transparent backdrop-blur-none rounded-3xl shadow-2xl border border-gray-700/50"
      ref={authFormRef}>
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthFooter label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
