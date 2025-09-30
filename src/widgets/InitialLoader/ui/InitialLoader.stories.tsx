/**
 * InitialLoader Component Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { InitialLoader } from './InitialLoader';
import { AppLoadingProvider } from '@/infrastructure/providers/app-loading';

// Explicit component reference
const Component = InitialLoader;

const meta = {
  title: 'Widgets/InitialLoader',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    showProgress: {
      control: { type: 'boolean' },
    },
    loadingMessage: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
  decorators: [
    (Story) => (
      <AppLoadingProvider>
        <Story />
      </AppLoadingProvider>
    ),
  ],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// 4 ESSENTIAL STORIES
// ============================================================================

export const DefaultLoading: Story = {
  args: {
    showProgress: true,
  },
};

export const WithCustomMessage: Story = {
  args: {
    showProgress: true,
    loadingMessage: 'Initializing application...',
  },
};

export const WithoutProgress: Story = {
  args: {
    showProgress: false,
    loadingMessage: 'Please wait...',
  },
};

export const WithModuleLoading: Story = {
  args: {
    showProgress: true,
    loadingMessage: 'Loading modules...',
  },
};
