import { Dispatch, SetStateAction } from 'react';

const handleDropdownExpand =
  (setExpanded: Dispatch<SetStateAction<boolean>>) => () => {
    setExpanded((prev) => !prev);
  };

export { handleDropdownExpand };
