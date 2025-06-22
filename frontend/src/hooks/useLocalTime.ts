import { useState, useEffect, useCallback } from "react";

interface LocalTimeInfo {
  time: string;
  timeZone: string;
  location: string;
  formattedTime: string;
  date: string;
}

const useLocalTime = (): LocalTimeInfo => {
  const [timeInfo, setTimeInfo] = useState<LocalTimeInfo>({
    time: "",
    timeZone: "",
    location: "",
    formattedTime: "",
    date: "",
  });

  const getTimeInfo = useCallback(async (): Promise<LocalTimeInfo> => {
    try {
      const now = new Date();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const time = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const date = now.toLocaleDateString([], {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Lấy vị trí thực tế qua IP
      const res = await fetch("https://ipinfo.io/json");
      const data = await res.json();
      const location = `${data.city}, ${data.country}`;

      return {
        time,
        timeZone,
        location,
        formattedTime: `${time} local time`,
        date,
      };
    } catch (error) {
      console.error("Error getting local time:", error);
      return {
        time: "",
        timeZone: "",
        location: "Unknown Location",
        formattedTime: "",
        date: "",
      };
    }
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      const info = await getTimeInfo();
      setTimeInfo(info);
    };

    fetchTime();

    const timerId = setInterval(() => {
      fetchTime();
    }, 60000); // every minute

    return () => clearInterval(timerId);
  }, [getTimeInfo]);

  return timeInfo;
};

export default useLocalTime;
