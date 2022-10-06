import Header from "components/header";
import { ReactNode } from "react";

import { PageWrapper } from "./Layout.styles";

interface BodyProps {
  children: ReactNode;
}

const Body = (props: BodyProps) => {
  const { children } = props;

  return (
    <div>
      <Header />

      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default Body;
