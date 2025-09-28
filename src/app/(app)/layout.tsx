import { ReactNode } from 'react';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { Button } from '@/shared/ui/Button';
import { ButtonVariant } from '@/shared/ui/Button/Button.types';
import Link from 'next/link';
import styles from './layout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.LG}>
            Application Workspace
          </Text>

          <nav className={styles.nav}>
            <Link href="/workspace">
              <Button variant={ButtonVariant.SECONDARY}>Workspace</Button>
            </Link>
            <Link href="/reports">
              <Button variant={ButtonVariant.SECONDARY}>Reports</Button>
            </Link>
            <Link href="/">
              <Button variant={ButtonVariant.SECONDARY}>Home</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>{children}</main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.SM}>
            Application Workspace Footer
          </Text>
        </div>
      </footer>
    </div>
  );
}
