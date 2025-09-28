import type { Metadata } from 'next';
// import { QueryProvider } from "@/infrastructure/providers/query";
import { SentryProvider } from '@/infrastructure/providers/sentry';
import { ThemeProvider } from '@/infrastructure/providers/theme';
import { ErrorBoundary } from '@/infrastructure/error-handling';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fumo',
  description: 'Fumo - Modern web application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SentryProvider>
          <ThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </SentryProvider>
      </body>
    </html>
  );
}
