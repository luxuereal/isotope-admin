interface props  {
  title: string;
  value: number;
}
const StatusNum: React.FC<props> = ({title, value}) => {
    
    return (
      <div className="bg-white w-[full] h-[110px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-[24px] py-[22px] gap-[12px]">
        <p className="text-[#52678E] text-[14px]">{title}</p>
        <p className="text-black text-[24px] font-bold">{value}</p>        
      </div>
    );
  };
  
  export default StatusNum;
  