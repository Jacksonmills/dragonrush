import React, { useState } from 'react';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';
import styled from 'styled-components';
import Card from '@/components/Card';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

type DroppableProps = {
  dropId: UniqueIdentifier,
  draggableIds: string[],
};

export default function DndPage() {
  const tools = ['tool-0', 'tool-1'];
  const [droppables, setDroppables] = useState<DroppableProps[]>([
    {
      dropId: 0, // unique id of droppable step
      draggableIds: [], // copies of the tools with new unique ids go here
    },
    {
      dropId: 1, // unique id of droppable step
      draggableIds: [], // copies of the tools with new unique ids go here
    }
  ]);

  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <DndContext onDragEnd={handleDragEnd}>
          <Wrapper>
            <Toolbox>
              {tools.map((tool) => (
                <Draggable key={tool} id={tool}>
                  <Tool>{tool}</Tool>
                </Draggable>
              ))}
            </Toolbox>

            <ComboBoard>
              {droppables.map(({ dropId, draggableIds }) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={dropId} id={dropId}>
                  <Step>
                    {draggableIds.map((draggable) => (<Draggable key={draggable} id={draggable}>{draggable}</Draggable>))}
                  </Step>
                </Droppable>
              ))}
              <button onClick={addStep}>Add Step</button>
            </ComboBoard>
          </Wrapper>
        </DndContext>
      </MaxWidthWrapper>
    </SiteLayoutWrapper >
  );

  function addStep() {
    setDroppables((droppables) => [
      ...droppables,
      {
        dropId: Math.random().toString(36).substr(2, 9),
        draggableIds: [],
      },
    ]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    setDroppables((current) => {
      if (over && active) {
        return [
          ...current,
          {
            dropId: active.id,
            draggableIds: [...current[active.id].draggableIds, crypto.randomUUID()],
          },
        ];
      }

      return [...current];
    });
  }
};

const Wrapper = styled.div`
  display: flex;
  gap: 26px;
`;

const Toolbox = styled(Card)`
  padding: 12px;
  flex-direction: column;
  flex-basis: 10%;
`;

const Tool = styled.div`
  background-color: blue;
`;

const ComboBoard = styled(Card)`
  padding: 12px;
  flex-direction: column;
  flex-basis: 100%;
`;

const Step = styled.div`
  padding: 12px;
  flex-direction: column;
  border: 4px dashed #ccc;
`;