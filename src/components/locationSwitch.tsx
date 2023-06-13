import useParticipantStore from "@/store/use-participant";
import { useState } from "react";

const LocationSwitch = () => {
  const [checked, setChecked] = useState(false);
  const {
    location_state,
    setLocationState,
  } = useParticipantStore((state) => state);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div className="w-[140px] grid grid-cols-2 text-center gap-1 cursor-pointer" onClick={()=> setLocationState(!location_state)}>
      <div className="py-[6px] rounded-lg h-[34px]" style={location_state?{background: '#FFF'}:{}}>Country</div>
      <div className="py-[6px] rounded-lg h-[34px]" style={!location_state?{background: '#FFF'}:{}}>City</div>
    </div>
  );
};

export default LocationSwitch;
