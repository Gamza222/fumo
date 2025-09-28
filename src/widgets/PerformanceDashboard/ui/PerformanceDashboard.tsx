'use client';

import React, { useEffect, useState } from 'react';
import { performanceMonitor } from '@/infrastructure/performance/lib/performance-monitor';
import type { PerformanceReport } from '@/infrastructure/performance';
import styles from './PerformanceDashboard.module.scss';

/**
 * Performance Dashboard Component
 */
export const PerformanceDashboard: React.FC = () => {
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subscribe to performance updates
    const unsubscribe = performanceMonitor.subscribe(setReport);

    // Get initial report
    setReport(performanceMonitor.generateReport());

    return unsubscribe;
  }, []);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible || !report) {
    return null;
  }

  const { summary, metrics } = report;

  return (
    <div className={styles['performance-dashboard']}>
      <div className={styles['performance-dashboard__header']}>
        <h3>Performance Dashboard</h3>
        <button
          onClick={() => setIsVisible(false)}
          className={styles['performance-dashboard__close']}
        >
          ×
        </button>
      </div>

      <div className={styles['performance-dashboard__summary']}>
        <div className={styles['performance-dashboard__metric']}>
          <span className={styles['performance-dashboard__label']}>Total Metrics:</span>
          <span className={styles['performance-dashboard__value']}>{summary.totalMetrics}</span>
        </div>

        <div className={styles['performance-dashboard__metric']}>
          <span className={styles['performance-dashboard__label']}>Good:</span>
          <span
            className={`${styles['performance-dashboard__value']} ${styles['performance-dashboard__value--good']}`}
          >
            {summary.goodMetrics}
          </span>
        </div>

        <div className={styles['performance-dashboard__metric']}>
          <span className={styles['performance-dashboard__label']}>Needs Improvement:</span>
          <span
            className={`${styles['performance-dashboard__value']} ${styles['performance-dashboard__value--warning']}`}
          >
            {summary.needsImprovementMetrics}
          </span>
        </div>

        <div className={styles['performance-dashboard__metric']}>
          <span className={styles['performance-dashboard__label']}>Poor:</span>
          <span
            className={`${styles['performance-dashboard__value']} ${styles['performance-dashboard__value--error']}`}
          >
            {summary.poorMetrics}
          </span>
        </div>
      </div>

      <div className={styles['performance-dashboard__metrics']}>
        <h4>Recent Metrics</h4>
        {metrics.slice(-10).map((metric, index) => (
          <div key={index} className={styles['performance-dashboard__metric-item']}>
            <span className={styles['performance-dashboard__metric-name']}>{metric.name}</span>
            <span className={styles['performance-dashboard__metric-value']}>
              {metric.value.toFixed(2)}ms
            </span>
            {metric.rating && (
              <span
                className={`${styles['performance-dashboard__metric-rating']} ${styles[`performance-dashboard__metric-rating--${metric.rating}`]}`}
              >
                {metric.rating}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className={styles['performance-dashboard__actions']}>
        <button
          onClick={() => performanceMonitor.clear()}
          className={styles['performance-dashboard__button']}
        >
          Clear Metrics
        </button>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
