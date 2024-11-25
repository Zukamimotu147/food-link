import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { set } from 'date-fns';

type ResUser = {
  name: string;
  email: string;
};
const ResNavUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  console.log('token', token);
  //   const decodedToken: any = jwtDecode(token);
  //   console.log('decodedToken', decodedToken);
  const [resUser, setResUser] = useState<ResUser>();
  const [currentUser, setCurrentUser] = useState<ResUser>();

  const { isMobile } = useSidebar();
  useEffect(() => {
    const getCurrentRestaurantUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(
          `http://localhost:3000/api/restaurant/getCurrentRestaurantUser/${userId}`
        );
        console.log('Restaurant data successfully fetched', res.data);
        setResUser(res.data);
        console.log(res.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            // toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred while fetching data.');
          }
        } else {
          toast.error('An unknown error occurred.');
        }
      }
    };

    getCurrentRestaurantUser();
  }, []);
  const getCurrentUser = async (token: string) => {
    try {
      const res = await axios.get('http://localhost:3000/auth/currentUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('token', token);
      console.log('User data successfully fetched', res.data);
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/logout', { withCredentials: true });
      toast.success('Logged out successfully');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {resUser?.name
                    ? resUser.name
                    : currentUser?.name
                    ? currentUser.name
                    : 'Unknown User'}
                </span>
                <span className="truncate text-xs">
                  {resUser?.email
                    ? resUser.email
                    : currentUser?.email
                    ? currentUser.email
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
                  <AvatarImage src="" alt="" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{resUser?.name}</span>
                  <span className="truncate text-xs">{resUser?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
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
