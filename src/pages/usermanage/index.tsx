import {
  useSessionContext,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { CgArrowRight } from "react-icons/cg";

import UserTable from "@/components/userTable";
import Sidebar from "@/components/sidebar";
import Profile from "@/components/profile";
import { Database } from "@/utils/database.types";
import useAccess from "@/utils/useAccess";
import { User } from "@/types";
import { FilterUser } from "@/types";
import Header from "@/components/header";

type Profiles = Database["public"]["Tables"]["users"]["Row"];

const Dashboard = () => {
  useAccess();
  const { isLoading, session, error } = useSessionContext();
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Array<User>>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [profile, setProfile] = useState<User | any>();

  const [filter, setFilter] = useState<FilterUser>({
    type: [],
    status: [],
    gender: [],
  });

  useEffect(() => {
    if (session) getData();
  }, [session]);

  async function getData() {
    try {
      setLoading(true);

      let total = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      let datas = await supabase
        .from("users")
        .select(`uid, created_at, phone_number, email, provider, is_disabled`);

      if (total.error || datas.error) {
        throw error;
      }
      if (datas.data && total.count) {
        setTotalNum(total.count);
        setUsers(
          datas.data.map((dt, index) => ({
            ...dt,
            id: index + 1,
            created_at: new Date(dt.created_at).toLocaleString(),
          }))
        );
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const options = {
    type: [
      { name: "Premium", code: "1" },
      { name: "Standard", code: "2" },
    ],
    status: [
      { name: "Suspended", code: "1" },
      { name: "Flagged", code: "2" },
    ],
    gender: [
      { name: "Male", code: "1" },
      { name: "Female", code: "2" },
      { name: "Transgender", code: "3" },
    ],
  };

  const selectUser = (uid: string) => {
    setSelectedUser(uid);
    fetchProfile(uid);
  }

  const fetchProfile = async (uid: string = selectedUser) => {
    try {
      let userProfile = await supabase
        .from("users")
        .select()
        .eq('uid', uid);

      setProfile(userProfile.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full ml-80">
        <Header headers={[{ href: "usermanage", name: "User Management" }]} />
        <section className="w-full p-8">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <div className="flex text-xl justify-between mb-4 font-bold items-center">
                <span className="text-2xl">{totalNum} Users</span>
                <div className="flex">
                  <span className="w-20 mr-4 whitespace-nowrap flex items-center">
                    Filter by:&nbsp;&nbsp;
                  </span>
                  <MultiSelect
                    value={filter?.type}
                    onChange={(e: MultiSelectChangeEvent) =>
                      setFilter((prevState: FilterUser) => ({
                        ...prevState,
                        type: e.value,
                      }))
                    }
                    options={options.type}
                    optionLabel="name"
                    placeholder="Account type"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem select-left"
                  />
                  <MultiSelect
                    value={filter?.status}
                    onChange={(e: MultiSelectChangeEvent) =>
                      setFilter((prevState: FilterUser) => ({
                        ...prevState,
                        status: e.value,
                      }))
                    }
                    options={options.status}
                    optionLabel="name"
                    placeholder="Status"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem select-center"
                  />
                  <MultiSelect
                    value={filter?.gender}
                    onChange={(e: MultiSelectChangeEvent) =>
                      setFilter((prevState: FilterUser) => ({
                        ...prevState,
                        gender: e.value,
                      }))
                    }
                    options={options.gender}
                    optionLabel="name"
                    placeholder="Gender"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem select-center"
                  />
                  <button className="bg-deepback text-white rounded-r-md px-4 text-xl">
                    <CgArrowRight />
                  </button>
                </div>
              </div>
              {
                profile ?
                  <Profile profile={profile} />
                : 
                  <UserTable users={users} selectUser={selectUser} />
              }
              {/* <Profile /> */}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
