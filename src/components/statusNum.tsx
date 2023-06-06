interface props  {
  title: string;
  value: number;
}
const StatusNum: React.FC<props> = ({title, value}) => {
    
    return (
      <div className="bg-white w-[full] min-h-[110px] font-inter text-left border-[#E3E8F2] border-[1px] rounded-[10px] flex flex-col px-6 py-6 gap-3">
        <p className="text-[#52678E] text-[14px]">{title}</p>
        <p className="text-black text-[24px] font-bold">{value}</p>        
      </div>
    );
  };
  
  export default StatusNum;
  