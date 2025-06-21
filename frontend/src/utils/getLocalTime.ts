export const getLocalTime = (timezone: string) => {
  //   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const UTC = new Date().toLocaleString("en-US", { timeZone: timezone });
  return UTC;
};

export const formatDraftSaved = (timestamp: string) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `Draft - Saved ${formattedDate}`;
};
