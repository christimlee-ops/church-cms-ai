import type { Metadata } from "next";
import { Raleway, Epilogue } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calvarychandler.net"),
  title: {
    default:
      "Calvary Lutheran Church Chandler AZ | WELS Worship, Bible Study & Community",
    template: "%s | Calvary Lutheran Church Chandler AZ",
  },
  description:
    "Calvary Lutheran Church in Chandler, Arizona — a WELS congregation. Saturday worship at 6:00 PM, Sunday worship at 9:00 AM, Bible study at 10:30 AM. Grow in the grace and knowledge of our Lord and Savior Jesus Christ.",
  keywords: [
    "Calvary Lutheran Church",
    "Chandler Arizona church",
    "WELS church Chandler",
    "Lutheran church Chandler AZ",
    "Sunday worship Chandler",
    "Saturday worship Chandler",
    "Bible study Chandler Arizona",
    "Mornings with Mommy",
    "Wisconsin Evangelical Lutheran Synod",
    "Pastor Martin Spaude",
    "church near me Chandler",
  ],
  openGraph: {
    title: "Calvary Lutheran Church — Chandler, Arizona",
    description:
      "Grow in the grace and knowledge of our Lord and Savior Jesus Christ. Join us Saturdays at 6:00 PM or Sundays at 9:00 AM at 1270 N Dobson Rd, Chandler, AZ.",
    url: "https://calvarychandler.net",
    siteName: "Calvary Lutheran Church",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calvary Lutheran Church — Chandler, AZ",
    description:
      "A WELS congregation in Chandler, Arizona. Worship Saturdays at 6 PM and Sundays at 9 AM. Come as you are.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: "https://calvarychandler.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Calvary Lutheran Church",
    alternateName: "Calvary Lutheran Church Chandler",
    url: "https://calvarychandler.net",
    telephone: "+1-480-963-9397",
    email: "pastor@calvarychandler.net",
    foundingDate: "1977",
    description:
      "Calvary Lutheran Church is a WELS congregation in Chandler, Arizona. Grow in the grace and knowledge of our Lord and Savior Jesus Christ.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1270 N Dobson Rd",
      addressLocality: "Chandler",
      addressRegion: "AZ",
      postalCode: "85224",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.3425,
      longitude: -111.8781,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "18:00",
        closes: "19:00",
        description: "Saturday Worship at 6:00 PM",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "12:30",
        description: "Sunday Worship at 9:00 AM, Bible Study & Sunday School at 10:30 AM, Confirmation at 11:30 AM",
      },
    ],
    sameAs: [
      "https://www.facebook.com/CalvaryLutheranChurchChandler/",
      "https://www.instagram.com/clcchandler/",
      "https://www.youtube.com/@clc.chandler",
    ],
    member: {
      "@type": "Organization",
      name: "Wisconsin Evangelical Lutheran Synod (WELS)",
      url: "https://wels.net",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${raleway.variable} ${epilogue.variable} font-body antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
