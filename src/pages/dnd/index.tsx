import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';
import styled from 'styled-components';
import Card from '@/components/Card';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { SortableContext, arrayMove, rectSwappingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Sortable from '@/components/Sortable';
import { COLORS, INPUTS } from '@/constants';
import { ChevronRight, X } from 'react-feather';
import UnstyledButton from '@/components/UnstyledButton';
import { RemoveScroll } from 'react-remove-scroll';
import AddStepButton from '@/components/AddStepButton';
import SortableInput from './SortableInput';

type DroppableProps = {
  droppableId: UniqueIdentifier;
  draggableIds: DraggableProps[];
};

type DraggableProps = {
  draggableId: UniqueIdentifier;
  payload: string;
};

export default function DndPage() {
  const attacks: DraggableProps[] = [
    { draggableId: 'tool-0', payload: INPUTS.attacks[0]! },
    { draggableId: 'tool-1', payload: INPUTS.attacks[1]! },
    { draggableId: 'tool-2', payload: INPUTS.attacks[2]! },
    { draggableId: 'tool-3', payload: INPUTS.attacks[3]! },
  ];
  const assists: DraggableProps[] = [
    { draggableId: 'tool-4', payload: INPUTS.assists[0]! },
    { draggableId: 'tool-5', payload: INPUTS.assists[1]! },
  ];
  const directions: DraggableProps[] = [
    { draggableId: 'tool-8', payload: INPUTS.directions[2]! },
    { draggableId: 'tool-7', payload: INPUTS.directions[1]! },
    { draggableId: 'tool-6', payload: INPUTS.directions[0]! },
    { draggableId: 'tool-11', payload: INPUTS.directions[5]! },
    { draggableId: 'tool-10', payload: INPUTS.directions[4]! },
    { draggableId: 'tool-9', payload: INPUTS.directions[3]! },
    { draggableId: 'tool-14', payload: INPUTS.directions[8]! },
    { draggableId: 'tool-13', payload: INPUTS.directions[7]! },
    { draggableId: 'tool-12', payload: INPUTS.directions[6]! },
  ];
  const motions: DraggableProps[] = [
    { draggableId: 'tool-25', payload: INPUTS.directions[9]! },
    { draggableId: 'tool-26', payload: INPUTS.directions[10]! },
    { draggableId: 'tool-27', payload: INPUTS.directions[11]! },
    { draggableId: 'tool-28', payload: INPUTS.directions[12]! },
    { draggableId: 'tool-29', payload: INPUTS.directions[13]! },
    { draggableId: 'tool-30', payload: INPUTS.directions[14]! },

  ];
  const modifiers: DraggableProps[] = [
    { draggableId: 'tool-15', payload: INPUTS.modifiers[0]! },
    { draggableId: 'tool-16', payload: INPUTS.modifiers[1]! },
    { draggableId: 'tool-17', payload: INPUTS.modifiers[2]! },
    { draggableId: 'tool-18', payload: INPUTS.modifiers[3]! },
    { draggableId: 'tool-19', payload: INPUTS.modifiers[4]! },
    { draggableId: 'tool-20', payload: INPUTS.modifiers[5]! },
    { draggableId: 'tool-21', payload: INPUTS.modifiers[6]! },
  ];
  const misc: DraggableProps[] = [
    { draggableId: 'tool-22', payload: INPUTS.misc[0]! },
    { draggableId: 'tool-23', payload: INPUTS.misc[1]! },
    { draggableId: 'tool-24', payload: INPUTS.misc[2]! },
  ];
  const [droppables, setDroppables] = useState<DroppableProps[]>([
    {
      droppableId: uuid(), // unique id of droppable step
      draggableIds: [], // copies of the tools with new unique ids go here
    },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <SiteLayoutWrapper isFullLayout={false}>
      <RemoveScroll>
        <DndContext
          id="0-dnd"
          sensors={sensors}
          autoScroll={true}
          onDragEnd={handleDragEnd}
        >
          <Wrapper>
            <Tools>
              <AddStepButton onClick={addStep}>Add Step</AddStepButton>
              <ToolboxRow>
                <Toolbox>
                  <ToolsWrapper columns={2}>
                    {attacks.map(({ draggableId, payload }) => (
                      <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                        <Input input={payload} />
                      </Draggable>
                    ))}
                  </ToolsWrapper>
                </Toolbox>
                <Toolbox>
                  <ToolsWrapper columns={1}>
                    {assists.map(({ draggableId, payload }) => (
                      <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                        <Input input={payload} />
                      </Draggable>
                    ))}
                  </ToolsWrapper>
                </Toolbox>
              </ToolboxRow>
              <Toolbox>
                <ToolsWrapper columns={3}>
                  {directions.reverse().map(({ draggableId, payload }) => (
                    <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                      <Input input={payload} />
                    </Draggable>
                  ))}
                </ToolsWrapper>
              </Toolbox>
              <ToolboxRow>
                <Toolbox>
                  <ToolsWrapper columns={1}>
                    {motions.map(({ draggableId, payload }) => (
                      <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                        <Input input={payload} isEditMode={true} />
                      </Draggable>
                    ))}
                  </ToolsWrapper>
                </Toolbox>
                <Toolbox>
                  <ToolsWrapper columns={1}>
                    {modifiers.map(({ draggableId, payload }) => (
                      <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                        <Input input={payload} isEditMode={true} />
                      </Draggable>
                    ))}
                  </ToolsWrapper>
                </Toolbox>
                <Toolbox>
                  <ToolsWrapper columns={1}>
                    {misc.map(({ draggableId, payload }) => (
                      <Draggable key={draggableId} id={draggableId} payload={payload} type="TOOL">
                        <Input input={payload} />
                      </Draggable>
                    ))}
                  </ToolsWrapper>
                </Toolbox>
              </ToolboxRow>
            </Tools>
            <ComboBoard>
              <SortableContext items={droppables.map(d => d.droppableId)} strategy={rectSwappingStrategy}>
                <ComboString>
                  {droppables.map(({ droppableId, draggableIds }, index) => (
                    <Sortable key={droppableId} id={droppableId} handle={true} type="STEP">
                      <SortableContext items={draggableIds.map(d => d.draggableId)}>
                        <Droppable id={droppableId} accepts={["INPUT", "TOOL"]}>
                          <StepWrapper>
                            <Step>
                              {draggableIds.map(({ draggableId, payload }) => (
                                <SortableInput
                                  key={draggableId}
                                  droppableId={droppableId}
                                  draggableId={draggableId}
                                  payload={payload}
                                  removeInput={removeInput}
                                />
                              ))}
                              <Placeholder />
                              <RemoveStepButton onClick={() => removeStep(droppableId)}><X /></RemoveStepButton>
                            </Step>
                            {droppables.length - 1 > index && (<ChevronRight />)}
                          </StepWrapper>
                        </Droppable>
                      </SortableContext>
                    </Sortable>
                  ))}
                </ComboString>
              </SortableContext>
            </ComboBoard>
          </Wrapper>
        </DndContext>
      </RemoveScroll>
    </SiteLayoutWrapper>
  );

  function addStep() {
    setDroppables((droppables) => [
      ...droppables,
      {
        droppableId: uuid(),
        draggableIds: [],
      },
    ]);
  }

  function removeStep(id: UniqueIdentifier) {
    console.log(`removed: ${id}`);
    setDroppables((droppables) => {
      return droppables.filter(({ droppableId }) => droppableId !== id);
    });
  }

  function removeInput(droppableId: UniqueIdentifier, draggableId: UniqueIdentifier) {
    setDroppables((droppables) => {
      return droppables.map((droppable) => {
        if (droppable.droppableId === droppableId) {
          return {
            ...droppable,
            draggableIds: droppable.draggableIds.filter((draggable) => draggable.draggableId !== draggableId),
          };
        }
        return droppable;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over || !active) return;

    // Sorting combo steps
    if (active.data.current?.type === "STEP") {
      setDroppables((prevDroppables) => {
        const oldIndex = prevDroppables.findIndex(d => d.droppableId === active.id);
        const newIndex = prevDroppables.findIndex(d => d.droppableId === over.id);
        return arrayMove(prevDroppables, oldIndex, newIndex);
      });
    }

    // Sorting step inputs
    if (active.data.current?.type === "INPUT") {
      console.log("sorting inputs");
      setDroppables((prevDroppables) => {
        const newDroppables = prevDroppables.map((droppable) => {
          const hasMatchingId = droppable.draggableIds.some(({ draggableId }) => draggableId === active.id);
          if (hasMatchingId) {
            console.log("step found", droppable.draggableIds);
            const oldIndex = droppable.draggableIds.findIndex(d => d.draggableId === active.id);
            const newIndex = droppable.draggableIds.findIndex(d => d.draggableId === over.id);
            droppable.draggableIds = arrayMove(droppable.draggableIds, oldIndex, newIndex);
          }
          return droppable;
        });
        return newDroppables;
      });
    }

    // Dropping new button from toolbox on step
    if (active.data.current?.type === "TOOL") {
      setDroppables((prevDroppables) => {
        const newDroppables = prevDroppables.map((droppable) => {
          const hasMatchingId = droppable.draggableIds.some(({ draggableId }) => draggableId === active.id);
          if (hasMatchingId) {
            droppable = {
              ...droppable,
              draggableIds: droppable.draggableIds.filter(({ draggableId }) => draggableId !== active.id),
            };
          }
          if (droppable.droppableId === over.id && !hasMatchingId && active.id !== over.id) {
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
  height: 100vh;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 0;
  margin: 0 24px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Tools = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
`;

export const Toolbox = styled(Card)`
  padding: 0;
  height: fit-content;
  width: fit-content;
  padding: 6px;
`;

const ToolboxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const ToolsWrapper = styled.div<{
  columns: number,
}>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  gap: 12px;
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

const RemoveButton = styled(UnstyledButton)`
  --icon-size: ${18 / 16}rem;
  display: none;
  position: absolute;
  z-index: 999;
  top: -4px;
  right: -4px;
  padding: 2px;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  border-radius: 50%;

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
  }
`;

const RemoveStepButton = styled(RemoveButton)``;
const RemoveInputButton = styled(RemoveButton)``;

const Step = styled.div`
  --background-color: hsla(0, 0%, 0%, 0.25);
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 74px;
  min-height: 64px;
  align-items: center;
  width: fit-content;
  justify-content: center;
  background: var(--background-color);
  background: linear-gradient(
    90deg,
    var(--background-color) 0%,
    hsl(0, 0%, 100%) 90%
  );
  border-radius: 12px;
  padding: 4px 8px;

  img {
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  width: ${(INPUTS.size + 4) / 16}rem;
  height: ${(INPUTS.size + 4) / 16}rem;
  border: 2px dashed ${COLORS.gray[500]};
  pointer-events: none;
  border-radius: 50%;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  ${RemoveStepButton} {
    display: flex;
  }

  @media (min-width: 768px) {
    ${RemoveStepButton} {
      display: none;
    }
    &:hover {
      ${RemoveStepButton} {
        display: flex;
      }
    }
  }
`;

const InputWrapper = styled.div`
  ${RemoveInputButton} {
    display: flex;
  }

  @media (min-width: 768px) {
    ${RemoveInputButton} {
      display: none;
    }
    &:hover {
      ${RemoveInputButton} {
        display: flex;
      }
    }
  }
`;