/**
 * JSON Parser Utilities
 */

import { JSONNode, JSONValueType, JSONStats } from '../types';

export function detectType(value: unknown): JSONValueType {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value as JSONValueType;
}

export function parseJSON(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function buildTree(data: unknown, key = 'root', depth = 0, path = '$'): JSONNode {
  const type = detectType(data);
  const node: JSONNode = {
    key,
    value: data,
    type,
    depth,
    path,
  };

  if (type === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    node.children = Object.entries(obj).map(([k, v]) =>
      buildTree(v, k, depth + 1, `${path}.${k}`)
    );
  } else if (type === 'array') {
    const arr = data as unknown[];
    node.children = arr.map((item, index) =>
      buildTree(item, `[${index}]`, depth + 1, `${path}[${index}]`)
    );
  }

  return node;
}

export function calculateStats(data: unknown): JSONStats {
  const stats: JSONStats = {
    totalKeys: 0,
    maxDepth: 0,
    typeDistribution: {
      object: 0,
      array: 0,
      string: 0,
      number: 0,
      boolean: 0,
      null: 0,
    },
    totalSize: JSON.stringify(data).length,
    arrayCount: 0,
    objectCount: 0,
  };

  function traverse(node: unknown, depth: number) {
    const type = detectType(node);
    stats.typeDistribution[type]++;
    stats.maxDepth = Math.max(stats.maxDepth, depth);

    if (type === 'object' && node !== null) {
      stats.objectCount++;
      const obj = node as Record<string, unknown>;
      Object.values(obj).forEach((value) => {
        stats.totalKeys++;
        traverse(value, depth + 1);
      });
    } else if (type === 'array') {
      stats.arrayCount++;
      const arr = node as unknown[];
      arr.forEach((item) => traverse(item, depth + 1));
    }
  }

  traverse(data, 1);
  return stats;
}

export function flattenObject(
  obj: unknown,
  prefix = '',
  result: Record<string, unknown> = {}
): Record<string, unknown> {
  const type = detectType(obj);

  if (type === 'object' && obj !== null) {
    const record = obj as Record<string, unknown>;
    Object.entries(record).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      flattenObject(value, newKey, result);
    });
  } else if (type === 'array') {
    const arr = obj as unknown[];
    arr.forEach((item, index) => {
      flattenObject(item, `${prefix}[${index}]`, result);
    });
  } else {
    result[prefix] = obj;
  }

  return result;
}
