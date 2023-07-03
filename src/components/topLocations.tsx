import LocationSwitch from "./locationSwitch";
import BubbleChart from "./bubbleChart";
import { user_state } from "@/types/users.type";
import { Skeleton } from "primereact/skeleton";

interface props {
  value: Array<user_state>;
  isLoading: boolean;
}

const TopLocations: React.FC<props> = ({ value, isLoading }) => {
  return (
    <div className="w-full min-h-[300px] flex flex-col border-[1px] border-border rounded-[10px] p-6 ">
      <div className="w-full h-[50px] flex flex-row">
        <p className="my-auto text-[14px] font-inter text-normaltext grow">
          Top 3 Locations
        </p>

        {!isLoading ? (
          <div className=" bg-grayback rounded-[10px] p-2 h-[50px]">
            <LocationSwitch />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-full grow">
        {!isLoading ? (
          <BubbleChart
            data={[
              {
                label: value[0].name,
                data: [{ x: 0, y: 0, r: value[0].value }],
                borderColor: "#356235",
                backgroundColor: "#356235",
              },
              {
                label: value[1].name,
                data: [{ x: 0.5, y: 0, r: value[1].value }],
                borderColor: "#3576F4",
                backgroundColor: "#3576F4",
              },
              {
                label: value[2].name,
                data: [{ x: 1, y: 0.1, r: value[2].value }],
                borderColor: "#7B61FF",
                backgroundColor: "#7B61FF",
              },
            ]}
          />
        ) : (
          <div className="w-full h-full bg-[#F4F4F6]  ">
            <Skeleton width="100%" height="100%"></Skeleton>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLocations;
