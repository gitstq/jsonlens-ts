import { parseJSON, buildTree, calculateStats, flattenObject, detectType } from './parser';
import { JSONNode } from '../types';

describe('Parser Utilities', () => {
  describe('detectType', () => {
    it('should detect null', () => {
      expect(detectType(null)).toBe('null');
    });

    it('should detect array', () => {
      expect(detectType([1, 2, 3])).toBe('array');
    });

    it('should detect object', () => {
      expect(detectType({})).toBe('object');
    });

    it('should detect string', () => {
      expect(detectType('hello')).toBe('string');
    });

    it('should detect number', () => {
      expect(detectType(42)).toBe('number');
    });

    it('should detect boolean', () => {
      expect(detectType(true)).toBe('boolean');
    });
  });

  describe('parseJSON', () => {
    it('should parse valid JSON', () => {
      const result = parseJSON('{"name": "test"}');
      expect(result).toEqual({ name: 'test' });
    });

    it('should throw on invalid JSON', () => {
      expect(() => parseJSON('invalid')).toThrow('Invalid JSON');
    });
  });

  describe('buildTree', () => {
    it('should build tree from simple object', () => {
      const data = { name: 'test', value: 42 };
      const tree = buildTree(data);

      expect(tree.type).toBe('object');
      expect(tree.children).toHaveLength(2);
      expect(tree.children?.[0].key).toBe('name');
      expect(tree.children?.[1].key).toBe('value');
    });

    it('should build tree from nested object', () => {
      const data = { user: { name: 'John', age: 30 } };
      const tree = buildTree(data);

      expect(tree.children?.[0].type).toBe('object');
      expect(tree.children?.[0].children).toHaveLength(2);
    });

    it('should build tree from array', () => {
      const data = [1, 2, 3];
      const tree = buildTree(data);

      expect(tree.type).toBe('array');
      expect(tree.children).toHaveLength(3);
    });
  });

  describe('calculateStats', () => {
    it('should calculate stats correctly', () => {
      const data = {
        name: 'test',
        items: [1, 2, 3],
        nested: { value: true },
      };
      const stats = calculateStats(data);

      expect(stats.totalKeys).toBe(4);
      expect(stats.objectCount).toBe(2);
      expect(stats.arrayCount).toBe(1);
      expect(stats.typeDistribution.string).toBe(1);
      expect(stats.typeDistribution.number).toBe(3);
      expect(stats.typeDistribution.boolean).toBe(1);
    });
  });

  describe('flattenObject', () => {
    it('should flatten nested object', () => {
      const data = { user: { name: 'John', age: 30 } };
      const flat = flattenObject(data);

      expect(flat).toEqual({
        'user.name': 'John',
        'user.age': 30,
      });
    });

    it('should flatten arrays', () => {
      const data = { items: ['a', 'b'] };
      const flat = flattenObject(data);

      expect(flat).toEqual({
        'items[0]': 'a',
        'items[1]': 'b',
      });
    });
  });
});
