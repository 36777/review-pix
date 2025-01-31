import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Analytics from 'analytics'
import googleTagManager from '@analytics/google-tag-manager'
import Head from 'next/head';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'
import { HeaderSaldoProvider } from './_context/useHeaderSaldo';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reviewpix",
  description: "VSL - REVIEWPIX",
};


const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    googleTagManager({
      containerId: 'G-WSCTNZ2Y1Q'
    })
  ]
})

analytics.page()

const GoogleTagManager = () => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W9S9RVJ4');
          `,
        }}
      />
      {/* End Google Tag Manager */}
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeaderSaldoProvider>
      <html lang="en">
        <GoogleAnalytics gaId="G-WSCTNZ2Y1Q" />
        <GoogleTagManager />
        <Head>
          <script type="text/javascript" id="scr_679be2598fcda660f3bacc00"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/bf49b45e-b78d-47d5-8043-902101442a42/players/679be2598fcda660f3bacc00/player.js", s.async=!0,document.head.appendChild(s); </script>
          {/* Google Tag Manager */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W9S9RVJ4');
            `,
            }}
          />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=G-WSCTNZ2Y1Q"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {children}
        </body>
      </html>
    </HeaderSaldoProvider>

  );
}
