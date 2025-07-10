"use client";

import { updateUserById } from "@/services/userService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type LocationTime = {
  city: string;
  country: string;
  timezone: string;
  localTime: string;
};

export const useUserLocationTime = (timezone?: string) => {
  const { data: session } = useSession();
  const [data, setData] = useState<LocationTime | null>(null);

  const getTime = (tz: string) =>
    new Intl.DateTimeFormat([], {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchLocation = async () => {
      try {
        if (!timezone) {
          const res = await fetch(
            `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_INFO_API_KEY}`
          );
          const json = await res.json();
          const { city, country, timezone } = json;

          setData({
            city,
            country,
            timezone,
            localTime: getTime(timezone),
          });

          interval = setInterval(() => {
            setData((prev) =>
              prev
                ? {
                    ...prev,
                    localTime: getTime(timezone),
                  }
                : prev
            );
          }, 60000);
        } else {
          interval = setInterval(() => {
            setData((prev) =>
              prev
                ? {
                    ...prev,
                    localTime: getTime(timezone),
                  }
                : prev
            );
          }, 60000);
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };

    fetchLocation();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!session?.user.id || !data?.timezone) return;

    updateUserById(session.user.id, { timezone: data.timezone });
  }, [data?.timezone, session]);

  return data;
};
