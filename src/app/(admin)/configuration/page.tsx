import { Suspense } from 'react';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { ComponentLoadingFallback, ComponentHeight } from '@/infrastructure/suspense';
import styles from './page.module.scss';

export default function ConfigurationPage() {
  return (
    <Suspense fallback={<ComponentLoadingFallback height={ComponentHeight.LARGE} />}>
      <div className={styles.container}>
        <div className={styles.card}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.LG} className={styles.title}>
            Configuration Page
          </Text>

          <Text variant={TextVariant.SECONDARY} size={TextSize.LG} className={styles.description}>
            This page demonstrates configuration features.
          </Text>
        </div>
      </div>
    </Suspense>
  );
}
