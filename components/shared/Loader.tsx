import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] items-center">
        <RingLoader size={200} color="#000" />
      </div>
    </>
  );
};

export default Loader;