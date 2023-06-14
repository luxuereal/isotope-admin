import { useEffect, useState } from "react";

import Paginator from '@/components/paginator';
import Header from "@/components/header";
import Layout from "@/components/layout";
import DisputesTable from "@/components/disputesTable";
import { Disputes } from "@/types/disputes.type";
import getTotalNum from "@/actions/disputes/getTotalNum";
import getDisputes from "@/actions/disputes/getDisputes";


const Home = () => {

  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<Array<Disputes> | any>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [itemsPerPage] = useState<number>(3);
  const [pageVal, setPageVal] = useState<{ start: number; end: number;}>({
    start: 0,
    end: itemsPerPage - 1
  });

  useEffect(() => {
    (async () => {
      let count = await getTotalNum();
      setTotalNum(count);
    })();
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true);
      let datas = await getDisputes(pageVal);
      setDisputes(datas.map((dt: Disputes) => ({
        ...dt,
        id: dt.id + pageVal.start
      })));
      setLoading(false);
    })();
  }, [pageVal]);

  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "disputes", name: "Disputes" }]} />
        <section className="w-full p-8">
          {loading 
          ? "Loading"
          :
          <>
            <div className="flex text-xl justify-between mb-4 font-bold items-center">
              <span className="text-2xl">{totalNum} Flagged Accounts</span>
            </div>
            <DisputesTable 
              users={disputes} 
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
      </div>
    </Layout>
  );
};

export default Home;
