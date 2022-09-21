import { ReactNode } from "react";
import { Container as MaterialContainer } from "@mui/system";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const { children } = props;

  return <MaterialContainer>{children}</MaterialContainer>;
};

export default Container;
