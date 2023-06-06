import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import useAccess from "@/utils/useAccess";

const Home = () => {

  useAccess();
    
  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full">
        <Header headers={[{ href: 'notify', name: 'Show notifications' }]} />
        <section className="w-full p-8">
        </section>
      </div>
    </div>
  );
};
  
export default Home;