import styled from "@emotion/styled";

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LoaderCover = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export { LoaderWrapper, LoaderCover };
