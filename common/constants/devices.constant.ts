const sizes = {
  mobileS: '320px',
  mobile: '375px',
  laptopM: '1240px',
};

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS}) and (max-width: ${sizes.mobile})`,
  mobile: `(min-width: ${sizes.mobile}) and (max-width: ${sizes.laptopM})`,
};
