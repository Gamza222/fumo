#!/usr/bin/env node

// Import the component generator function
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Usage: npm run generate:component <name> [layer] [type] [description]');
  console.log('');
  console.log('Examples:');
  console.log('  npm run generate:component Button');
  console.log('  npm run generate:component Button shared ui "A button component"');
  console.log('  npm run generate:component UserCard widgets ui "User card widget"');
  console.log(
    '  npm run generate:component AuthService infrastructure lib "Authentication service"'
  );
  console.log('');
  console.log('Layers: shared, widgets, infrastructure');
  console.log('Types: ui, lib, model, api');
  process.exit(1);
}

const name = args[0];
const layer = args[1] || 'shared';
const type = args[2] || 'ui';
const description = args[3] || '';

// Validate inputs
if (!['shared', 'widgets', 'infrastructure'].includes(layer)) {
  console.error('❌ Invalid layer. Must be: shared, widgets, infrastructure');
  process.exit(1);
}

if (!['ui', 'lib', 'model', 'api'].includes(type)) {
  console.error('❌ Invalid type. Must be: ui, lib, model, api');
  process.exit(1);
}

// Component generator function (inline for CommonJS compatibility)
function componentGenerator(config) {
  const { name, layer, type, description = '' } = config;

  // Validate layer and type combination
  if (layer === 'shared' && !['ui', 'lib', 'model'].includes(type)) {
    throw new Error('Shared layer only supports ui, lib, or model types');
  }

  if (layer === 'widgets' && type !== 'ui') {
    throw new Error('Widgets layer only supports ui type');
  }

  if (layer === 'infrastructure' && !['lib', 'api'].includes(type)) {
    throw new Error('Infrastructure layer only supports lib or api types');
  }

  const componentDir = path.join('src', layer, type, name);

  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Generate component file
  const componentContent = generateComponentFile(name, description);
  fs.writeFileSync(path.join(componentDir, `${name}.tsx`), componentContent);

  // Generate test file
  const testContent = generateTestFile(name);
  fs.writeFileSync(path.join(componentDir, `${name}.test.tsx`), testContent);

  // Generate stories file
  const storiesContent = generateStoriesFile(name, description);
  fs.writeFileSync(path.join(componentDir, `${name}.stories.tsx`), storiesContent);

  // Generate index file
  const indexContent = generateIndexFile(name);
  fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);

  console.log(`✅ Component ${name} generated successfully in ${componentDir}`);
  console.log(`📁 Files created:`);
  console.log(`   - ${name}.tsx`);
  console.log(`   - ${name}.test.tsx`);
  console.log(`   - ${name}.stories.tsx`);
  console.log(`   - index.ts`);
}

function generateComponentFile(name, description) {
  return `import React from 'react';
import { classNames } from '@/shared/lib/utils/classNames';

export interface ${name}Props {
  className?: string;
  children?: React.ReactNode;
  // Add your props here
}

/**
 * ${description || `${name} component`}
 * 
 * @param props - Component props
 * @returns JSX element
 */
export function ${name}({ className, children, ...props }: ${name}Props) {
  return (
    <div 
      className={classNames('${name.toLowerCase()}', {}, [className])}
      {...props}
    >
      {children}
    </div>
  );
}
`;
}

function generateTestFile(name) {
  return `import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name}>Test content</${name}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${name} className="custom-class">Test</${name}>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('${name.toLowerCase()}');
  });

  it('renders children correctly', () => {
    render(
      <${name}>
        <span>Child 1</span>
        <span>Child 2</span>
      </${name}>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
`;
}

function generateStoriesFile(name, description) {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${description || `${name} component`}',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
    children: {
      control: 'text',
      description: 'Content to render inside the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${name}',
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div>
        <h3>Custom Content</h3>
        <p>This is custom content inside ${name}</p>
      </div>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'custom-${name.toLowerCase()}-class',
    children: 'Styled ${name}',
  },
};
`;
}

function generateIndexFile(name) {
  return `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
`;
}

try {
  componentGenerator({
    name,
    layer,
    type,
    description,
  });
} catch (error) {
  console.error('❌ Error generating component:', error.message);
  process.exit(1);
}
