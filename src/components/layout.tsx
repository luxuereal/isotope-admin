import Sidebar from "@/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full lg:pl-80 pl-8">{children}</div>
    </div>
  );
}
