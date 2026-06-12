import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    title: 'GO Logistics Express LLC | Recolección en Texas y Envíos Internacionales',
    description: isEs
      ? 'Empresa especializada en recolección de paquetes en Texas, transporte de carga pesada y envíos internacionales hacia Nicaragua y Venezuela. Confiable, rápido y seguro.'
      : 'Specialized company in package pickup in Texas, heavy cargo transportation, and international shipping to Nicaragua and Venezuela. Reliable, fast and secure.',
    keywords: isEs
      ? ['envíos internacionales Texas', 'recolección paquetes Texas', 'envíos Nicaragua', 'envíos Venezuela', 'carga pesada Texas', 'logística internacional']
      : ['international shipping Texas', 'package pickup Texas', 'shipping Nicaragua', 'shipping Venezuela', 'heavy cargo Texas', 'international logistics'],
    metadataBase: new URL('https://go-logistics-express.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: 'GO Logistics Express LLC | Texas → Nicaragua & Venezuela',
      description: isEs
        ? 'Recolección de paquetes en Texas. Envíos internacionales a Nicaragua y Venezuela. ¡Envía 4 cajas y la 5ta Small es GRATIS!'
        : 'Package pickup in Texas. International shipping to Nicaragua and Venezuela. Send 4 boxes and get the 5th Small FREE!',
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      siteName: 'GO Logistics Express LLC',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GO Logistics Express LLC | Texas → Nicaragua & Venezuela',
      description: isEs
        ? 'Recolección en Texas. Envíos a Nicaragua y Venezuela. Promoción: ¡4 cajas + 5ta gratis!'
        : 'Texas pickup. Shipping to Nicaragua & Venezuela. Promo: 4 boxes + 5th free!',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GO Logistics Express LLC',
  description: 'Empresa especializada en recolección de paquetes en Texas y envíos internacionales a Nicaragua y Venezuela.',
  telephone: '+18138626936',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'Country', name: 'Nicaragua' },
    { '@type': 'Country', name: 'Venezuela' },
  ],
  serviceType: ['International Shipping', 'Package Pickup', 'Heavy Cargo Transportation'],
  priceRange: '$$',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
