import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { PlusCircle, PackageCheck, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
const AdmNavMain = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/admin/add-charity') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="/dashboard/admin/add-charity">
                <PlusCircle />
                Add Charity
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/admin/approval-donation') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="/dashboard/admin/approval-donation">
                <PackageCheck />
                Donation Approval
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/admin/donation-history') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="/dashboard/admin/donation-history">
                <History />
                Donation History
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'rounded-lg p-2 hover:bg-gray-100/35',
                isActive('/dashboard/admin/charities') && 'text-customGreen bg-gray-100'
              )}>
              <Link to="/dashboard/admin/charities">
                <History />
                Charities
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AdmNavMain;
