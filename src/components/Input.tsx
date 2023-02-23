import Dpad from './Dpad';
import Attack from './Attack';
import FollowUp from './FollowUp';
import SuperDash from './SuperDash';
import DragonRush from './DragonRush';
import Modifier from './Modifier';
// import Loop from './Loop';
// import MultiHit from './MultiHit';

const directions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "236", "214"];

const Input = ({ input }: { input: string; }) => {
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
    } else if (directions.includes(input)) {
      return <Dpad direction={input} />;
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
