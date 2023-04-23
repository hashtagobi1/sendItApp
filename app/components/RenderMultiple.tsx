import React from "react";
import Loading from "./Loading";

type Props = {
  noOfTimes: number;
  Component: () => JSX.Element;
};

const RenderMultiple = ({ noOfTimes, Component }: Props) => {
  return <div>{Array(noOfTimes).fill(
//   <Loading/>
<Component/>
  )}</div>;
};

export default RenderMultiple;