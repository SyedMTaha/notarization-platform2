// Import necessary modules
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Import global styles
import './globals.css';
import '../../public/assets/css/animate.min.css';
import '../../public/assets/css/bootstrap.min.css';
import '../../public/assets/css/flaticon.min.css';
import '../../public/assets/css/fontawesome-5.14.0.min.css';
import '../../public/assets/css/jquery.animatedheadline.css';
import '../../public/assets/css/magnific-popup.min.css';
import '../../public/assets/css/nice-select.min.css';
import '../../public/assets/css/slick.min.css';
import '../../public/assets/css/style.css';

// Metadata configuration
export const metadata = {
  title: 'WiScribbles',
  description: 'Notarize online. Anywhere, Anytime',
};

// Locale-aware layout component
export default async function LocaleLayout({ children, params }) {
  // Extract and validate the locale parameter
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Render the layout with the appropriate locale and styles
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
