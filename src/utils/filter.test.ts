import { filterJSON } from './filter';

describe('Filter Engine', () => {
  const testData = {
    users: [
      { name: 'Alice', age: 30, active: true },
      { name: 'Bob', age: 25, active: false },
    ],
    settings: {
      theme: 'dark',
      version: 2,
    },
  };

  it('should filter by key pattern', () => {
    const result = filterJSON(testData, { keyPattern: 'name' });
    expect(result).toEqual({
      users: [
        { name: 'Alice' },
        { name: 'Bob' },
      ],
    });
  });

  it('should filter by value pattern', () => {
    const result = filterJSON(testData, { valuePattern: 'dark' });
    // Value filter keeps parent context when a descendant matches
    // The users array is kept because filter preserves structure for non-matching branches that have descendants
    expect(result).toEqual({
      settings: {
        theme: 'dark',
        version: 2,
      },
      users: [
        { name: 'Alice', age: 30, active: true },
        { name: 'Bob', age: 25, active: false },
      ],
    });
  });

  it('should filter by type', () => {
    const result = filterJSON(testData, { typeFilter: ['boolean'] });
    expect(result).toEqual({
      users: [
        { active: true },
        { active: false },
      ],
    });
  });

  it('should combine filters', () => {
    const result = filterJSON(testData, {
      keyPattern: 'age',
      typeFilter: ['number'],
    });
    expect(result).toEqual({
      users: [
        { age: 30 },
        { age: 25 },
      ],
    });
  });
});
