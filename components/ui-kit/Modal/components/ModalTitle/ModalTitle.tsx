import styled from 'styled-components';
import CloseSvg from '../../../../../assets/svg/close-icon.svg';

type Props = {
  title: string;
  onClose: () => void;
};

const ModalTitle = ({ title, onClose }: Props) => {
  return (
    <TitleWrapper>
      <Title>{title}</Title>
      <RoundButton onClick={onClose}>
        <CloseSvg />
      </RoundButton>
    </TitleWrapper>
  );
};

export default ModalTitle;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Title = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #23262f;
  line-height: 40px;
`;

const RoundButton = styled.button`
  background: none;
  border: none;
`;
