#!/usr/bin/env node

// FSD Validator (inline for CommonJS compatibility)
const fs = require('fs');
const path = require('path');

// FSD Architecture Rules
const FSD_RULES = [
  // Shared layer rules
  { from: 'shared/ui', to: 'shared/lib', allowed: true, reason: 'UI can use shared utilities' },
  { from: 'shared/ui', to: 'shared/model', allowed: true, reason: 'UI can use shared models' },
  { from: 'shared/lib', to: 'shared/model', allowed: true, reason: 'Lib can use shared models' },
  {
    from: 'shared/model',
    to: 'shared/ui',
    allowed: false,
    reason: 'Models should not depend on UI',
  },
  {
    from: 'shared/model',
    to: 'shared/lib',
    allowed: false,
    reason: 'Models should not depend on lib',
  },

  // Widgets layer rules
  { from: 'widgets', to: 'shared', allowed: true, reason: 'Widgets can use shared components' },
  {
    from: 'widgets',
    to: 'infrastructure',
    allowed: true,
    reason: 'Widgets can use infrastructure',
  },
  {
    from: 'widgets',
    to: 'widgets',
    allowed: false,
    reason: 'Widgets should not depend on other widgets',
  },

  // Infrastructure layer rules
  {
    from: 'infrastructure',
    to: 'shared',
    allowed: true,
    reason: 'Infrastructure can use shared utilities',
  },
  {
    from: 'infrastructure',
    to: 'widgets',
    allowed: false,
    reason: 'Infrastructure should not depend on widgets',
  },
  {
    from: 'infrastructure',
    to: 'infrastructure',
    allowed: true,
    reason: 'Infrastructure can use other infrastructure',
  },

  // App layer rules
  { from: 'app', to: 'shared', allowed: true, reason: 'App can use shared components' },
  { from: 'app', to: 'widgets', allowed: true, reason: 'App can use widgets' },
  { from: 'app', to: 'infrastructure', allowed: true, reason: 'App can use infrastructure' },
];

function fsdValidator() {
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  try {
    // Get all TypeScript files
    const files = getAllTsFiles('src');

    for (const file of files) {
      const violations = validateFile(file);
      result.errors.push(...violations.errors);
      result.warnings.push(...violations.warnings);
    }

    result.isValid = result.errors.length === 0;

    if (result.errors.length > 0) {
      console.log('❌ FSD Validation Failed:');
      result.errors.forEach((error) => console.log(`   ${error}`));
    }

    if (result.warnings.length > 0) {
      console.log('⚠️  FSD Warnings:');
      result.warnings.forEach((warning) => console.log(`   ${warning}`));
    }

    if (result.isValid && result.warnings.length === 0) {
      console.log('✅ FSD Validation Passed - No violations found');
    }
  } catch (error) {
    result.isValid = false;
    result.errors.push(`Validation failed: ${error}`);
  }

  return result;
}

function getAllTsFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllTsFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function validateFile(filePath) {
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports = extractImports(content);

    for (const importPath of imports) {
      const violation = checkImportViolation(filePath, importPath);
      if (violation) {
        if (violation.severity === 'error') {
          errors.push(violation.message);
        } else {
          warnings.push(violation.message);
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to read file ${filePath}: ${error}`);
  }

  return { errors, warnings };
}

function extractImports(content) {
  const imports = [];
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Only check internal imports (starting with @/ or ./)
    if (
      importPath.startsWith('@/') ||
      importPath.startsWith('./') ||
      importPath.startsWith('../')
    ) {
      imports.push(importPath);
    }
  }

  return imports;
}

function checkImportViolation(filePath, importPath) {
  const fromLayer = getLayerFromPath(filePath);
  const toLayer = getLayerFromPath(importPath);

  if (!fromLayer || !toLayer) {
    return null; // Skip external imports or unrecognized paths
  }

  const rule = FSD_RULES.find((r) => r.from === fromLayer && r.to === toLayer);

  if (!rule) {
    return null; // No rule defined, assume allowed
  }

  if (!rule.allowed) {
    return {
      message: `❌ ${filePath}: Cannot import from ${toLayer} (${rule.reason})`,
      severity: 'error',
    };
  }

  return null; // Import is allowed
}

function getLayerFromPath(filePath) {
  // Convert file path to layer path
  const normalizedPath = filePath.replace(/\\/g, '/');

  if (normalizedPath.includes('/shared/ui/')) return 'shared/ui';
  if (normalizedPath.includes('/shared/lib/')) return 'shared/lib';
  if (normalizedPath.includes('/shared/model/')) return 'shared/model';
  if (normalizedPath.includes('/widgets/')) return 'widgets';
  if (normalizedPath.includes('/infrastructure/')) return 'infrastructure';
  if (normalizedPath.includes('/app/')) return 'app';

  return null;
}

console.log('🔍 Validating FSD Architecture...\n');

const result = fsdValidator();

if (result.isValid) {
  console.log('\n✅ FSD Validation completed successfully!');
  process.exit(0);
} else {
  console.log('\n❌ FSD Validation failed!');
  process.exit(1);
}
