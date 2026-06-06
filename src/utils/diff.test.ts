import { diffJSON } from './diff';

describe('Diff Engine', () => {
  it('should detect added keys', () => {
    const oldData = { a: 1 };
    const newData = { a: 1, b: 2 };
    const result = diffJSON(oldData, newData);

    expect(result.added).toContain('b');
    expect(result.removed).toHaveLength(0);
    expect(result.modified).toHaveLength(0);
  });

  it('should detect removed keys', () => {
    const oldData = { a: 1, b: 2 };
    const newData = { a: 1 };
    const result = diffJSON(oldData, newData);

    expect(result.removed).toContain('b');
    expect(result.added).toHaveLength(0);
    expect(result.modified).toHaveLength(0);
  });

  it('should detect modified values', () => {
    const oldData = { a: 1 };
    const newData = { a: 2 };
    const result = diffJSON(oldData, newData);

    expect(result.modified).toHaveLength(1);
    expect(result.modified[0].path).toBe('a');
    expect(result.modified[0].oldValue).toBe(1);
    expect(result.modified[0].newValue).toBe(2);
  });

  it('should handle identical objects', () => {
    const data = { a: 1, b: { c: 2 } };
    const result = diffJSON(data, data);

    expect(result.added).toHaveLength(0);
    expect(result.removed).toHaveLength(0);
    expect(result.modified).toHaveLength(0);
  });
});
