import styled from 'styled-components';
import { useRouter } from 'next/router';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Footer from '@/components/Footer';
import { trpc } from '@/utils/trpc';
import ComboCard from '@/components/ComboCard';

const ComboPage = () => {
  const { query } = useRouter();
  const id = query.id;

  if (!id || typeof id !== 'string') return <div>No combo found!</div>;

  const { data: combo, isLoading } = trpc.useQuery(["combo.getById", { id }]);

  if (!combo || isLoading) return <div>Loading...</div>;

  console.log(combo);

  return (
    <>
      <Header />
      <Layout>
        <MaxWidthWrapper>
          <ComboCard
            key={`${combo.id}`}
            {...combo}
          />
        </MaxWidthWrapper>
      </Layout>
      <Footer />
    </>
  );
};

export default ComboPage;
