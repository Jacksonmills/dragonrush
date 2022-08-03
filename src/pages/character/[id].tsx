import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ComboList from '@/components/ComboList';
import { trpc } from '@/utils/trpc';
import { TAGS } from '@/constants';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';

const CharacterPage = () => {
  const { query } = useRouter();
  const tag = query.id;

  if (!tag || typeof tag !== 'string' || !TAGS.includes(tag)) return (
    <>
      <h1>Invalid character tag.</h1>
      <h2>Available tags:</h2>
      <ul>
        {TAGS.map((tag, idx) => (<li key={idx}>{tag}</li>))}
      </ul>
    </>
  );

  const { data: character, isLoading } = trpc.useQuery(["character.getByTag", { tag }]);

  if (!character || isLoading) return <div>Loading...</div>;

  console.log(character);

  return (
    <SiteLayoutWrapper>
      <ImageWrapper>
        <Image src={character.renderUrl} layout='fill' priority alt="" />
      </ImageWrapper>
      <MaxWidthWrapper>
        {character.combos.length > 0 && (<Heading>{character.name} Combos</Heading>)}
        <ComboList combos={character.combos} />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

const Heading = styled.h1`
  position: relative;
  font-size: ${44 / 16}rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 84px;
  height: 100%;
  border-right: 4px solid black;

  img {
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: .6;
  }
`;

export default CharacterPage;
