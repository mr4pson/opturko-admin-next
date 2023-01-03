// import { Layout } from 'antd';
// import { User } from 'swagger/services';

import styled from 'styled-components';
import { FlexContainer, Section } from '../../common';
import Header from './Header';

type Props = {
  // user: User | null;
  children: any;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <PageLayout>
        <FlexContainer style={{ maxWidth: '100%' }}>
          <Section>{children}</Section>
        </FlexContainer>
      </PageLayout>
    </>
  );
};

const PageLayout = styled.div`
  padding-top: 100px;
`;

export default AdminLayout;
