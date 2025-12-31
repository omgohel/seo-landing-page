import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scalepages.co";
const siteName = "ScalePages";
const description =
  "Attract long-tail traffic by generating thousands of SEO pages from a no-code, drag-and-drop template with AI-personalized content.";

// Sets the metadata for the page
export const metadata: Metadata = {
  title: `${siteName} – Programmatic SEO Tool to Capture Inbound Leads`,
  description,
  icons: {
    icon: "/assets/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} – Programmatic SEO Tool to Capture Inbound Leads`,
    description,
    siteName,
    images: [
      {
        url: `${siteUrl}/assets/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ScalePages - Programmatic SEO Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – Programmatic SEO Tool to Capture Inbound Leads`,
    description,
    images: [`${siteUrl}/assets/og-image.png`],
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KLXH4D2K');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLXH4D2K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
