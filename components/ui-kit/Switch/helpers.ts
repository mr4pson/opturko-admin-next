import { Dispatch, SetStateAction } from "react";
import { THandler } from "./types";

const handleClick = (setActive: Dispatch<SetStateAction<boolean>>, onChange: THandler) => () => {
  setActive((prev) => {
    if (onChange) {
      onChange(!prev);
    }
    return !prev;
  });
};

export { handleClick };