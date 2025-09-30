'use client';

import { Suspense, lazy, useEffect } from 'react';
import { useAppLoadingContext } from '@/infrastructure/providers/app-loading';

// Lazy load the actual page
const HomePage = lazy(() => import('@/pages/HomePage'));

const SuspenseTracker = () => {
  const { setSuspenseLoading } = useAppLoadingContext();

  useEffect(() => {
    setSuspenseLoading(true);
    return () => setSuspenseLoading(false);
  }, [setSuspenseLoading]);

  return null;
};

export default function AppPage() {
  return (
    <Suspense fallback={<SuspenseTracker />}>
      <HomePage />
    </Suspense>
  );
}
