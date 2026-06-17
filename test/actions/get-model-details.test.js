const handler = require('../../actions/get-model-details/index.js');

describe('get_model_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ model_name: 'Dacia Bigster' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ model_name: 'Dacia Bigster' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('returns error message when required arg is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/model_name|provide/i);
  });

  test('"Tell me more about the Dacia Bigster" returns model details', async () => {
    const out = await handler({ model_name: 'Dacia Bigster' });
    expect(out.structuredContent).toHaveProperty('name', 'Dacia Bigster');
    expect(out.structuredContent).toHaveProperty('description');
    expect(out.structuredContent).toHaveProperty('price');
    expect(out.structuredContent).toHaveProperty('category', 'SUV');
    expect(Array.isArray(out.structuredContent.engine_options)).toBe(true);
    expect(Array.isArray(out.structuredContent.key_features)).toBe(true);
    expect(out.content[0].text).toContain('Dacia Bigster');
  });

  test('returns not found message for unknown model', async () => {
    const out = await handler({ model_name: 'Dacia Unknown' });
    expect(out.content[0].text).toMatch(/no model found/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('case-insensitive model name lookup', async () => {
    const out = await handler({ model_name: 'dacia duster' });
    expect(out.structuredContent).toHaveProperty('name', 'Dacia Duster');
    expect(out.structuredContent).toHaveProperty('category', 'SUV');
  });

  test('content includes price when available', async () => {
    const out = await handler({ model_name: 'Dacia Logan' });
    expect(out.content[0].text).toContain('de la €12,741');
  });

  test('content includes engine options', async () => {
    const out = await handler({ model_name: 'Dacia Jogger' });
    expect(out.content[0].text).toMatch(/Hybrid|Petrol|LPG/);
  });
});