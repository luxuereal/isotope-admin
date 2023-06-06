import { useSupabaseClient } from "@supabase/auth-helpers-react";
import StatusNum from "@/components/statusNum";
import Summary from "@/components/summary";
import useAccess from "@/utils/useAccess";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const Home = () => {
  const supabase = useSupabaseClient();

  useAccess();

  const data = [
    { name: "New York", value: 230 },
    { name: "Oregon", value: 80 },
    { name: "Texas", value: 50 },
    { name: "Ohio", value: 40 },
    { name: "Ohio", value: 40 },
  ];

  const data1 = [
    { name: "Female", value: 230 },
    { name: "Male", value: 80 },
    { name: "Non-binary", value: 50 },
  ];

  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full">
        <Header headers={[{ href: 'dashboard', name: 'Dashboard' }]} />
        <section className="w-full p-8">
          <div className="grid grid-cols-4 gap-6">
            <StatusNum title="Number of registered users" value={230} />
            <StatusNum title="Number of active users" value={430} />
            <StatusNum title="Number of premium users" value={120} />
            <StatusNum title="Number of users online" value={300} />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <Summary title="Summary of users state" data={data} color="#3576F4" />
            <Summary
              title="Summary of users state"
              data={data1}
              color="#FAC137"
            />
          </div>
        </section>
        </div>
    </div>
  );
};

export default Home;
