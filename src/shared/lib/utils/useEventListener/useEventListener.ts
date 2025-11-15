import { useEffect } from "react";

export const useEventListener = (
  eventName: string,
  callback: (event: Event) => void,
  options?: AddEventListenerOptions
) => {
  useEffect(() => {
    window.addEventListener(eventName, callback, options);
    return () => window.removeEventListener(eventName, callback, options);
  }, [eventName, callback, options]);
};
