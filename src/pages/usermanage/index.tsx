import { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { CgArrowRight } from "react-icons/cg";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import Header from "@/components/header";
import UserTable from "@/components/userTable";
import Paginator from '@/components/paginator';
import getTotalNum from "@/actions/usermanage/getTotalNum";
import getProfiles from "@/actions/usermanage/getProfiles";
import filterOptions from "@/utils/filterOptions";
import { users } from '@/types/users.type';
import { FilterUser } from "@/types/filter.type";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Array<users> | any>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [itemsPerPage] = useState<number>(3);
  const [pageVal, setPageVal] = useState<{ start: number; end: number;}>({
    start: 0,
    end: itemsPerPage - 1
  });
  const [status, setStatus] = useState<number | boolean>(-1);

  const [filter, setFilter] = useState<FilterUser>({
    type: [],
    status: [],
    gender: [],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      let count = typeof status === 'boolean' ? await getTotalNum(filter) : await getTotalNum();
      let datas = typeof status === 'boolean' ? await getProfiles(pageVal, filter) : await getProfiles(pageVal);
      setTotalNum(count);
      setUsers(datas.map((dt: users) => ({
        ...dt,
        id: dt.id + pageVal.start
      })));
      setLoading(false);
    })();
  }, [status, pageVal]);

  const selectUser = async (uid: string) => {
    await router.push(`usermanage/profile/${uid}`);
  }

  const clickFilter = () => typeof status === 'boolean' ? setStatus(prevState => !prevState) : setStatus(true);

  return (
    <Layout>
      <Header headers={[{ href: '/usermanage', name: 'User Management'}]} />
      <section className="w-full p-8">
        {loading ? (
          "Loading..."
        ) :
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
                  options={filterOptions.type}
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
                  options={filterOptions.status}
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
                  options={filterOptions.gender}
                  optionLabel="name"
                  placeholder="Gender"
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem select-center"
                />
                <button className="bg-deepback text-white rounded-r-md px-4 text-xl" onClick={clickFilter}>
                  <CgArrowRight />
                </button>
              </div>
            </div>
            <UserTable 
              users={users} 
              selectUser={selectUser}
            />
          </>
        }
        <div className='flex justify-between items-center'>
          <span>Showing {pageVal.start + 1} - {pageVal.end + 1 > totalNum ? totalNum : pageVal.end + 1} users of {totalNum}</span>
          {
            totalNum === 0 
            ?
              <></>
            :
            <Paginator
              items={totalNum}
              itemsPerPage={itemsPerPage}
              handleChange={setPageVal}
            />
          }
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
