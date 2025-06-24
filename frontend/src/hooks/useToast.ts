import { useEffect, useState } from "react";
import { ToastProps } from "@/types";

export const useToast = () => {
  const [activeToasts, setActiveToasts] = useState(false);
  const [toast, setToast] = useState<ToastProps>({
    title: "",
    description: "",
    duration: 1500,
    position: "top-center",
    type: "success",
  });

  useEffect(() => {
    if (activeToasts && toast.duration) {
      const timer = setTimeout(() => {
        setActiveToasts(false);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [activeToasts, toast.duration]);

  const showToast = (toastProps: Partial<ToastProps>) => {
    setToast((prev) => ({
      ...prev,
      ...toastProps,
    }));
    setActiveToasts(true);
  };

  const hideToast = () => {
    setActiveToasts(false);
  };

  const showSuccessToast = (
    title: string,
    description?: string,
    duration?: number
  ) => {
    showToast({ title, description, type: "success", duration });
  };

  const showErrorToast = (
    title: string,
    description?: string,
    duration?: number
  ) => {
    showToast({ title, description, type: "error", duration });
  };

  return {
    activeToasts,
    toast,
    showToast,
    hideToast,
    showSuccessToast,
    showErrorToast,
  };
};
