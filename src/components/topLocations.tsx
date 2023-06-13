import LocationSwitch from "./locationSwitch";
import BubbleChart from "./bubbleChart";

const toplocations = [
    {
      label: "USA",
      data: [{ x: 0, y: 0, r: 40 }],
      borderColor: "#356235",
      backgroundColor: "#356235",
    },
    {
      label: "Australia",
      data: [{ x: 0.5, y: 0, r: 40 }],
      borderColor: "#3576F4",
      backgroundColor: "#3576F4",
    },
    {
      label: "England",
      data: [{ x: 1, y: 0.1, r: 20 }],
      borderColor: "#7B61FF",
      backgroundColor: "#7B61FF",
    },
  ];

const TopLocations = () => {
  return (
    <div className="w-full flex flex-col border-[1px] border-border rounded-[10px] p-6 ">
      <div className="w-full h-[50px] flex flex-row">
        <p className="my-auto text-[14px] font-inter text-normaltext grow">
          Top 3 Locations
        </p>
        <div className=" bg-grayback rounded-[10px] p-2 h-[50px]">
          <LocationSwitch />
        </div>
      </div>
      <div className="w-full grow">
        <BubbleChart data={toplocations} />
      </div>
    </div>
  );
};

export default TopLocations;
