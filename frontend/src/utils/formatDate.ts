export function formatToISODate(time: string): string {
  console.log(time);
  const [hourStr, minuteStr] = time.split(":");
  const hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // JS month is 0-based
  const day = String(now.getDate()).padStart(2, "0");

  // Build ISO string with fixed +07:00 timezone
  const localTimeString = `${year}-${month}-${day}T${paddedHours}:${paddedMinutes}:00+07:00`;
  console.log(localTimeString);
  console.log(new Date(localTimeString).toISOString());

  // Convert to ISO 8601 (UTC time with Z)
  return new Date(localTimeString).toISOString();
}

export function formatFromISOToLocalTime(isoString: string): string {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatted;
}

export function formatTimeRange(startStr: string, endStr: string) {
  function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours < 12 ? "SA" : "CH";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }

  const startDate = new Date(startStr);
  const endDate = new Date(endStr);

  const datePart = startDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  return `${formatTime(startDate)} - ${formatTime(endDate)} | ${datePart}`;
}

export function formatDateFromISO(isoString: string) {
  const date = new Date(isoString);
  const pad = (num: number) => String(num).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

export const formatTimeFromISO = (startISO: string, endISO: string) => {
  const pad = (num: number) => String(num).padStart(2, "0");

  const start = new Date(startISO);
  const end = new Date(endISO);

  const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const endTime = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  return `${startTime}-${endTime}`;
};
