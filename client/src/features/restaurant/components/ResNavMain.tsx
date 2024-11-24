import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { House, CirclePlus, Hourglass, History } from 'lucide-react';
import { Link } from 'react-router-dom';
const ResNavMain = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Restaurant Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="res-overview">
                <House />
                Overview
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="add-donation">
                <CirclePlus />
                Add Donation
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="active-donation">
                <Hourglass />
                Active Donation
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
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
