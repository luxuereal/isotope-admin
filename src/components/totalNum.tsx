import LineChart from "./lineChart";

interface props {
  data: any;
  title: string;
  value: number;
  option: number;
}
const TotalNum: React.FC<props> = ({ title, value, data, option }) => {
  return (
    <div className="w-full  flex flex-row px-3 py-6 border-border border-[1px] rounded-[10px]">
      <div className="font-inter px-3 py-6 w-full">
        <p className="pb-3 text-[14px] text-normaltext font-thin">{title}</p>
        <p className="text-[24px] font-bold">{value}</p>
      </div>
      <div className="w-[100px] h-[100px]">
        <LineChart data={data} option={option}/>
      </div>
    </div>
  );
};

export default TotalNum;
