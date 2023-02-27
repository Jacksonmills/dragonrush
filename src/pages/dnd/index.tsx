import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';
import styled from 'styled-components';
import Card from '@/components/Card';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import Sortable from '@/components/Sortable';
import { COLORS, INPUTS } from '@/constants';
import { X } from 'react-feather';
import UnstyledButton from '@/components/UnstyledButton';

type DroppableProps = {
  dropId: UniqueIdentifier;
  draggableIds: DraggableProps[];
};

type DraggableProps = {
  draggableId: UniqueIdentifier;
  payload: string;
};

export default function DndPage() {
  const tools: DraggableProps[] = [
    { draggableId: 'tool-0', payload: INPUTS.attacks[0]! },
    { draggableId: 'tool-1', payload: INPUTS.attacks[1]! },
    { draggableId: 'tool-2', payload: INPUTS.attacks[2]! },
    { draggableId: 'tool-3', payload: INPUTS.attacks[3]! },
    { draggableId: 'tool-4', payload: INPUTS.assists[0]! },
    { draggableId: 'tool-5', payload: INPUTS.assists[1]! },
    { draggableId: 'tool-6', payload: INPUTS.directions[0]! },
    { draggableId: 'tool-7', payload: INPUTS.directions[1]! },
    { draggableId: 'tool-8', payload: INPUTS.directions[2]! },
    { draggableId: 'tool-9', payload: INPUTS.directions[3]! },
    { draggableId: 'tool-10', payload: INPUTS.directions[4]! },
    { draggableId: 'tool-11', payload: INPUTS.directions[5]! },
    { draggableId: 'tool-12', payload: INPUTS.directions[6]! },
    { draggableId: 'tool-13', payload: INPUTS.directions[7]! },
    { draggableId: 'tool-14', payload: INPUTS.directions[8]! },
  ];
  const [droppables, setDroppables] = useState<DroppableProps[]>([
    {
      dropId: uuid(), // unique id of droppable step
      draggableIds: [], // copies of the tools with new unique ids go here
    },
  ]);

  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <DndContext id="0-dnd" onDragEnd={handleDragEnd}>
          <Wrapper>
            <Toolbox>
              {tools.map(({ draggableId, payload }) => (
                <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                  <Input input={payload} />
                </Draggable>
              ))}
            </Toolbox>
            <ComboBoard>
              <SortableContext items={droppables.map(d => d.dropId)}>
                <ComboString>
                  {droppables.map(({ dropId, draggableIds }) => (
                    <Sortable key={dropId} id={dropId} handle={true}>
                      <SortableContext items={draggableIds.map(d => d.draggableId)}>
                        <Droppable id={dropId} accepts={["TOOL", "INPUT"]}>
                          <Step>
                            {draggableIds.map(({ draggableId, payload }) => (
                              <Sortable key={draggableId} id={draggableId}>
                                <Draggable id={draggableId} payload={payload} type="INPUT">
                                  <Input input={payload} />
                                </Draggable>
                              </Sortable>
                            ))}
                            <RemoveStepButton onClick={() => removeStep(dropId)}><X /></RemoveStepButton>
                          </Step>
                        </Droppable>
                      </SortableContext>
                    </Sortable>
                  ))}
                  <AddStepButton onClick={addStep}>Add Step</AddStepButton>
                </ComboString>
              </SortableContext>
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
        dropId: uuid(),
        draggableIds: [],
      },
    ]);
  }

  function removeStep(id: UniqueIdentifier) {
    setDroppables((droppables) => {
      return droppables.filter(({ dropId }) => dropId !== id);
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active, activatorEvent } = event;
    if (!over || !active) return;
    console.log(activatorEvent);
    // Sorting combo steps
    if (active.data.current?.type !== "INPUT" && active.data.current?.type !== "TOOL") {
      setDroppables((prevDroppables) => {
        const oldIndex = prevDroppables.findIndex(d => d.dropId === active.id);
        const newIndex = prevDroppables.findIndex(d => d.dropId === over.id);
        return arrayMove(prevDroppables, oldIndex, newIndex);
      });
    }

    // Dropping new button on step
    if (active.data.current?.type === "INPUT" || active.data.current?.type === "TOOL") {
      setDroppables((prevDroppables) => {
        const newDroppables = prevDroppables.map((droppable) => {
          const hasMatchingId = droppable.draggableIds.some(({ draggableId }) => draggableId === active.id);
          if (hasMatchingId) {
            droppable = {
              ...droppable,
              draggableIds: droppable.draggableIds.filter(({ draggableId }) => draggableId !== active.id),
            };
          }
          if (droppable.dropId === over.id && !hasMatchingId && active.id !== over.id) {
            droppable.draggableIds.push({
              draggableId: active.data.current?.type === "TOOL" ? uuid() : active.id,
              payload: active.data.current?.payload,
            });
          }
          return droppable;
        });
        return newDroppables;
      });
    }
  }
};

const Wrapper = styled.div`
  display: flex;
  gap: 26px;
`;

const Toolbox = styled(Card)`
  padding: 12px;
  flex-direction: row;
  flex-basis: 10%;
  flex-wrap: wrap;
`;

const ComboBoard = styled(Card)`
  padding: 12px;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ComboString = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const RemoveStepButton = styled(UnstyledButton)`
  display: none;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 2px;
  background-color: ${COLORS.white};
  border: 2px solid ${COLORS.black};
  border-radius: 50%;
`;

const Step = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px dashed ${COLORS.gray[300]};
  background-color: ${COLORS.white};
  gap: 6px;
  min-width: 74px;
  min-height: 74px;

  &:hover {
    ${RemoveStepButton} {
      display: flex;
    }
  }
`;

const AddStepButton = styled(Button)`
  align-self: center;
`;