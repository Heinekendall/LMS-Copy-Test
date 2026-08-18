import { act, renderHook } from "@testing-library/react-hooks";

import { useIntl, useKeyListener } from "./hooks.ts";

function dispatchKeyDown(code: KeyboardEvent["code"]) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { code }));
  });
}

function mockTimeZone(timeZone: string) {
  vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
    timeZone,
  } as Intl.ResolvedDateTimeFormatOptions);
}

describe("useKeyListener", () => {
  it("calls the callback only when the configured key is pressed", () => {
    const callback = vi.fn();

    renderHook(() => useKeyListener("Escape", callback));

    dispatchKeyDown("Enter");
    dispatchKeyDown("Escape");

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("updates the listener when the key code and callback change", () => {
    const initialCallback = vi.fn();
    const nextCallback = vi.fn();
    const { rerender } = renderHook(
      ({ callback, code }) => useKeyListener(code, callback),
      {
        initialProps: {
          callback: initialCallback,
          code: "Escape",
        },
      },
    );

    dispatchKeyDown("Escape");

    rerender({
      callback: nextCallback,
      code: "Enter",
    });

    dispatchKeyDown("Escape");
    dispatchKeyDown("Enter");

    expect(initialCallback).toHaveBeenCalledTimes(1);
    expect(nextCallback).toHaveBeenCalledTimes(1);
  });

  it("removes the listener on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useKeyListener("Escape", callback));

    unmount();
    dispatchKeyDown("Escape");

    expect(callback).not.toHaveBeenCalled();
  });
});

describe("useIntl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses en-GB for European timezones", () => {
    mockTimeZone("Europe/Kiev");

    const { result } = renderHook(() => useIntl());

    expect(result.current).toEqual({
      locale: "en-GB",
      timezone: "Europe/Kiev",
    });
  });

  it("uses en-US for non-European timezones", () => {
    mockTimeZone("America/New_York");

    const { result } = renderHook(() => useIntl());

    expect(result.current).toEqual({
      locale: "en-US",
      timezone: "America/New_York",
    });
  });

  it("memoizes the resolved intl values across rerenders", () => {
    const resolvedOptionsSpy = vi
      .spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions")
      .mockReturnValueOnce({
        timeZone: "Europe/Kiev",
      } as Intl.ResolvedDateTimeFormatOptions)
      .mockReturnValueOnce({
        timeZone: "America/New_York",
      } as Intl.ResolvedDateTimeFormatOptions);

    const { rerender, result } = renderHook(() => useIntl());

    rerender();

    expect(result.current).toEqual({
      locale: "en-GB",
      timezone: "Europe/Kiev",
    });
    expect(resolvedOptionsSpy).toHaveBeenCalledTimes(1);
  });
});
