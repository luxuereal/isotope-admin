import { Skeleton } from 'primereact/skeleton';
import { Summary } from '@/types/summary.type'

interface props {
  title: string;
  data: Summary[];
  color: string;
  isloading: boolean;
}

const Summary: React.FC<props> = ({ title, data, color, isloading }) => {
  return (
    <div className="bg-white w-full min-h-[300px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-6 py-6 gap-4">
      <p className="text-[#52678E] sm:text-[14px] text-[10px]">{title}</p>
      {isloading? 
        <>
          <Skeleton width="100%"/>
          <Skeleton width="80%"/>
          <Skeleton width="60%"/>
          <Skeleton width="40%"/>
        </>
      : 
      <>
        {data.map((item, idx) => (
          <div
            key={`summary-${idx}`}
            className="flex flex-row sm:gap-3 gap-0 justify-items-stretch "
          >
            <span className="sm:py-[10px] py-[5px]  flex-none w-[120px] sm:min-w-[120px] min-w-[75px] my-auto sm:text-[14px] text-[10px]">{item.name}</span>
            <div className="grow my-auto sm:py-[10px] py-[5px]">
              <div
                className="sm:h-4 rounded-[4px] h-2 "
                style={{ width: `${(item.value / data[0].value) * 100}%`, background:`${color}`, opacity:`${1-idx/data.length}` }}
              ></div>
            </div>
            <span className="sm:py-[10px] py-[5px] flex-none sm:min-w-[50px] min-w-[25px] text-right my-auto sm:text-[14px] text-[10px]">
              {item.value}
            </span>
          </div>
        ))}
      </>
      }
      
    </div>
  );
};

export default Summary;
