/**
 * Output Formatters
 */

import chalk from 'chalk';
import { JSONNode, JSONValueType, JSONStats } from '../types';

const TYPE_COLORS: Record<JSONValueType, chalk.Chalk> = {
  object: chalk.cyan,
  array: chalk.yellow,
  string: chalk.green,
  number: chalk.magenta,
  boolean: chalk.blue,
  null: chalk.gray,
};

const TYPE_ICONS: Record<JSONValueType, string> = {
  object: '{}',
  array: '[]',
  string: '""',
  number: '#',
  boolean: '?',
  null: '∅',
};

export function formatValue(value: unknown, type: JSONValueType, compact = false): string {
  if (type === 'string') {
    const str = value as string;
    if (compact && str.length > 50) {
      return `"${str.substring(0, 47)}..."`;
    }
    return `"${str}"`;
  }
  if (type === 'null') return 'null';
  return String(value);
}

export function renderTree(
  node: JSONNode,
  options: { colorize?: boolean; compact?: boolean; showArrayIndex?: boolean } = {}
): string {
  const { colorize = true, compact = false, showArrayIndex = true } = options;
  const lines: string[] = [];

  function render(node: JSONNode, prefix = '', isLast = true) {
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';

    let line = prefix + connector;

    // Key display
    if (node.key !== 'root') {
      const keyDisplay = showArrayIndex || !node.key.match(/^\[\d+\]$/)
        ? node.key
        : '';
      if (keyDisplay) {
        line += colorize ? chalk.white(keyDisplay) : keyDisplay;
        line += ': ';
      }
    }

    // Value display
    const color = colorize ? TYPE_COLORS[node.type] : chalk.white;
    const icon = TYPE_ICONS[node.type];

    if (node.type === 'object' || node.type === 'array') {
      const count = node.children?.length || 0;
      line += color(`${icon} ${count} items`);
    } else {
      line += color(formatValue(node.value, node.type, compact));
      line += colorize ? chalk.gray(` (${node.type})`) : ` (${node.type})`;
    }

    lines.push(line);

    // Children
    if (node.children) {
      node.children.forEach((child, index) => {
        const isLastChild = index === node.children!.length - 1;
        render(child, prefix + childPrefix, isLastChild);
      });
    }
  }

  render(node);
  return lines.join('\n');
}

export function renderStats(stats: JSONStats, colorize = true): string {
  const lines: string[] = [];
  const c = colorize ? chalk : { cyan: (s: string) => s, green: (s: string) => s, yellow: (s: string) => s, magenta: (s: string) => s };

  lines.push(c.cyan('📊 JSON Statistics'));
  lines.push(c.cyan('═'.repeat(40)));
  lines.push(`  Total Keys:     ${c.green(stats.totalKeys.toString())}`);
  lines.push(`  Max Depth:      ${c.green(stats.maxDepth.toString())}`);
  lines.push(`  Total Size:     ${c.yellow(`${stats.totalSize} bytes`)}`);
  lines.push(`  Object Count:   ${c.magenta(stats.objectCount.toString())}`);
  lines.push(`  Array Count:    ${c.magenta(stats.arrayCount.toString())}`);
  lines.push('');
  lines.push(c.cyan('  Type Distribution:'));

  Object.entries(stats.typeDistribution).forEach(([type, count]) => {
    const bar = '█'.repeat(Math.min(count, 20));
    const typeColor = colorize ? TYPE_COLORS[type as JSONValueType] : (s: string) => s;
    lines.push(`    ${typeColor(type.padEnd(8))} ${count.toString().padStart(4)} ${bar}`);
  });

  return lines.join('\n');
}

export function renderDiff(added: string[], removed: string[], modified: Array<{ path: string; oldValue: unknown; newValue: unknown }>, colorize = true): string {
  const lines: string[] = [];

  lines.push(colorize ? chalk.cyan('📋 JSON Diff Results') : '📋 JSON Diff Results');
  lines.push(colorize ? chalk.cyan('═'.repeat(40)) : '═'.repeat(40));

  if (added.length > 0) {
    lines.push(colorize ? chalk.green(`\n  [+] Added (${added.length}):`) : `\n  [+] Added (${added.length}):`);
    added.forEach(path => lines.push(colorize ? chalk.green(`    + ${path}`) : `    + ${path}`));
  }

  if (removed.length > 0) {
    lines.push(colorize ? chalk.red(`\n  [-] Removed (${removed.length}):`) : `\n  [-] Removed (${removed.length}):`);
    removed.forEach(path => lines.push(colorize ? chalk.red(`    - ${path}`) : `    - ${path}`));
  }

  if (modified.length > 0) {
    lines.push(colorize ? chalk.yellow(`\n  [~] Modified (${modified.length}):`) : `\n  [~] Modified (${modified.length}):`);
    modified.forEach(({ path, oldValue, newValue }) => {
      lines.push(colorize ? chalk.yellow(`    ~ ${path}`) : `    ~ ${path}`);
      lines.push(colorize ? chalk.red(`      - ${JSON.stringify(oldValue)}`) : `      - ${JSON.stringify(oldValue)}`);
      lines.push(colorize ? chalk.green(`      + ${JSON.stringify(newValue)}`) : `      + ${JSON.stringify(newValue)}`);
    });
  }

  if (added.length === 0 && removed.length === 0 && modified.length === 0) {
    lines.push(colorize ? chalk.green('\n  ✓ No differences found') : '\n  ✓ No differences found');
  }

  return lines.join('\n');
}
