import styled from 'styled-components';
import { useRouter } from 'next/router';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { trpc } from '@/utils/trpc';
import ComboCard from '@/components/ComboCard';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';

const ComboPage = () => {
  const { query } = useRouter();
  const id = query.id;

  if (!id || typeof id !== 'string') return <div>No combo found!</div>;

  const { data: combo, isLoading } = trpc.useQuery(["combo.getById", { id }]);

  if (!combo || isLoading) return <div>Loading...</div>;

  // console.log(combo);

  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <ComboCard
          key={`${combo.id}`}
          {...combo}
        />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

export default ComboPage;
