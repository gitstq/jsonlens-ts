/**
 * JSON Diff Engine
 */

import { DiffResult } from '../types';
import { flattenObject } from './parser';

export function diffJSON(oldData: unknown, newData: unknown): DiffResult {
  const oldFlat = flattenObject(oldData);
  const newFlat = flattenObject(newData);

  const oldKeys = Object.keys(oldFlat);
  const newKeys = Object.keys(newFlat);

  const added: string[] = [];
  const removed: string[] = [];
  const modified: Array<{ path: string; oldValue: unknown; newValue: unknown }> = [];

  // Find added keys
  newKeys.forEach((key) => {
    if (!oldKeys.includes(key)) {
      added.push(key);
    }
  });

  // Find removed keys
  oldKeys.forEach((key) => {
    if (!newKeys.includes(key)) {
      removed.push(key);
    }
  });

  // Find modified keys
  oldKeys.forEach((key) => {
    if (newKeys.includes(key)) {
      const oldValue = JSON.stringify(oldFlat[key]);
      const newValue = JSON.stringify(newFlat[key]);
      if (oldValue !== newValue) {
        modified.push({
          path: key,
          oldValue: oldFlat[key],
          newValue: newFlat[key],
        });
      }
    }
  });

  return { added, removed, modified };
}
