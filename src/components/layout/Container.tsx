import { ReactNode } from "react";
import { Container as MaterialContainer } from "@mui/material";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const { children } = props;

  return <MaterialContainer>{children}</MaterialContainer>;
};

export default Container;
