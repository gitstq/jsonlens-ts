#!/usr/bin/env node
/**
 * JSONLens CLI Entry Point
 */

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { parseJSON, buildTree, calculateStats, flattenObject } from './utils/parser';
import { renderTree, renderStats, renderDiff } from './utils/formatter';
import { diffJSON } from './utils/diff';
import { filterJSON } from './utils/filter';
import { JSONValueType } from './types';

const program = new Command();

program
  .name('jsonlens')
  .description('🔍 JSONLens - A powerful CLI tool for JSON visualization, analysis and transformation')
  .version('1.0.0');

// Tree command
program
  .command('tree')
  .description('🌲 Display JSON as an interactive tree structure')
  .argument('<file>', 'JSON file path')
  .option('-d, --max-depth <number>', 'Maximum depth to display', '10')
  .option('-c, --no-color', 'Disable colorized output')
  .option('--compact', 'Compact mode (truncate long strings)')
  .option('--no-array-index', 'Hide array indices')
  .action((filePath, options) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const data = parseJSON(content);
      const tree = buildTree(data);

      console.log(renderTree(tree, {
        colorize: options.color,
        compact: options.compact,
        showArrayIndex: options.arrayIndex,
      }));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('📊 Show detailed JSON statistics')
  .argument('<file>', 'JSON file path')
  .option('-c, --no-color', 'Disable colorized output')
  .action((filePath, options) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const data = parseJSON(content);
      const stats = calculateStats(data);

      console.log(renderStats(stats, options.color));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Flatten command
program
  .command('flatten')
  .description('📋 Flatten nested JSON to dot-notation key-value pairs')
  .argument('<file>', 'JSON file path')
  .option('-o, --output <file>', 'Output file path')
  .action((filePath, options) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const data = parseJSON(content);
      const flat = flattenObject(data);

      const output = Object.entries(flat)
        .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
        .join('\n');

      if (options.output) {
        fs.writeFileSync(options.output, output);
        console.log(chalk.green(`✅ Flattened JSON written to ${options.output}`));
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Diff command
program
  .command('diff')
  .description('🔀 Compare two JSON files and show differences')
  .argument('<file1>', 'First JSON file')
  .argument('<file2>', 'Second JSON file')
  .option('-c, --no-color', 'Disable colorized output')
  .action((file1, file2, options) => {
    try {
      const content1 = fs.readFileSync(path.resolve(file1), 'utf-8');
      const content2 = fs.readFileSync(path.resolve(file2), 'utf-8');
      const data1 = parseJSON(content1);
      const data2 = parseJSON(content2);

      const result = diffJSON(data1, data2);
      console.log(renderDiff(result.added, result.removed, result.modified, options.color));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Filter command
program
  .command('filter')
  .description('🔍 Filter JSON by key pattern, value pattern, or type')
  .argument('<file>', 'JSON file path')
  .option('-k, --key <pattern>', 'Filter by key pattern (regex)')
  .option('-v, --value <pattern>', 'Filter by value pattern (regex)')
  .option('-t, --type <types>', 'Filter by type(s): object,array,string,number,boolean,null')
  .option('-o, --output <file>', 'Output file path')
  .action((filePath, options) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const data = parseJSON(content);

      const typeFilter = options.type
        ? options.type.split(',').map((t: string) => t.trim() as JSONValueType)
        : undefined;

      const filtered = filterJSON(data, {
        keyPattern: options.key,
        valuePattern: options.value,
        typeFilter,
      });

      const output = JSON.stringify(filtered, null, 2);

      if (options.output) {
        fs.writeFileSync(options.output, output);
        console.log(chalk.green(`✅ Filtered JSON written to ${options.output}`));
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate')
  .description('✅ Validate JSON file syntax')
  .argument('<file>', 'JSON file path')
  .action((filePath) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      parseJSON(content);
      console.log(chalk.green('✅ Valid JSON'));
    } catch (error) {
      console.error(chalk.red(`❌ Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });

// Interactive mode
program
  .command('interactive')
  .alias('i')
  .description('🎮 Interactive mode (read from stdin)')
  .action(() => {
    console.log(chalk.cyan('🎮 JSONLens Interactive Mode'));
    console.log(chalk.gray('Paste JSON and press Ctrl+D to analyze...\n'));

    let input = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
      input += chunk;
    });
    process.stdin.on('end', () => {
      try {
        const data = parseJSON(input.trim());
        const tree = buildTree(data);
        console.log('\n' + chalk.cyan('📊 Tree View:'));
        console.log(renderTree(tree));
        console.log('\n' + renderStats(calculateStats(data)));
      } catch (error) {
        console.error(chalk.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
        process.exit(1);
      }
    });
  });

program.parse();
