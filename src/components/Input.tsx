import Dpad from './Dpad';
import Attack from './Attack';
import FollowUp from './FollowUp';
import SuperDash from './SuperDash';
import DragonRush from './DragonRush';
import Modifier from './Modifier';
// import Loop from '../Loop';
// import MultiHit from '../MultiHit';

const Input = ({ input }: { input: string | number; }) => {
  function handleInputs() {
    if (
      input === 'L' ||
      input === 'M' ||
      input === 'H' ||
      input === 'S' ||
      input === 'A1' ||
      input === 'A2'
    ) {
      return <Attack button={input} />;
    } else if (input > 0) {
      return <Dpad direction={input as number} />;
    } else if (
      input === 'j.' ||
      input === 'sj.' ||
      input === 'jc.' ||
      input === 'sjc.' ||
      input === 'vanish' ||
      input === 'delay' ||
      input === 'land'
    ) {
      return <Modifier reverse={false}>{input}</Modifier>;
    }
    // TODO: Loop( 'xN' ) and MultiHit( '(N)' )
    else if (input === '~') {
      return <FollowUp />;
    } else if (input === 'SD') {
      return <SuperDash />;
    } else if (input === 'DR') {
      return <DragonRush />;
    }
  }

  return <>{handleInputs()}</>;
};

export default Input;
