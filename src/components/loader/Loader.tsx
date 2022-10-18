import { CircularProgress } from "@mui/material";
import React from "react";
import { LoaderWrapper, LoaderCover } from "./Loader.styles";

interface LoaderProps {
  type: "inline" | "cover";
}

const Loader = (props: LoaderProps) => {
  const { type } = props;

  const renderWrapper = (spinner: React.ReactNode) => {
    if (type === "inline") {
      return <LoaderWrapper>{spinner}</LoaderWrapper>;
    }

    return <LoaderCover>{spinner}</LoaderCover>;
  };

  return renderWrapper(<CircularProgress />);
};

export default Loader;
