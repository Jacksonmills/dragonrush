import Dpad from './Dpad';
import Attack from './Attack';
import FollowUp from './FollowUp';
import SuperDash from './SuperDash';
import DragonRush from './DragonRush';
import Modifier from './Modifier';
import { INPUTS } from '@/constants';
// import Loop from './Loop';
// import MultiHit from './MultiHit';

const Input = ({ input }: { input: string; }) => {
  return (
    <>
      {INPUTS.attacks.includes(input) && (<Attack button={input} />)}
      {INPUTS.assists.includes(input) && (<Attack button={input} />)}
      {INPUTS.directions.includes(input) && (<Dpad direction={input} />)}
      {INPUTS.modifiers.includes(input) && (<Modifier reverse={false}>{input}</Modifier>)}
      {input === '~' && (<FollowUp />)}
      {input === 'SD' && (<SuperDash />)}
      {input === 'DR' && (<DragonRush />)}
    </>
  );
};

export default Input;
