import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { PlusCircle, PackageCheck, History } from 'lucide-react';
import { Link } from 'react-router-dom';
const AdmNavMain = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard/admin/add-charity">
                <PlusCircle />
                Add Charity
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard/admin/approval-donation">
                <PackageCheck />
                Donation Approval
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard/admin/donation-history">
                <History />
                Donation History
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
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
