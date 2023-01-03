import styled from 'styled-components';

type Props = {
  children?: JSX.Element;
};

const ModalFooter = ({ children }: Props) => {
  return <FooterWrapper>{children}</FooterWrapper>;
};

export default ModalFooter;

const FooterWrapper = styled.div`
  color: #23262f;
  font-size: 16px;
  line-height: 16px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
