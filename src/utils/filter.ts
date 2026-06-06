/**
 * JSON Filter Engine
 */

import { JSONNode, FilterOptions } from '../types';
import { detectType } from './parser';

export function filterJSON(data: unknown, options: FilterOptions): unknown {
  const { keyPattern, valuePattern, typeFilter } = options;

  function matches(node: unknown, path: string): boolean {
    const type = detectType(node);

    // Type filter
    if (typeFilter && typeFilter.length > 0 && !typeFilter.includes(type)) {
      return false;
    }

    // Key pattern filter
    if (keyPattern) {
      const keyRegex = new RegExp(keyPattern, 'i');
      const lastKey = path.split('.').pop() || '';
      if (!keyRegex.test(lastKey)) {
        return false;
      }
    }

    // Value pattern filter (only for primitive types)
    if (valuePattern && (type === 'string' || type === 'number' || type === 'boolean')) {
      const valueRegex = new RegExp(valuePattern, 'i');
      if (!valueRegex.test(String(node))) {
        return false;
      }
    }

    return true;
  }

  function hasMatchingDescendant(node: unknown, path = 'root'): boolean {
    const type = detectType(node);

    if (type === 'object' && node !== null) {
      const obj = node as Record<string, unknown>;
      return Object.entries(obj).some(([key, value]) => {
        const newPath = path === 'root' ? key : `${path}.${key}`;
        return matches(value, newPath) || hasMatchingDescendant(value, newPath);
      });
    }

    if (type === 'array') {
      const arr = node as unknown[];
      return arr.some((item, index) => hasMatchingDescendant(item, `${path}[${index}]`));
    }

    return matches(node, path);
  }

  function filter(node: unknown, path = 'root'): unknown {
    const type = detectType(node);

    if (type === 'object' && node !== null) {
      const obj = node as Record<string, unknown>;
      const result: Record<string, unknown> = {};

      Object.entries(obj).forEach(([key, value]) => {
        const newPath = path === 'root' ? key : `${path}.${key}`;
        if (matches(value, newPath)) {
          result[key] = value;
        } else if (hasMatchingDescendant(value, newPath)) {
          const filtered = filter(value, newPath);
          if (filtered !== null && (Array.isArray(filtered) ? filtered.length > 0 : typeof filtered !== 'object' || Object.keys(filtered).length > 0)) {
            result[key] = filtered;
          }
        }
      });

      return Object.keys(result).length > 0 ? result : null;
    }

    if (type === 'array') {
      const arr = node as unknown[];
      const result = arr
        .map((item, index) => filter(item, `${path}[${index}]`))
        .filter((item) => item !== null);
      return result.length > 0 ? result : null;
    }

    return matches(node, path) ? node : null;
  }

  return filter(data);
}
