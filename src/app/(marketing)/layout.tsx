import { ReactNode } from 'react';
import { Footer } from '@/components/layouts/marketing/footer';
import { Header } from '@/components/layouts/marketing/header';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col font-poppins">{children}</main>
      <Footer />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <Script strategy="beforeInteractive">
        {`function initApollo() {
          var n = Math.random().toString(36).substring(7),
              o = document.createElement("script");
          o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
          o.async = true;
          o.defer = true;
          o.onload = function() {
            window.trackingFunctions.onLoad({ appId: "6633f3389019280438873515" });
          };
          document.head.appendChild(o);
        }
        initApollo();`}
      </Script>
    </div>
  );
}
