const handler = require('../../actions/find-dealer/index.js')

describe('find_dealer handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ city: 'București' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ city: 'Cluj' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.dealers is an array', async () => {
    const out = await handler({ city: 'București' })
    expect(Array.isArray(out.structuredContent.dealers)).toBe(true)
    expect(out.structuredContent.dealers.length).toBeGreaterThan(0)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/city|provide/i)
    expect(out.structuredContent.dealers).toEqual([])
  })

  test('returns error message when city is empty string', async () => {
    const out = await handler({ city: '   ' })
    expect(out.content[0].text).toMatch(/city|provide/i)
    expect(out.structuredContent.dealers).toEqual([])
  })

  test('"Find a dealer near me" returns dealers for București', async () => {
    const out = await handler({ city: 'București' })
    expect(out.structuredContent.dealers.length).toBeGreaterThan(0)
    expect(out.content[0].text).toMatch(/Found \d+ Dacia dealer/i)
  })

  test('filters dealers by city (Cluj)', async () => {
    const out = await handler({ city: 'Cluj' })
    const dealers = out.structuredContent.dealers
    expect(dealers.length).toBeGreaterThan(0)
    expect(dealers.every(d => d.address.toLowerCase().includes('cluj'))).toBe(true)
  })

  test('returns empty array and no-results message for unknown city', async () => {
    const out = await handler({ city: 'Constanța' })
    expect(out.structuredContent.dealers).toEqual([])
    expect(out.content[0].text).toMatch(/No Dacia dealers found/i)
  })

  test('dealer items have correct shape', async () => {
    const out = await handler({ city: 'București' })
    const dealer = out.structuredContent.dealers[0]
    expect(dealer).toHaveProperty('name')
    expect(dealer).toHaveProperty('address')
    expect(dealer).toHaveProperty('phone')
    expect(dealer).toHaveProperty('services')
    expect(typeof dealer.name).toBe('string')
    expect(typeof dealer.address).toBe('string')
    expect(typeof dealer.phone).toBe('string')
    expect(typeof dealer.services).toBe('string')
  })
})
