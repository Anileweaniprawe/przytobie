import { Manrope, Newsreader } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata = {
  title: 'PrzyTobie',
  description: 'Przy Tobie na każdym kroku.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FBF5EE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <div className="app-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
