import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title}-ShopeIT`}</title>
    </Helmet>
  );
};

export default MetaData;
