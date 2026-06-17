/**
 * Tests for list_models MCP tool handler
 */

const listModels = require('../../actions/list-models/index.js');

describe('list_models', () => {
  test('returns all models when no category filter is provided', async () => {
    const result = await listModels({});

    expect(result).toHaveProperty('content');
    expect(result).toHaveProperty('structuredContent');
    expect(typeof result.content).toBe('string');
    expect(result.content).toContain('Found 6 models');

    // structuredContent must be an object with a models array
    expect(result.structuredContent).toBeInstanceOf(Object);
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(Array.isArray(result.structuredContent.models)).toBe(true);
    expect(result.structuredContent.models).toHaveLength(6);

    // Verify sample model structure
    const firstModel = result.structuredContent.models[0];
    expect(firstModel).toHaveProperty('name');
    expect(firstModel).toHaveProperty('category');
    expect(firstModel).toHaveProperty('image_url');
  });

  test('filters models by category when provided', async () => {
    const result = await listModels({ category: 'SUV' });

    expect(result.structuredContent.models).toHaveLength(2);
    expect(result.content).toContain('Found 2 models in the SUV category');
    expect(result.structuredContent.models.every(m => m.category === 'SUV')).toBe(true);
  });

  test('returns empty result when category has no matches', async () => {
    const result = await listModels({ category: 'NonExistent' });

    expect(result.structuredContent.models).toHaveLength(0);
    expect(result.content).toContain('No models found in the NonExistent category');
  });

  test('handles single result correctly', async () => {
    const result = await listModels({ category: 'Sedan' });

    expect(result.structuredContent.models).toHaveLength(1);
    expect(result.content).toContain('Found 1 model in the Sedan category');
    expect(result.structuredContent.models[0].name).toBe('Dacia Logan');
  });
});
