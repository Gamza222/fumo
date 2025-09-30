import type { Metadata } from 'next';
// import { QueryProvider } from "@/infrastructure/providers/query";
import { SentryProvider } from '@/infrastructure/providers/sentry';
import { ThemeProvider } from '@/infrastructure/providers/theme';
import { ErrorBoundary } from '@/infrastructure/error-handling';
import './globals.css';
import { AppLoadingProvider } from '@/infrastructure/providers/app-loading';
import { InitialLoader } from '@/widgets/InitialLoader/ui/InitialLoader';

export const metadata: Metadata = {
  title: 'Fumo',
  description: 'Fumo ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SentryProvider>
          <ThemeProvider>
            <AppLoadingProvider>
              <InitialLoader />
              <ErrorBoundary>{children}</ErrorBoundary>
            </AppLoadingProvider>
          </ThemeProvider>
        </SentryProvider>
      </body>
    </html>
  );
}
