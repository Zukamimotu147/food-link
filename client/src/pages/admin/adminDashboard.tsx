import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Separator } from '@/components/ui/separator';
import AdmSidebar from '@/features/admin/components/AdmSidebar';
import { Outlet } from 'react-router-dom';
gsap.registerPlugin(useGSAP);
const adminDashboard = () => {
  useGSAP(() => {
    gsap.to('.contentText', {
      duration: 2,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      text: 'Welcome to Food Link Admin Dashboard',
    });
  });
  return (
    <main>
      <SidebarProvider>
        <AdmSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="contentText text-customGreen font-semibold"></h1>
            </div>
          </header>
          <div className="padding">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default adminDashboard;
