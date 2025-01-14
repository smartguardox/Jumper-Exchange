import initTranslations from '@/app/i18n';
import { PixelBg } from '@/components/illustrations/PixelBg';
import { fonts } from '@/fonts/fonts';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import TranslationsProvider from '@/providers/TranslationProvider';
import { WalletProvider } from '@/providers/WalletProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import i18nConfig from 'i18nconfig';
import Script from 'next/script';
import type { Viewport } from 'next/types';
import type { ReactNode } from 'react';
import { defaultNS, fallbackLng, namespaces } from 'src/i18n';
import { description, siteName, title } from '../lib/metadata';
import type { Metadata } from 'next';

interface RootLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

export function generateMetadata({ params }: RootLayoutProps): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lng === 'en' ? '' : params.lng}`,
    },
    openGraph: {
      title: title,
      description,
      siteName,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lng === 'en' ? '' : params.lng}`,
      images: [
        {
          url: 'https://jumper.exchange/preview.png', // Default image
          width: 900,
          height: 450,
        },
      ],
      type: 'website', // Override type
    },
    twitter: {
      // Twitter metadata
      // cardType: 'summary_large_image',
      site: '@JumperExchange',
      title: title, // Twitter title
      description,
      images: 'https://jumper.exchange/preview.png', // Twitter image
    },
    icons: {
      // Icons metadata
      icon: [
        {
          url: '/favicon_DT.svg',
          sizes: 'any',
          media: '(prefers-color-scheme: dark)',
        },
        { url: '/favicon_DT.png', media: '(prefers-color-scheme: dark)' },
        { url: '/favicon_DT.ico', media: '(prefers-color-scheme: dark)' },
        {
          url: '/favicon.svg',
          sizes: 'any',
          media: '(prefers-color-scheme: light)',
        },
        { url: '/favicon.png', media: '(prefers-color-scheme: light)' },
        { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      ],
      shortcut: [
        {
          url: '/apple-touch-icon-57x57.png',
          sizes: '57x57',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/apple-touch-icon-180x180.png',
          sizes: '180x180',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/apple-touch-icon-57x57_DT.png',
          sizes: '57x57',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/apple-touch-icon-180x180_DT.png',
          sizes: '180x180',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: ReactNode;
  params: { lng: string };
}) {
  const { resources } = await initTranslations(lng || fallbackLng, namespaces);

  return (
    <html
      lang={lng || fallbackLng}
      suppressHydrationWarning
      className={fonts.map((f) => f.variable).join(' ')}
      style={{ scrollBehavior: 'smooth' }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}');
          `}
        </Script>
        <Script id="addressable-tracker">
          {`
            !function(w, d){
              w.__adrsbl = {
                  queue: [],
                  run: function(){
                      this.queue.push(arguments);
                  }
              };
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://tag.adrsbl.io/p.js?tid=${process.env.NEXT_PUBLIC_ADDRESSABLE_TID}';
              var b = d.getElementsByTagName('script')[0];
              b.parentNode.insertBefore(s, b);
            }(window, document);
          `}
        </Script>
      </head>

      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <WalletProvider>
              <TranslationsProvider
                namespaces={[defaultNS]}
                locale={lng}
                resources={resources}
              >
                {children}
              </TranslationsProvider>

              <PixelBg />
            </WalletProvider>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((lng) => ({ lng }));
}
