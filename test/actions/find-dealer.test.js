const handler = require('../../actions/find-dealer/index.js');

describe('find_dealer handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ city: 'București' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ city: 'Cluj' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.dealers is an array', async () => {
    const out = await handler({ city: 'Cluj' });
    expect(Array.isArray(out.structuredContent.dealers)).toBe(true);
  });

  test('returns error message when required arg is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/city|provide/i);
    expect(out.structuredContent.dealers).toEqual([]);
  });

  test('"Find a Dacia dealer near me" returns dealer locations', async () => {
    const out = await handler({ city: 'București' });
    expect(out.structuredContent.dealers.length).toBeGreaterThan(0);
    expect(out.structuredContent.dealers[0]).toHaveProperty('name');
    expect(out.structuredContent.dealers[0]).toHaveProperty('address');
    expect(out.structuredContent.dealers[0]).toHaveProperty('phone');
  });

  test('filters dealers by city match', async () => {
    const out = await handler({ city: 'Cluj' });
    const dealers = out.structuredContent.dealers;
    expect(dealers.length).toBeGreaterThan(0);
    expect(dealers.every(d => d.address.includes('Cluj') || d.name.includes('Cluj'))).toBe(true);
  });

  test('returns empty results for unknown city', async () => {
    const out = await handler({ city: 'UnknownCityXYZ' });
    expect(out.structuredContent.dealers).toEqual([]);
    expect(out.content[0].text).toMatch(/no.*dealer.*found/i);
  });

  test('handles case-insensitive city search', async () => {
    const outLower = await handler({ city: 'bucurești' });
    const outUpper = await handler({ city: 'BUCUREȘTI' });
    expect(outLower.structuredContent.dealers.length).toBe(outUpper.structuredContent.dealers.length);
  });
});
