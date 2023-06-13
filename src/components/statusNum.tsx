import { Skeleton } from 'primereact/skeleton';

interface props  {
  title: string;
  value: number;
  isloading: boolean;
}

const StatusNum: React.FC<props> = ({title, value, isloading}) => {
    
    return (
      <>
        {isloading ? 
        <div className="bg-white w-[full] min-h-[110px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-6 py-6 gap-3">
          <Skeleton width="100%" className="mb-2"/>
          <Skeleton width="50%" className="mb-2"/>
        </div> 
        :
        <div className="bg-white w-[full] min-h-[110px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-6 py-6 gap-3">
          <p className="text-[#52678E] sm:text-[14px] text-[10px]">{title}</p>
          <p className="text-black sm:text-[24px] text-[20px] font-bold">{value}</p>        
        </div>
        }
      </>
    );
  };
  
  export default StatusNum;
  