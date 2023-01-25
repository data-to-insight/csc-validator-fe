import styled from "@emotion/styled";
import { greys } from "@sfdl/sf-mui-components";

const DraggableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

const DraggableTop = styled.div`
  height: 50%;
  overflow-x: auto;
  overflow-y: auto;
`;

const DraggableBottom = styled.div`
  height: 50%;
  overflow-x: auto;
  overflow-y: auto;
`;

const DraggableHandle = styled.div`
  position: absolute;
  width: 100%;
  background: ${greys.mid};
  height: 2px;
  display: block;
  left: 0;
  top: 50%;
  cursor: ns-resize;

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    height: 20px;
    margin-top: -10px;
    width: 40px;
    background: white;
    left: 50%;
    margin-left: -20px;

    border-radius: 4px;
    background-color: ${greys.mid};
    background-repeat: repeat;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw1AUhv8+pCIVBYuIOGRonSyIijhqFYpQIdQKrTqY3PQFTRqSFBdHwbXg4GOx6uDirKuDqyAIPkBcXZwUXaTEc5NCixgPXO7Hf8//c++5gL9RYaoZHAdUzTLSyYSQza0KoVf4EEQ/BhGTmKnPiWIKnvV1T91Ud3Ge5d33Z/UqeZMBPoF4lumGRbxBPL1p6Zz3iSOsJCnE58RjBl2Q+JHrsstvnIsO+3lmxMik54kjxEKxg+UOZiVDJZ4ijiqqRvn+rMsK5y3OaqXGWvfkLwzntZVlrtMaQRKLWIIIATJqKKMCC3HaNVJMpOk84eEfdvwiuWRylcHIsYAqVEiOH/wPfs/WLExOuEnhBND1YtsfMSC0CzTrtv19bNvNEyDwDFxpbX+1Acx8kl5va9EjoG8buLhua/IecLkDDD3pkiE5UoCWv1AA3s/om3LAwC3Qs+bOrXWO0wcgQ7NK3QAHh8BokbLXPd7d3Tm3f3ta8/sBOVBykPd2vFUAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfnAQQQGQDysTUVAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAABBJREFUCNdj+P///38GVAAARc4D/b5MvWkAAAAASUVORK5CYII=");
  }
`;

export { DraggableContainer, DraggableTop, DraggableBottom, DraggableHandle };
