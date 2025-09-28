import { Suspense } from 'react';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { ComponentLoadingFallback, ComponentHeight } from '@/infrastructure/suspense';
import styles from './page.module.scss';

// Simple analytics example component
function AnalyticsExample() {
  return (
    <div className={styles.card}>
      <Text variant={TextVariant.PRIMARY} size={TextSize.LG} className={styles.title}>
        Reports Page - Analytics Hook Feature
      </Text>

      <Text variant={TextVariant.SECONDARY} size={TextSize.LG} className={styles.description}>
        This page demonstrates the analytics tracking system. Events are automatically tracked when
        you navigate here.
      </Text>

      <div className={styles.analyticsCard}>
        <Text variant={TextVariant.PRIMARY} size={TextSize.LG}>
          📊 Analytics System Active - Check monitoring dashboard for tracked events
        </Text>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ComponentLoadingFallback height={ComponentHeight.LARGE} />}>
      <div className={styles.container}>
        <AnalyticsExample />
      </div>
    </Suspense>
  );
}
