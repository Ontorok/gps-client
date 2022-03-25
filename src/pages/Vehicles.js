import * as React from "react";
import CustomTab from "../components/CustomTab";
import NeededToBeSentNonGrooming from "../parts/vehicles/NeededToBeSentNonGrooming";
import RejectedNonGrooming from "../parts/vehicles/RejectedNonGrooming";

export default function Vehicles() {
  const components = [
    {
      index: 0,
      heading: "Needed To Be Sent",

      component: (
        <React.Fragment>
          <NeededToBeSentNonGrooming />
        </React.Fragment>
      ),
      hasPermission: true,
    },
    {
      index: 1,
      heading: "Rejected",
      component: (
        <React.Fragment>
          <RejectedNonGrooming />
        </React.Fragment>
      ),
      hasPermission: true,
    },
  ];

  return (
    <CustomTab components={components.filter((item) => item.hasPermission)} />
  );
}
