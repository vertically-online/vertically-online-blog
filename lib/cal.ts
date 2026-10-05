// Shared Cal.com settings, taken verbatim from Cal's generated embed code.
// Used by CalProvider (init), BookCallButton (popup trigger), and
// InlineCalBooking (the inline calendar in the live demo section).

export const CAL_NAMESPACE = "free-systems-audit";
export const CAL_ORIGIN = "https://app.cal.com";
export const CAL_LINK = "vertically/free-systems-audit";

// Passed to Cal's `ui` action on init.
export const CAL_UI_CONFIG = {
  hideEventTypeDetails: false,
  layout: "month_view",
} as const;

// Passed to each embed/trigger's own config (data-cal-config, <Cal config=...>).
export const CAL_EMBED_CONFIG = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
} as const;
