import React from 'react';
import Card from './Card';
import Input from './Input';
import styled from 'styled-components';
import Dpad from './Dpad';
import DragonRush from './DragonRush';
import SuperDash from './SuperDash';
import FollowUp from './FollowUp';
import Draggable from './Draggable';

const Toolbox = () => {
  return (
    <Wrapper as="div">
      <ToolboxRow>
        <Draggable id="toolbox-attack-light"><Input input="L" /></Draggable>
        <Draggable id="toolbox-attack-medium"><Input input="M" /></Draggable>
        <Draggable id="toolbox-attack-heavy"><Input input="H" /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-attack-special"><Input input='S' /></Draggable>
        <Draggable id="toolbox-attack-assist-1"><Input input='A1' /></Draggable>
        <Draggable id="toolbox-attack-assist-2"><Input input='A2' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-dpad-7"><Dpad direction='7' /></Draggable>
        <Draggable id="toolbox-dpad-8"><Dpad direction='8' /></Draggable>
        <Draggable id="toolbox-dpad-9"><Dpad direction='9' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-dpad-4"><Dpad direction='4' /></Draggable>
        <Draggable id="toolbox-dpad-5"><Dpad direction='5' /></Draggable>
        <Draggable id="toolbox-dpad-6"><Dpad direction='6' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-dpad-1"><Dpad direction='1' /></Draggable>
        <Draggable id="toolbox-dpad-2"><Dpad direction='2' /></Draggable>
        <Draggable id="toolbox-dpad-3"><Dpad direction='3' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-dpad-214"><Dpad direction='214' /></Draggable>
        <Draggable id="toolbox-dpad-421"><Dpad direction='421' /></Draggable>
        <Draggable id="toolbox-dpad-41236"><Dpad direction='41236' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-dpad-236"><Dpad direction='236' /></Draggable>
        <Draggable id="toolbox-dpad-623"><Dpad direction='623' /></Draggable>
        <Draggable id="toolbox-dpad-63214"><Dpad direction='63214' /></Draggable>
      </ToolboxRow>
      <ToolboxRow>
        <Draggable id="toolbox-followup"><FollowUp /></Draggable>
        <Draggable id="toolbox-superdash"><SuperDash /></Draggable>
        <Draggable id="toolbox-dragonrush"><DragonRush /></Draggable>
      </ToolboxRow>
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  padding: 12px;
  flex-direction: column;
`;
const ToolboxRow = styled.div`
  display: inline-flex;
`;

export default Toolbox;