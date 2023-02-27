import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Toolbox from './Toolbox';
import { COLORS } from '@/constants';
import ComboForm from './ComboForm';
import Droppable from './Droppable';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import Draggable from './Draggable';
import Input from './Input';
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SortableItem from './Sortable';
import ComboStep from './ComboStep';

export type DndProps = {
  children: React.ReactNode,
  id: UniqueIdentifier,
  handle?: boolean,
  type?: DndTypes,
  accepts?: DndTypes[],
  payload?: any,
};

export type DndTypes = 'TOOL' | 'INPUT' | 'STEP' | 'BOARD';

type SortableSteps = {
  steps: Steps;
};

export type Steps = Step[];
type Step = { id: UniqueIdentifier, inputs: string[]; };


function ComboBuilder() {
  const [items, setItems] = React.useState<UniqueIdentifier[]>([1, 2]);
  const [isDropped, setIsDropped] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      if (over) {
        setItems((items) => {
          const oldIndex = items.indexOf(active?.id);
          const newIndex = items.indexOf(over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }

    if (over && active?.data.current?.supports.includes(over?.data.current?.type)) {
      console.log('YOOOO');
      if (over.id === `${over.id}-step`) {
        console.log('YOOOO');
        setIsDropped(true);
        return;
      }
    }
  }

  return (
    <DndContext
      id="0"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Wrapper>
        {/* <StyledToolbox /> */}
        <TestWrapper>
          <Draggable id="toolbox-attack-light" types={["COMBO_STEP"]}><Input input="L" /></Draggable>
        </TestWrapper>
        <Combo>
          <Droppable id="combo-builder-combo-board" type="COMBO_FORM">
            <SortableContext items={items} strategy={horizontalListSortingStrategy}>
              {items.map((item, index) => (
                <ComboStepBox key={index}>
                  <SortableItem id={item} types={["COMBO_FORM"]}>
                    <Droppable id={item} type="COMBO_STEP">
                      <Draggable id={`${item}-toolbox-attack-light`} types={["COMBO_STEP"]}><Input input="L" /></Draggable>
                    </Droppable>
                  </SortableItem>
                </ComboStepBox>
              ))}
            </SortableContext>
          </Droppable>
        </Combo>
        {/* <ComboForm steps={items} /> */}
      </Wrapper>
    </DndContext>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto 2fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "toolbox combo combo"
    "forms forms forms";
`;

const Combo = styled(Card)`
  grid-area: combo;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StyledToolbox = styled(Toolbox)`
  grid-area: toolbox;
`;

const TestWrapper = styled.div`
  grid-area: toolbox;
`;

const ComboStepBox = styled.div`
  display: flex;
  width: 96px;
  height: 48px;
  background-color: ${COLORS.gray[100]};
  border: 2px dashed black;
  border-radius: 4px;
`;

export default ComboBuilder;