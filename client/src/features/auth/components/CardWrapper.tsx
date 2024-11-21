import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  //   CardTitle,
} from '@/components/ui/card';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

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
  return (
    <Card className="md:w-1/5 xl:w-1/4 bg-transparent backdrop-blur-none rounded-3xl shadow-2xl border border-gray-700/50">
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
