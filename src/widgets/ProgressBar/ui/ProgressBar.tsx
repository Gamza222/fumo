/**
 * ProgressBar Component
 *
 * Reusable progress bar component with smooth animations.
 * Can be moved to shared/ui later if needed elsewhere.
 */

import { memo } from 'react';
import styles from './ProgressBar.module.scss';

import { formatProgress, getProgressBarWidth } from '../lib/lib';

import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/utils/classNames';

export interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
  message?: string;
}

export const ProgressBar = memo<ProgressBarProps>((props) => {
  const { progress, showPercentage = true, className, message = '' } = props;
  const progressBarWidth = getProgressBarWidth(progress);
  const displayProgress = formatProgress(progress);
  return (
    <div className={classNames(styles.progressBar || '', {}, [className])}>
      <div className={styles.container}>
        <div className={styles.bar} style={{ width: progressBarWidth }} />
      </div>
      {showPercentage && <Text className={styles.percentage}>{displayProgress}</Text>}
      {message && <Text className={styles.message}>{message}</Text>}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
