const handler = require('../../actions/list-models/index.js');

describe('list_models handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({});
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.models contains vehicle data', async () => {
    const out = await handler({});
    expect(out.structuredContent).toHaveProperty('models');
    expect(Array.isArray(out.structuredContent.models)).toBe(true);
    expect(out.structuredContent.models.length).toBeGreaterThan(0);
    expect(out.structuredContent.models[0]).toMatchObject({
      name: expect.any(String),
      price: expect.any(String),
      category: expect.any(String)
    });
  });

  test('"Show me some cars" returns all available models', async () => {
    const out = await handler({});
    expect(out.structuredContent.models.length).toBe(6);
    expect(out.content[0].text).toMatch(/6 Dacia models/i);
  });

  test('filters by category when provided', async () => {
    const out = await handler({ category: 'SUV' });
    const models = out.structuredContent.models;
    expect(models.length).toBe(2);
    expect(models.every(m => m.category === 'SUV')).toBe(true);
    expect(out.content[0].text).toMatch(/2 Dacia models in the SUV category/i);
  });

  test('returns empty array when category has no matches', async () => {
    const out = await handler({ category: 'Electric' });
    const models = out.structuredContent.models;
    expect(models.length).toBe(0);
    expect(out.content[0].text).toMatch(/0 Dacia models in the Electric category/i);
  });

  test('returns all models when category is empty string', async () => {
    const out = await handler({ category: '' });
    expect(out.structuredContent.models.length).toBe(6);
  });

  test('category filter is case-sensitive', async () => {
    const out = await handler({ category: 'suv' });
    expect(out.structuredContent.models.length).toBe(0);
  });
});
