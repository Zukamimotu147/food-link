import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type AuthFooterProps = {
  label: string;
  href: string;
};

const AuthFooter = ({ label, href }: AuthFooterProps) => {
  return (
    <Button variant="link" className="w-full font-normal" asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};

export default AuthFooter;
