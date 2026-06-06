/**
 * JSONLens - Core Type Definitions
 */

export interface JSONNode {
  key: string;
  value: unknown;
  type: JSONValueType;
  depth: number;
  path: string;
  children?: JSONNode[];
  isExpanded?: boolean;
}

export type JSONValueType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null';

export interface TreeOptions {
  maxDepth?: number;
  showArrayIndex?: boolean;
  colorize?: boolean;
  compact?: boolean;
}

export interface StatsOptions {
  detailed?: boolean;
}

export interface JSONStats {
  totalKeys: number;
  maxDepth: number;
  typeDistribution: Record<JSONValueType, number>;
  totalSize: number;
  arrayCount: number;
  objectCount: number;
}

export interface DiffResult {
  added: string[];
  removed: string[];
  modified: Array<{ path: string; oldValue: unknown; newValue: unknown }>;
}

export interface FilterOptions {
  keyPattern?: string;
  valuePattern?: string;
  typeFilter?: JSONValueType[];
}
