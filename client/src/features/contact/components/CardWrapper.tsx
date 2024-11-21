import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  //   CardTitle,
} from '@/components/ui/card';
import FormHeader from './FormHeader';

type CardWrapperProps = {
  label?: string;
  title?: string;

  children: React.ReactNode;
};
const CardWrapper = ({ label, title, children }: CardWrapperProps) => {
  return (
    <Card className="w-[300px] sm:w-[600px]">
      <CardHeader>
        <FormHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
