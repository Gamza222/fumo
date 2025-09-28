import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonSize, ButtonVariant } from './Button.types';

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    icon: {
      control: false,
      description: 'Icon to display (as JSX)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: 'Ghost Button',
  },
};

export const Small: Story = {
  args: {
    size: ButtonSize.SM,
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: ButtonSize.MD,
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: ButtonSize.LG,
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};
