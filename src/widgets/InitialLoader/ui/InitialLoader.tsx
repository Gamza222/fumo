'use client';

import { memo, useEffect, useMemo, useState } from 'react';

//styles
import styles from './InitialLoader.module.scss';

//lib
import { formatStepName } from '../lib/lib';

import { usePathname } from 'next/navigation';

//external
import { useAppLoadingContext } from '@/infrastructure/providers/app-loading';
import { getCurrentRouteConfig, AppRoute } from '@/shared/config/route';
import { classNames } from '@/shared/lib/utils/classNames';

//components
import { ProgressBar } from '@/widgets/ProgressBar';
import { Mods } from '@/shared/lib/utils/classNames/classNames';

export interface InitialLoaderProps {
  className?: string;
  loadingMessage?: string;
  showProgress?: boolean;
}

export const InitialLoader = memo<InitialLoaderProps>(
  ({ className, loadingMessage, showProgress = true }) => {
    const pathname = usePathname();
    const { isOverallLoading, progress, currentStep } = useAppLoadingContext();
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [shouldShowLoader, setShouldShowLoader] = useState(false);

    // Get route config
    const routeConfig = useMemo(() => getCurrentRouteConfig(pathname).config, [pathname]);

    // Simple cache check
    const isCached = useMemo(() => {
      if (!routeConfig.cache.enabled) return false;
      if (typeof window === 'undefined') return false; // SSR check
      const cacheKey = routeConfig.cache.key || `cache-${routeConfig.route}`;
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return false;
      try {
        const parsed = JSON.parse(cached) as { timestamp: number; ttl: number };
        const { timestamp, ttl } = parsed;
        return Date.now() - timestamp < ttl;
      } catch {
        return false;
      }
    }, [routeConfig.cache.enabled, routeConfig.cache.key, routeConfig.route]);

    useEffect(() => {
      const shouldShow = routeConfig.route === AppRoute.HOME || !isCached;
      setShouldShowLoader(shouldShow);
    }, [pathname, routeConfig.route, isCached]);

    // Save cache when done - with SSR safety
    useEffect(() => {
      if (
        !isOverallLoading &&
        shouldShowLoader &&
        routeConfig.cache.enabled &&
        typeof window !== 'undefined'
      ) {
        const cacheKey = routeConfig.cache.key || `cache-${routeConfig.route}`;
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            ttl: routeConfig.cache.ttl || 86400000, // 24 hours
          })
        );
      }
    }, [isOverallLoading, shouldShowLoader, routeConfig]);

    // Visibility logic
    useEffect(() => {
      if (isOverallLoading) {
        setIsVisible(true);
        setIsFadingOut(false);
        return;
      }

      setIsFadingOut(true);
      setTimeout(() => setIsVisible(false), routeConfig.loader.minDisplayTime || 2000);
    }, [isOverallLoading, routeConfig.loader.minDisplayTime]);

    if (!shouldShowLoader || !isVisible) return null;

    const displayMessage =
      loadingMessage || (progress >= 100 ? 'Ready!' : formatStepName(currentStep));

    const mods: Mods = {
      [styles.fadeOut || '']: isFadingOut,
    };

    return (
      <div
        className={classNames(styles.initialLoader || '', { ...mods }, [className])}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading application"
      >
        <div className={styles.overlay} />
        <div className={styles.content}>
          <ProgressBar progress={progress} message={displayMessage} showPercentage={showProgress} />
        </div>
      </div>
    );
  }
);

InitialLoader.displayName = 'InitialLoader';
