"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Third-party widget: injected ~3s after load so it never competes with the
// first paint on mobile.
const LOAD_DELAY_MS = 3000;

export default function JotFormWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="JFWebsiteWidget-01a123fed26870008fcced4e5659e38d8bce" />
      {ready && (
        <Script
          src="https://www.jotform.com/website-widgets/embed/01a123fed26870008fcced4e5659e38d8bce"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
