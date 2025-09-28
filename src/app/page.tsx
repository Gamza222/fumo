import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { ButtonVariant } from '@/shared/ui/Button/Button.types';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.LG}>
            🚀 Fumo
          </Text>
          <Text variant={TextVariant.SECONDARY} size={TextSize.LG}>
            Simple examples of all features
          </Text>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.LG} className={styles.navigationTitle}>
            Click to see features:
          </Text>

          <Link href="/workspace">
            <Button variant={ButtonVariant.PRIMARY} className={styles.navButton}>
              Workspace - Monitoring Dashboard
            </Button>
          </Link>

          <Link href="/reports">
            <Button variant={ButtonVariant.PRIMARY} className={styles.navButton}>
              Reports - Analytics Hook
            </Button>
          </Link>

          <Link href="/configuration">
            <Button variant={ButtonVariant.PRIMARY} className={styles.navButton}>
              Configuration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
