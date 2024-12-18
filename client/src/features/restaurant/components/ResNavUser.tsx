import { ChevronsUpDown, LoaderCircle, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type ResUser = {
  Id?: string;
  googleProfilePic?: string;
  name: string;
  email: string;
};
const ResNavUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get('token');

  //   console.log('decodedToken', decodedToken);
  const [resUser, setResUser] = useState<ResUser | null>();
  const [currentGoogleUser, setCurrentGoogleUser] = useState<ResUser | null>();
  const [googleUserPP, setGoogleUserPP] = useState<string | null>();
  //   const [userPP, setUserPP] = useState<string | null>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isMobile } = useSidebar();

  useEffect(() => {
    const resUserData = localStorage.getItem('userData');
    const resUserObject = resUserData ? JSON.parse(resUserData) : null;
    console.log('resUserData', resUserData);
    setResUser(resUserObject);
  }, []);

  useEffect(() => {
    const token = urlToken || localStorage.getItem('token');
    if (token) {
      if (urlToken) {
        localStorage.setItem('token', urlToken);
      }
      getCurrentUser(token);
    }
  }, [urlToken]);

  const getCurrentUser = async (token: string) => {
    try {
      await axios.get('http://localhost:3000/auth/currentUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User logged in successfully');
      //   localStorage.setItem('token', token);
      const decodedToken: any = jwtDecode(token);
      //   console.log('User data successfully fetched', res.data);
      setGoogleUserPP(decodedToken.googleProfilePic);
      setCurrentGoogleUser(decodedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.get('http://localhost:3000/auth/logout');
      toast.success('Logged out successfully');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('role');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex justify-center text-white gap-2">
          <LoaderCircle className="animate-spin m-1" />
          <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        </div>
      </div>
    );
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={googleUserPP ?? ''} alt="Profile Pic" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {resUser?.name
                    ? resUser.name
                    : currentGoogleUser?.name
                    ? currentGoogleUser.name
                    : 'Unknown User'}
                </span>
                <span className="truncate text-xs">
                  {resUser?.email
                    ? resUser.email
                    : currentGoogleUser?.email
                    ? currentGoogleUser.email
                    : 'Unknown User'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={googleUserPP ?? ''} alt="" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {resUser?.name
                      ? resUser.name
                      : currentGoogleUser?.name
                      ? currentGoogleUser.name
                      : 'Unknown User'}
                  </span>
                  <span className="truncate text-xs">
                    {resUser?.email
                      ? resUser.email
                      : currentGoogleUser?.email
                      ? currentGoogleUser.email
                      : 'Unknown User'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> maybe in the far future I will add this*/}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ResNavUser;
