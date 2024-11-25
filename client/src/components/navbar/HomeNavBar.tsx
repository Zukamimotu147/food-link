import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  //   SheetDescription,
  //   SheetHeader,
  //   SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Foodlinklogo from '/src/assets/Foodlinklogo.png';

const HomeNavBar = () => {
  return (
    <header
      className="fixed top-0 left-0 z-20 bg-customGreen w-full p-3 flex justify-between items-center text-white"
      style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <div className="flex gap-3 items-center ml-3">
        <Link to="/">
          <img src={Foodlinklogo} alt="Logo" className="w-10 h-10" />
        </Link>
        <p className="font-bold sm:block hidden">Food Link</p>
      </div>
      <div className="sm:block hidden">
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
      </div>
      <div className="flex gap-3">
        <Button variant={'outline'} className="font-bold text-black" asChild>
          <Link to="/auth/register">Sign-Up</Link>
        </Button>
        <Button variant={'outline'} className="font-bold text-black">
          <Link to="/auth/login">Login</Link>
        </Button>
        <div className="sm:hidden block">
          <Sheet>
            <SheetTrigger className="mt-2">
              <Menu />
            </SheetTrigger>
            <SheetContent side="top" className="bg-customGreen">
              <NavigationMenu>
                <NavigationMenuList className="flex justify-center items-center text-white">
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about-us">
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/faq">
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                        FAQs
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact-us">
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}>
                        Contact Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default HomeNavBar;
