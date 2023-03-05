import Input from '@/components/Input';
import Modifier from '@/components/Modifier';
import useElementToPip from '@/hooks/use-element-to-pip';
import React, { useRef } from 'react';
import styled from 'styled-components';

const PictureInPicturePage = () => {
  const comboRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { capture, isCapturing } = useElementToPip(comboRef, canvasRef);

  return (
    <Wrapper>
      <FakeCombo>
        <FakeStep>
          <div ref={comboRef} style={{ display: 'flex', width: 'fit-content' }}>
            <Input input="L" />
            <Input input="L" />
            <Input input="M" />
            <Input input="M" />
            <Input input="H" />
            <Modifier>delay</Modifier>
            <Input input="A1" />
            <Input input="236" />
            <Input input="L" />
          </div>
        </FakeStep>
      </FakeCombo>
      <canvas ref={canvasRef} />
      <button onClick={capture} disabled={isCapturing}>
        {isCapturing ? "Capturing..." : "Capture and Open in PiP mode"}
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const FakeCombo = styled.div``;
const FakeStep = styled.div``;

export default PictureInPicturePage;