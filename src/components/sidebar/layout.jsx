import { AppSidebar, data } from "../sidebar/sidebar"; // Import sidebar data
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to find the matching sidebar item
  function findMenuPath(path, menu) {
    for (const item of menu) {
      if (item.items) {
        for (const subItem of item.items) {
          if (subItem.url === path) {
            return {
              mainTitle: item.title, // Main menu title
              mainUrl: item.url, // Main menu URL
              subTitle: subItem.title, // Submenu title
              subUrl: subItem.url, // Submenu URL
            };
          }
        }
      }
    }
    return null;
  }

  const matchedItem = findMenuPath(currentPath, data.navMain);

  return (
    <SidebarProvider>
      <div className="flex">
        {/* Sidebar Always Visible */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {matchedItem ? (
                  <>
                    {/* Main Menu Title */}
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={matchedItem.mainUrl}>{matchedItem.mainTitle}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    {/* Submenu Title */}
                    <BreadcrumbItem>
                      <BreadcrumbPage>{matchedItem.subTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{decodeURIComponent(currentPath)}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Render Page Content Here */}
          <main className="p-4 flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
