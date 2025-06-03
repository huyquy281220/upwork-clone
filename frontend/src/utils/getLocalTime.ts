export const getLocalTime = (timezone: string) => {
  //   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const UTC = new Date().toLocaleString("en-US", { timeZone: timezone });
  return UTC;
};
