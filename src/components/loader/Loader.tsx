import { CircularProgress } from "@mui/material";
import { LoaderWrapper } from "./Loader.styles";

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
