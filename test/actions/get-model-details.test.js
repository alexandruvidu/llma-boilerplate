const handler = require('../../actions/get-model-details/index.js')

describe('get_model_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ model_name: 'Bigster' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ model_name: 'Bigster' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/model_name|provide/i)
  })

  test('"Tell me more about the Bigster" returns Bigster model details', async () => {
    const out = await handler({ model_name: 'Bigster' })
    expect(out.structuredContent.model).not.toBeNull()
    expect(out.structuredContent.model.name).toBe('Bigster')
    expect(out.structuredContent.model.price).toBe('from 22,890 EUR')
    expect(out.structuredContent.model.category).toBe('SUV')
  })

  test('case-insensitive model name lookup', async () => {
    const out = await handler({ model_name: 'duster' })
    expect(out.structuredContent.model).not.toBeNull()
    expect(out.structuredContent.model.name).toBe('Duster')
  })

  test('returns null and error message for unknown model name', async () => {
    const out = await handler({ model_name: 'NonExistent' })
    expect(out.content[0].text).toMatch(/No model found/i)
    expect(out.structuredContent.model).toBeNull()
  })

  test('content text includes model name and description', async () => {
    const out = await handler({ model_name: 'Logan' })
    expect(out.content[0].text).toMatch(/Logan/i)
    expect(out.content[0].text).toMatch(/14,650 EUR/i)
  })
})
