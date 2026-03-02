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
  metadataBase: new URL("https://stmarksalina.org"),
  title: {
    default:
      "St. Mark Lutheran Church Salina KS | WELS Worship, Bible Study & Community",
    template: "%s | St. Mark Lutheran Church Salina KS",
  },
  description:
    "St. Mark Evangelical Lutheran Church in Salina, Kansas — a WELS congregation. Sunday worship at 9:00 AM, Bible study at 10:15 AM. Saved by the Cross. Standing on the Word. Serving to the glory of God.",
  keywords: [
    "St. Mark Lutheran Church",
    "Salina Kansas church",
    "WELS church Salina",
    "Lutheran church Salina KS",
    "Sunday worship Salina",
    "Bible study Salina Kansas",
    "Little Lions Preschool",
    "Wisconsin Evangelical Lutheran Synod",
    "Pastor Jim Winterstein",
    "church near me Salina",
  ],
  openGraph: {
    title: "St. Mark Lutheran Church — Salina, Kansas",
    description:
      "Saved by the Cross. Standing on the Word. Serving to the glory of God. Join us Sundays at 9:00 AM at 2349 S. Ohio St., Salina, KS.",
    url: "https://stmarksalina.org",
    siteName: "St. Mark Lutheran Church",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Mark Lutheran Church — Salina, KS",
    description:
      "A WELS congregation in Salina, Kansas. Worship Sundays at 9 AM. Come as you are.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: "https://stmarksalina.org",
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
    name: "St. Mark Evangelical Lutheran Church",
    alternateName: "St. Mark Lutheran Church Salina",
    url: "https://stmarksalina.org",
    telephone: "+1-785-825-7455",
    email: "stmarksalina@gmail.com",
    foundingDate: "1974",
    description:
      "St. Mark Evangelical Lutheran Church is a WELS congregation in Salina, Kansas. Saved by the Cross. Standing on the Word. Serving to the glory of God.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2349 S. Ohio St.",
      addressLocality: "Salina",
      addressRegion: "KS",
      postalCode: "67401",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.8088,
      longitude: -97.6114,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "11:30",
        description: "Sunday Worship at 9:00 AM, Bible Study & Sunday School at 10:15 AM",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "18:00",
        closes: "19:30",
        description: "Wednesday Bible classes (during school year)",
      },
    ],
    sameAs: [
      "https://www.facebook.com/stmarksalina/",
      "https://vimeo.com/user157825759",
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
