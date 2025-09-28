import { ReactNode } from 'react';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextVariant } from '@/shared/ui/Text/Text.types';
import { Button } from '@/shared/ui/Button';
import { ButtonVariant } from '@/shared/ui/Button/Button.types';
import Link from 'next/link';
import styles from './layout.module.scss';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.LG}>
            Admin Configuration
          </Text>

          <nav className={styles.nav}>
            <Link href="/configuration">
              <Button variant={ButtonVariant.SECONDARY}>Configuration</Button>
            </Link>
            <Link href="/">
              <Button variant={ButtonVariant.SECONDARY}>Home</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.MD} className={styles.sidebarTitle}>
            Admin Menu
          </Text>
          <nav className={styles.sidebarNav}>
            <Link href="/configuration" className={styles.sidebarLink}>
              General Settings
            </Link>
            <Link href="/configuration" className={styles.sidebarLink}>
              User Management
            </Link>
            <Link href="/configuration" className={styles.sidebarLink}>
              System Configuration
            </Link>
          </nav>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Text variant={TextVariant.PRIMARY} size={TextSize.SM}>
            Admin Configuration Footer
          </Text>
        </div>
      </footer>
    </div>
  );
}
