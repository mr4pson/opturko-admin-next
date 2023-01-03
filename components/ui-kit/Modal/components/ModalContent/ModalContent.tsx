import styled from 'styled-components';

type Props = {
  children?: JSX.Element;
};

const ModalContent = ({ children }: Props) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default ModalContent;

const ContentWrapper = styled.div`
  color: #23262f;
  font-size: 16px;
  line-height: 24px;
`;
