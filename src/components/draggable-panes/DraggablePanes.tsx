import React, { useState, useRef, useEffect } from 'react';
import Draggable, {
  DraggableEvent,
  DraggableEventHandler,
  DraggableData,
} from 'react-draggable';

import {
  DraggableBottom,
  DraggableTop,
  DraggableHandle,
  DraggableContainer,
} from './DraggablePanes.styles';

interface DraggablePanesProps {
  topContent: any;
  bottomContent: any;
}

const DraggablePanes = ({ topContent, bottomContent }: DraggablePanesProps) => {
  useEffect(() => {
    document.querySelector('td[scope="cell-active"]')?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [topContent]);

  const [y, setY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const handleDrag: DraggableEventHandler = (
    evt: DraggableEvent,
    dragElement: DraggableData
  ) => {
    const y = dragElement.y;

    setY(y);
  };

  const getHeights = () => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const elementHeight = containerHeight / 2;

    let top = 50,
      bottom = 50;

    if (y !== 0) {
      const offset = y < 0 ? 0 - y : y;

      const percentage = ((elementHeight + offset) / containerHeight) * 100;
      const remainder = 100 - percentage;

      top = y > 0 ? percentage : remainder;
      bottom = y > 0 ? remainder : percentage;
    }

    return {
      top,
      bottom,
    };
  };

  const heights = getHeights();

  return (
    <DraggableContainer ref={containerRef}>
      <DraggableTop style={{ height: `${heights.top}%` }} ref={topRef}>
        {topContent}
      </DraggableTop>
      <DraggableBottom style={{ height: `${heights.bottom}%` }}>
        {bottomContent}
      </DraggableBottom>

      <Draggable nodeRef={nodeRef} axis='y' bounds='parent' onDrag={handleDrag}>
        <DraggableHandle ref={nodeRef}></DraggableHandle>
      </Draggable>
    </DraggableContainer>
  );
};

export default DraggablePanes;
