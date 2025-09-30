/**
 * ProgressBar Component Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Widgets/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showPercentage: {
      control: { type: 'boolean' },
    },
    message: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// 4 ESSENTIAL STORIES
// ============================================================================

export const HalfProgress: Story = {
  args: {
    progress: 50,
    showPercentage: true,
  },
};

export const FullWithMessageAndPercentage: Story = {
  args: {
    progress: 100,
    showPercentage: true,
    message: 'Loading complete!',
  },
};

export const OnlyPercentage: Story = {
  args: {
    progress: 100,
    showPercentage: true,
  },
};

export const OnlyMessage: Story = {
  args: {
    progress: 30,
    showPercentage: false,
    message: 'Processing files...',
  },
};
