const getHref = (chunk: string, isLastElement: boolean) => {
  const exceptions = ['admin', 'create', '[id]'];

  return !exceptions.includes(chunk) && !isLastElement
    ? `/${chunk}`
    : undefined;
};

export { getHref };
