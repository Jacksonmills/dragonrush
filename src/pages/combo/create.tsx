
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CreateComboInputType, createComboValidator } from '@/shared/create-combo-validator';
import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';
import { Character, Game } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { NotationData } from '@/types';
import StylizedHeading from '@/components/StylizedHeading';
import ComboBuilder from '@/components/ComboBuilder';

const newStepData = [
  '214',
  'S'
];

const stepsData = {
  "steps": [
    ["2", "M"],
    ["5", "M"],
    ["5", "S"],
    ["SD", "66"],
    ["j", "M"],
    ["j", "2", "H"],
    ["land", "66"],
    ["5", "M"],
    ["jc", "j", "M"],
    ["j", "L", "j", "L"],
    ["j", "S"],
    ["236", "S"],
    ["SD", "j", "S"],
    ["214", "M", "~", "M"],
    ["236", "L", "M"]
  ]
};

const notationData: NotationData = {
  "steps": []
};

// stepsData.push(newStepData);
// notationData.steps = stepsData;
// notationData.steps.push(newStepData);
// console.log(notationData);

// const Step = () => {
//   return;
// };

const ComboCreator: React.FC = () => {
  return (
    <SiteLayoutWrapper>
      <Wrapper>
        <StylizedHeading fontSize={84}>Create Combo</StylizedHeading>
        {/* <CreateComboForm /> */}
        <ComboBuilder />
      </Wrapper>
    </SiteLayoutWrapper>
  );
};

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
  flex-direction: column;
  gap: 44px;
  max-width: none;
`;

export default ComboCreator;