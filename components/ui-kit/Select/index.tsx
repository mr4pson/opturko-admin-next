import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChevronDownSVG from '../../../assets/svg/chevron-down.svg';
import { TFormFieldProps } from '../../../common/types';
import useConnectForm from '../useConnectForm';
import { handleDropdownExpand } from './helpers';
import { SelectItem } from './types';

type Props = {
  hasError?: boolean;
  hasSchema?: boolean;
  items?: SelectItem[];
  placeholder?: string;
  value?: SelectItem;
  style?: any;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  onChange?: (value: any) => void;
};

const Select: React.FC<Props & TFormFieldProps> = ({
  placeholder = 'Выберите из списка',
  hasError = false,
  hasSchema = false,
  field,
  form,
  value,
  style,
  items,
  onChange,
}) => {
  const selectedItem = items?.find((item) => {
    const curValue = field?.value ?? value;
    return item.value === curValue || item.value === curValue?.value;
  });

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<SelectItem | undefined>(
    selectedItem,
  );

  useConnectForm(selected?.value, form, field, hasSchema, onChange);

  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  const handleDropdownItemClick =
    (
      item: SelectItem,
      setSelected: Dispatch<SelectItem | undefined>,
      setExpanded: Dispatch<boolean>,
    ) =>
    () => {
      setSelected(item);
      setExpanded(false);
    };

  return (
    <SelectBody>
      <SelectHeader
        style={style}
        onClick={handleDropdownExpand(setExpanded)}
        hasError={hasError}
        expanded={expanded}
      >
        <SelectHeaderContent>
          <SelectValue>{selected ? selected?.label : placeholder}</SelectValue>
        </SelectHeaderContent>
        <ChevronWrapper rotated={expanded}>
          <ChevronDownSVG />
        </ChevronWrapper>
      </SelectHeader>
      <SelectDropdown expanded={expanded} style={style}>
        {items?.map((item, index) => (
          <SelectDropdownItem
            key={`drop-down-${index}`}
            isSelected={item.value === selected?.value}
            onClick={handleDropdownItemClick(item, setSelected, setExpanded)}
          >
            <SelectDropdownItemLabel>{item.label}</SelectDropdownItemLabel>
          </SelectDropdownItem>
        ))}
      </SelectDropdown>
    </SelectBody>
  );
};

const SelectBody = styled.div`
  position: relative;
`;

const SelectHeader = styled.div<{ hasError: boolean; expanded: boolean }>`
  position: relative;
  cursor: pointer;
  background: #edf2fb;
  height: 45px;
  padding: 5px 10px;
  transition: none;
  border: 2px solid #edf2fb;
  border-radius: ${({ expanded }) => (expanded ? '10px 10px 0 0' : '10px')};
  border-color: ${({ hasError }) => (hasError ? '#ef466f' : '#edf2fb')};
  display: flex;
  align-items: center;
`;

const SelectHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectValue = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #141922;
`;

const ChevronWrapper = styled.div<{ rotated: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  right: 4px;
  width: 32px;
  height: 32px;
  border: none;
  transform: ${(props) => (props.rotated ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const SelectDropdown = styled.div<{ expanded: boolean }>`
  display: ${(props) => (props.expanded ? 'flex' : 'none')};
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 8px 4px;
  background: #edf2fb;
  border-top: 1px solid #4a5d7e;
  border-radius: 0 0 12px 12px;
`;

const SelectDropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 5px 6px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${(props) => (props.isSelected ? '#d6e5ff' : 'none')};
  cursor: pointer;

  &:hover {
    background: #d6e5ff;
  }
`;

const SelectDropdownItemLabel = styled.div`
  color: #23262f;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

export default Select;
