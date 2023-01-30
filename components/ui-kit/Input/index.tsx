import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { ChangeEventHandler, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TFormFieldProps } from '../../../common/types';
import useConnectForm from '../useConnectForm';
import { TInputType } from './types';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import { getMobileOperatingSystem } from '../../../common/helpers/getMobileOperatingSystem';

type Props = {
  value: string | number;
  hasSchema?: boolean;
  hasError?: boolean;
  type?: TInputType;
  label?: string;
  captionValue?: string;
  width?: number;
  readonly?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  fullSize?: boolean;
  onChange?: (value: string | number) => void;
  isError?: boolean;
};

const Input: React.FC<Props & TFormFieldProps> = ({
  hasError = false,
  hasSchema = false,
  type = 'text',
  min,
  max,
  fullSize = false,
  placeholder,
  readonly,
  width,
  value,
  captionValue,
  label,
  field,
  form,
  onChange,
}) => {
  const [isMobileOS, setIsMobileOS] = useState(false);
  const [curValue, setCurValue] = useState<string | number>(
    field?.value || value,
  );

  // const inputValue = value ?? curValue;

  useConnectForm(curValue, form, field, hasSchema, onChange);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurValue(event.target.value);
    form?.setFieldValue(field?.name!, 'Поле не требует заполнения');
  };

  const handleNumberChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurValue(event.target.value);
    form?.setFieldValue(field?.name!, event.target.value);
  };

  useEffect(() => {
    setIsMobileOS(getMobileOperatingSystem() !== 'unknown');
  }, []);

  return (
    <InputWrapper width={width} hasError={hasError}>
      <InputLabel>{label}</InputLabel>
      <InputCaptionValue>{captionValue}</InputCaptionValue>
      {
        <InputItem
          type={type}
          value={form?.values[field?.name!]}
          fullSize={fullSize}
          readOnly={readonly}
          placeholder={placeholder}
          onChange={handleChange}
          fullHeight={!label}
        />
      }
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ hasError: boolean; width?: number }>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  border: 2px solid #edf2fb;
  border-color: ${({ hasError }) => (hasError ? '#ef466f' : '#edf2fb')};
  border-radius: 8px;
  background: #edf2fb;
  padding: 3.5px 10px;
  height: 45px;

  &:focus {
    border-color: ${({ hasError }) =>
      hasError ? 'rgb(192,0,67)' : 'rgba(51, 51, 51, 0.5)'};
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 7%);
  }
`;

const InputItem = styled.input<{ fullSize: boolean; fullHeight: boolean }>`
  outline: none;
  background: none;
  border: none;
  box-sizing: border-box;
  padding: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #141922;
  width: ${({ fullSize }) => (fullSize ? '100%' : 'calc(100% - 50px)')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : '22px')};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const InputLabel = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
`;

const InputCaptionValue = styled.div`
  position: absolute;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #4a5d7e;
  right: 10px;
  bottom: 7.5px;
`;

const InputPhone = styled(InputMask)`
  outline: none;
  background: none;
  border: none;
  box-sizing: border-box;
  padding: 0;
  height: 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #141922;
`;

const InputNumber = styled(NumericFormat)`
  outline: none;
  background: none;
  border: none;
  box-sizing: border-box;
  padding: 0;
  height: 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #141922;
`;

export default memo(Input);
