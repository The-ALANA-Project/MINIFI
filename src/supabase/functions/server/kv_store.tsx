/* MOCK KEY-VALUE STORE - NO DATABASE DEPENDENCIES */

// This file provides a mock key-value interface for demo purposes
// In a real application, this would connect to a database

const mockStore = new Map<string, any>();

// Set stores a key-value pair in memory (mock implementation)
export const set = async (key: string, value: any): Promise<void> => {
  mockStore.set(key, value);
};

// Get retrieves a key-value pair from memory (mock implementation)
export const get = async (key: string): Promise<any> => {
  return mockStore.get(key);
};

// Delete deletes a key-value pair from memory (mock implementation)
export const del = async (key: string): Promise<void> => {
  mockStore.delete(key);
};

// Sets multiple key-value pairs in memory (mock implementation)
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  keys.forEach((key, index) => {
    if (index < values.length) {
      mockStore.set(key, values[index]);
    }
  });
};

// Gets multiple key-value pairs from memory (mock implementation)
export const mget = async (keys: string[]): Promise<any[]> => {
  return keys.map(key => mockStore.get(key));
};

// Deletes multiple key-value pairs from memory (mock implementation)
export const mdel = async (keys: string[]): Promise<void> => {
  keys.forEach(key => mockStore.delete(key));
};

// Search for key-value pairs by prefix (mock implementation)
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const results: any[] = [];
  for (const [key, value] of mockStore.entries()) {
    if (key.startsWith(prefix)) {
      results.push(value);
    }
  }
  return results;
};