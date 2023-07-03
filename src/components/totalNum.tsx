import { Skeleton } from "primereact/skeleton";
import LineChart from "./lineChart";

interface props {
  data: any;
  title: string;
  value: number;
  option: number;
  isLoading: boolean;
}
const TotalNum: React.FC<props> = ({
  title,
  value,
  data,
  option,
  isLoading,
}) => {
  return (
    <div className="w-full  flex flex-row px-3 py-6 border-border border-[1px] rounded-[10px]">
      <div className="font-inter px-3 py-6 w-full">
        <p className="pb-3 text-[14px] text-normaltext font-thin">{title}</p>
        {!isLoading ? (
          <p className="text-[24px] font-bold">{value}</p>
        ) : (
          <Skeleton width="100%" height="36px"></Skeleton>
        )}
      </div>
      <div className="w-[100px] h-[100px]">
        {!isLoading ? <LineChart data={data} option={option} /> : <Skeleton width="100px" height="100%"></Skeleton>}
      </div>
    </div>
  );
};

export default TotalNum;
