import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ResNavMain from './ResNavMain';
import ResNavUser from './ResNavUser';

const ResSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="bg-customGreen text-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <p>Food Link</p>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ResNavMain />
      </SidebarContent>
      <SidebarFooter>
        <ResNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default ResSidebar;
