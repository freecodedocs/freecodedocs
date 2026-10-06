"use client";

import { useEffect } from "react";

export default function ImpactScript() {
  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://utt.impactcdn.com/P-A7913317-53f4-4069-a810-768ff68dc7f71.js";

    const firstScript = document.getElementsByTagName("script")[0];

    firstScript?.parentNode?.insertBefore(script, firstScript);

    window.impactStat = window.impactStat || function (...args: string[]) {
      window.impactStat!.a = window.impactStat!.a || [];
      window.impactStat!.a.push(args);
    };

    window.impactStat("transformLinks");
    window.impactStat("trackImpression");

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
