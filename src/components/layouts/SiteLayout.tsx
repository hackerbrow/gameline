import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SiteLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-background">
      <SiteHeader />
      <main id="main" className="container py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
