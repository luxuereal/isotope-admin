import { useEffect, useCallback, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Skeleton } from "primereact/skeleton"; 
import { CgArrowRight } from "react-icons/cg";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import Header from "@/components/header";
import UserTable from "@/components/userTable";
import Paginator from '@/components/paginator';
import getTotalNum from "@/actions/usermanage/getTotalNum";
import getProfiles from "@/actions/usermanage/getProfiles";
import { filterOptions } from "@/utils/constant";
import { users } from '@/types/users.type';
import { FilterUser } from "@/types/filter.type";
import { itemsPerPage } from "@/utils/constant";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Array<users> | any>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [pageVal, setPageVal] = useState<{ start: number; end: number }>({
    start: 0,
    end: itemsPerPage - 1
  });

  const [status, setStatus] = useState<number | boolean>(-1);

  const [filter, setFilter] = useState<FilterUser>({
    type: [],
    status: [],
    gender: [],
  });

  const getData = useCallback( async () => {
    setLoading(true);
    let count = typeof status === 'boolean' ? await getTotalNum(filter) : await getTotalNum();
    let datas = typeof status === 'boolean' ? await getProfiles(pageVal, filter) : await getProfiles(pageVal);
    setTotalNum(count);
    
    setUsers(datas.map((dt: users) => ({
      ...dt,
      id: dt.id + pageVal.start,
      phone: dt.email ? '' : dt.phone_number
    })));
    setLoading(false);
  }, [status, pageVal])

  useEffect(() => {
    getData()
  }, [getData]);

  const selectUser = async (uid: string) => {
    await router.push(`usermanage/profile/${uid}`);
  }

  const clickFilter = () => {
    setPageVal({
      start: 0,
      end: itemsPerPage - 1
    })
    typeof status === 'boolean' ? setStatus(prevState => !prevState) : setStatus(true);
  }

  return (
    <Layout>
      <Header headers={[{ href: '/usermanage', name: 'User Management'}]} />
      <section className="w-full p-8">
        {loading ? (
          <>
            <div className="flex md:flex-row flex-col text-xl sm:justify-between mb-4 font-bold items-center">
              <Skeleton width="10%" />
              <Skeleton width="30%" />
            </div>
            <div className="p-datatable-wrapper w-full">
              <table className="p-datatable w-full">
                <thead>
                  <tr>
                    <th className="p-6">
                      <Skeleton width="100%" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(itemsPerPage).fill('').map((ele, idx) =>
                    <tr key={`ske-${idx}`} className="p-4">
                      <td className="p-6">
                        <Skeleton width="100%" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) :
          <>
            <div className="flex md:flex-row flex-col text-xl sm:justify-between mb-4 font-bold items-center">
              <span className="md:text-2xl text-base md:mb-0 mb-6">{totalNum} Users</span>
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-1 !md:text-base !text-xs">
                <span className="w-20 mr-4 whitespace-nowrap flex items-center !text-base">
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
                  className="w-full select-left"
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
                  className="w-full select-center"
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
                  className="w-full select-center"
                />
                <button className="check-btn bg-deepback text-white rounded-r-md px-4 text-xl" onClick={clickFilter}>
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
        <div className='flex min-[480px]:flex-row flex-col min-[480px]:justify-between justify-items-stretch min-[480px]:items-center mt-4'>
          {totalNum === 0
          ?
            loading ?<>
              <Skeleton width="20%" />
              <Skeleton width="20%" />
            </> : <></>
          :
          <>
            {loading ? <Skeleton width="20%" /> : <span className="min-[480px]:text-md text-sm min-[480px]:mb-0 mb-4">Showing {pageVal.start + 1} - {pageVal.end + 1 > totalNum ? totalNum : pageVal.end + 1} users of {totalNum}</span>}
            <div className="relative">
              <Paginator
                key={`paginate-${status}`}
                items={totalNum}
                itemsPerPage={itemsPerPage}
                handleChange={setPageVal}
              />
            </div>
          </>
          }
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
