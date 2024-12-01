import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { House, CirclePlus, Hourglass, History, HeartHandshake } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const ResNavMain = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Restaurant Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/restaurant/res-overview') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="res-overview">
                <House />
                Overview
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/restaurant/add-donation') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="add-donation">
                <CirclePlus />
                Add Donation
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/restaurant/active-donation') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="active-donation">
                <Hourglass />
                Active Donation
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/restaurant/charity-view') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="charity-view">
                <HeartHandshake />
                Charities
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/restaurant/donation-history') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="donation-history">
                <History />
                Donation History
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ResNavMain;
