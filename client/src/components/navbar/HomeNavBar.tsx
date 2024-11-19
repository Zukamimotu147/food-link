import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const HomeNavBar = () => {
  return (
    <header className="bg-customGreen w-full p-3 flex justify-between items-center text-white">
      <div className="flex gap-3 items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-25 h-25" />
        </Link>
        <p className="font-bold">Food Link</p>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-white')}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about-us">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-white')}>
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/faq">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-white ')}>
                FAQs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact-us">
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-white ')}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3">
        <Button variant={'outline'} className="font-bold text-black">
          Sign-Up
        </Button>
        <Button variant={'outline'} className="font-bold text-black">
          Login
        </Button>
      </div>
    </header>
  );
};

export default HomeNavBar;
