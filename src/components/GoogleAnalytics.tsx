import { prisma } from "@/lib/prisma";
import Script from "next/script";

export default async function GoogleAnalytics() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
    select: { gaTrackingId: true },
  });

  const trackingId = settings?.gaTrackingId;
  if (!trackingId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
}
