import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { memo, useState } from 'react';
import styled from 'styled-components';
import { TFormFieldProps } from '../../../common/types';
import useConnectForm from '../useConnectForm';
import { handleClick } from './helpers';
import { SwitchThemes, THandler } from './types';

type Props = {
  theme?: SwitchThemes;
  value?: boolean;
  hasSchema?: boolean;
  hasError?: boolean;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  onChange?: THandler;
};
const Switch: React.FC<Props & TFormFieldProps> = ({
  hasError = false,
  hasSchema = false,
  theme = 'green',
  value,
  field,
  form,
  onChange,
}) => {
  const [active, setActive] = useState(!!field?.value);
  useConnectForm(active, form, field, hasSchema, onChange);

  return (
    <SwitchWrapper
      theme={theme}
      onClick={handleClick(setActive, onChange)}
      active={active}
    >
      <SwitchRound />
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled.div<{ active: boolean; theme: SwitchThemes }>`
  display: flex;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  width: 40px;
  height: 20px;
  border-radius: 32px;
  background: ${(props) => {
    if (props.active && props.theme === 'green') {
      return '#45B36B';
    }
    if (props.active && props.theme === 'blue') {
      return '#3772FF';
    }

    return '#e6e8ec';
  }};
  cursor: pointer;

  & > div {
    transition: all 0.3s;
    transform: ${(props) =>
      props.active ? 'translate(20px)' : 'translate(0px)'};
    background: ${(props) => {
      if (!props.active && props.theme === 'green') {
        return '#141416';
      }
      if (!props.active && props.theme === 'blue') {
        return '#3772FF';
      }

      return '#FCFCFD';
    }};
  }
`;

const SwitchRound = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 32px;
  position: absolute;
`;

export default memo(Switch);
