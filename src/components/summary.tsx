import { Summary } from "@/types";
interface props {
  title: string;
  data: Summary[];
  color: string;
}
const Summary: React.FC<props> = ({ title, data, color }) => {
  return (
    <div className="bg-white w-full min-h-[300px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-6 py-6 gap-4">
      <p className="text-[#52678E] text-[14px]">{title}</p>
      {data.map((item, idx) => (
        <div
          key={`summary-${idx}`}
          className="flex flex-row gap-3 justify-items-stretch h-10"
        >
          <span className="flex-none min-w-[100px] my-auto">{item.name}</span>
          <div className="grow my-auto">
            <div
              className="h-4 rounded-[4px] "
              style={{ width: `${(item.value / data[0].value) * 100}%`, background:`${color}`, opacity:`${1-idx/data.length}` }}
            ></div>
          </div>
          <span className="flex-none min-w-[50px] text-right my-auto">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Summary;
