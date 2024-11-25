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
import AdmNavMain from './AdmNavMain';
import AdmNavUser from './AdmNavUser';
import Foodlinklogo from '../../../assets/Foodlinklogo.png';
const AdmSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="bg-customGreen text-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={Foodlinklogo} alt="" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <p>Food Link</p>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdmNavMain />
      </SidebarContent>
      <SidebarFooter>
        <AdmNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdmSidebar;
