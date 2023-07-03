import { useEffect, useCallback, useState } from "react";
import { Skeleton } from "primereact/skeleton"; 
import { useRouter } from "next/router";

import Paginator from '@/components/paginator';
import Header from "@/components/header";
import Layout from "@/components/layout";
import DisputesTable from "@/components/disputesTable";
import { Disputes } from "@/types/disputes.type";
import getTotalNum from "@/actions/disputes/getTotalNum";
import getDisputes from "@/actions/disputes/getDisputes";
import { itemsPerPage } from "@/utils/constant";


const Home = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<Array<Disputes> | any>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [pageVal, setPageVal] = useState<{ start: number; end: number;}>({
    start: 0,
    end: itemsPerPage - 1
  });

  useEffect(() => {
    (async () => {
      let count = await getTotalNum();
      setTotalNum(count);
    })();
  }, []);

  const getData = useCallback( async () => {
    setLoading(true);
    let datas = await getDisputes(pageVal);
    setDisputes(datas.map((dt: Disputes) => ({
      ...dt,
      id: dt.id + pageVal.start,
      phone: dt.email ? '' : dt.phone_number,
      by_info: dt.by_email ? dt.by_email : dt.by_phone_number
    })));
    setLoading(false);
  }, [pageVal])


  useEffect(() => {
    getData()
  }, [getData]);

  const selectUser = async (uid: string) => {
    await router.push(`usermanage/profile/${uid}`);
  }

  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "disputes", name: "Disputes" }]} />
        <section className="w-full p-8">
          {loading 
          ? 
            <>
              <div className="flex md:flex-row flex-col text-xl sm:justify-between mb-4 font-bold items-center">
                <Skeleton width="10%" />
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
          :
          <>
            <div className="flex text-xl justify-between mb-4 font-bold items-center">
              <span className="text-2xl">{totalNum} Flagged Records</span>
            </div>
            <DisputesTable 
              users={disputes} 
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
                  items={totalNum}
                  itemsPerPage={itemsPerPage}
                  handleChange={setPageVal}
                />
              </div>
            </>
            }
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
