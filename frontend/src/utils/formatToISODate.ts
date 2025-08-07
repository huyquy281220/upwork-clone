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
