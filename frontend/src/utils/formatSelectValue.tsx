export const formatSelectValue = (value: string) => {
  if (/^\d+-\d+-/.test(value)) {
    const firstDash = value.indexOf("-", value.indexOf("-") + 1);
    return (
      value.slice(0, firstDash) +
      " " +
      value.slice(firstDash + 1).replace(/-/g, " ")
    );
  }
  return value.replace(/-/g, " ");
};
