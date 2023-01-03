import { ForwardedRef, forwardRef, memo } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

type Props = {
  style?: Object;
  children?: React.ReactNode;
  disabled?: boolean;
  width?: number;
  loading?: boolean;
  htmlType?: 'button' | 'submit';
  onClick?: () => void;
};
const Button: React.FC<Props> = forwardRef(
  (
    { disabled, style, children, width, loading, htmlType, onClick },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <ButtonBody
        ref={ref}
        style={style}
        disabled={disabled}
        width={width}
        type={htmlType}
        onClick={disabled ? () => null : onClick}
      >
        {children}
        {loading && <Loading />}
      </ButtonBody>
    );
  },
);

const ButtonBody = styled.button<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: 45px;
  background: red;
  border-radius: 10px;
  padding: 5px 10px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background: #f34d4d;
  }

  &:hover {
    background: #e62323;
  }

  svg {
    transform: scale(0.2);
    margin-left: -50px;
  }
`;

Button.displayName = 'Button';

export default memo(Button);
