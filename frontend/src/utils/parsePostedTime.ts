export const parsePostedTime = (timeStr: string) => {
  const now = new Date();
  if (timeStr.toLowerCase() === "yesterday") {
    return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  }

  const match = timeStr.match(/(\d+)\s+(minute|hour|day|week|month)s?\s+ago/);

  if (!match) return now;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "minute":
      return new Date(now.getTime() - value * 60 * 1000);
    case "hour":
      return new Date(now.getTime() - value * 60 * 60 * 1000);
    case "day":
      return new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
    case "week":
      return new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
    case "month":
      return new Date(now.getTime() - value * 30 * 24 * 60 * 60 * 1000);
    default:
      return now;
  }
};
