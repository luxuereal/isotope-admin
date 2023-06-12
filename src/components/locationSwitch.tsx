import { useState } from "react";

import Switch from "react-switch";

const LocationSwitch = () => {
    const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <Switch
      width={140}
      height={34}
      checked={checked}
      onChange={handleChange}
      
      offHandleColor="#f5f5f5"
      onHandleColor="#f5f5f5"
      offColor="#f5f5f5"
      onColor="#f5f5f5"
      activeBoxShadow="0px 0px 0px rgba(0, 0, 0, 1)"
      
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "50px",
            fontSize: 15,
            color: "black",
            paddingRight: 2,
            background: "#FFFFFF",
            borderRadius: 10,
          }}
        >
          City
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "72px",
            fontSize: 15,
            color: "black",
            background: "#FFFFFF",
            borderRadius: 10,
            paddingRight: 2,
          }}
        >
          Country
        </div>
      }
      className="react-switch"
      id="icon-switch"
    />
  );
};

export default LocationSwitch;
