import { Suspense } from 'react';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { ComponentLoadingFallback, ComponentHeight } from '@/infrastructure/suspense';
import { MonitoringDashboard } from '@/infrastructure/monitoring';
import styles from './page.module.scss';

export default function WorkspacePage() {
  return (
    <Suspense fallback={<ComponentLoadingFallback height={ComponentHeight.LARGE} />}>
      <div className={styles.container}>
        <Text variant={TextVariant.PRIMARY} size={TextSize.LG} className={styles.title}>
          Workspace Page - Monitoring Dashboard Feature
        </Text>

        <div className={styles.card}>
          <MonitoringDashboard />
        </div>
      </div>
    </Suspense>
  );
}
