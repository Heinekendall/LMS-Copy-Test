import * as React from "react";

export function useKeyListener(
  code: KeyboardEvent["code"],
  callback: () => void,
) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === code) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [code, callback]);
}

export function useIntl() {
  return React.useMemo(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // locales only include short TZ names like EST/EET for their region
    const locale = timezone.startsWith("Europe") ? "en-GB" : "en-US";

    return { timezone, locale };
  }, []);
}
