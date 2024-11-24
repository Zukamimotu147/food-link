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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

type AdminUser = {
  name: string;
  email: string;
};
const AdmNavUser = () => {
  const [adminUser, setAdminUser] = useState<AdminUser>();
  const navigate = useNavigate();
  useEffect(() => {
    const getAdminUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('In admin nav user', userId);
        const response = await axios.get(
          `http://localhost:3000/api/admin/getCurrentAdminUser/${userId}`
        );
        console.log('Admin data successfully fetched', response.data);
        setAdminUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred while fetching data in Admin user.');
          }
        } else {
          toast.error('An unknown error occurred.');
        }
      }
    };

    getAdminUser();
  }, []);

  const { isMobile } = useSidebar();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    toast.success('Logged out successfully');
    navigate('/');
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
                <span className="truncate font-semibold">{adminUser?.name}</span>
                <span className="truncate text-xs">{adminUser?.email}</span>
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
                  <span className="truncate font-semibold">{adminUser?.name}</span>
                  <span className="truncate text-xs">{adminUser?.email}</span>
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

export default AdmNavUser;
