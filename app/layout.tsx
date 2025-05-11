import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Serif_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSerif = Noto_Serif_Display({ 
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: 'Zorig Online - Authentic Bhutanese Textiles & Paintings',
  description: 'Discover handcrafted Bhutanese textiles and paintings, directly sourced from local artisans. Supporting traditions and communities in Bhutan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSerif.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}