import styled from 'styled-components';
import LoadingSVG from '../../../assets/svg/loading.svg';

const Loading = () => {
  return (
    <LoaderWrapper>
      <LoadingSVG />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: scale(0.4);
  }
`;

export default Loading;
