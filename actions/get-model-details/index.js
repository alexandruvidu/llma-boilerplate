/**
 * get_model_details
 * Retrieves detailed specifications and features for a single Dacia model by name.
 */

const MOCK_DATA = [
  {
    name: 'Bigster',
    description: 'Spacious hybrid SUV with GPL engine, 4x4 and automatic transmission.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Bigster%20GPL.jpg.ximg.large.webp/e6921f98ca.webp',
    price: 'from 22,890 EUR',
    category: 'SUV'
  },
  {
    name: 'Duster',
    description: 'Versatile SUV available in hybrid and GPL versions with optional 4x4.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Duster%20GPL.jpg.ximg.large.webp/589927f26b.webp',
    price: 'from 19,100 EUR',
    category: 'SUV'
  },
  {
    name: 'Logan',
    description: 'Affordable sedan with economical GPL engine and modern connectivity.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.large.webp/7d9c1a07d2.webp',
    price: 'from 14,650 EUR',
    category: 'Sedan'
  },
  {
    name: 'Sandero Stepway',
    description: 'Compact crossover with raised ride height and robust styling.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Stepway%20GPL.jpg.ximg.large.webp/7b6547eeb1.webp',
    price: 'from 15,650 EUR',
    category: 'Crossover'
  },
  {
    name: 'Jogger',
    description: '7-seat family vehicle available in full hybrid and GPL versions.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Jogger-GPL.jpg.ximg.large.webp/7292573e4a.webp',
    price: 'from 18,650 EUR',
    category: 'Family'
  },
  {
    name: 'Sandero',
    description: 'Economical city car with GPL engine and modern multimedia.',
    image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Sandero-GPL.jpg.ximg.large.webp/c46a2d5762.webp',
    price: 'from 15,450 EUR',
    category: 'City car'
  }
]

module.exports = async ({ model_name = '' }) => {
  if (!model_name || typeof model_name !== 'string' || !model_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a model_name to retrieve details.' }],
      structuredContent: { model: null }
    }
  }

  const query = model_name.trim()
  const model = MOCK_DATA.find(m => m.name.toLowerCase() === query.toLowerCase())

  if (!model) {
    return {
      content: [{ type: 'text', text: `No model found with the name: ${model_name}` }],
      structuredContent: { model: null }
    }
  }

  return {
    content: [{
      type: 'text',
      text: `${model.name}: ${model.description} Starting at ${model.price}.`
    }],
    // structuredContent.model — product-detail concept; key derived from actionName "get_model_details"
    structuredContent: { model }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Dacia API):
 *   GET ${process.env.API_BASE_URL}/models/${encodeURIComponent(model_name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Dacia API (e.g. https://api.dacia.com)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Dacia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/models/${encodeURIComponent(model_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
