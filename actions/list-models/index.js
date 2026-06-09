/**
 * list_models handler
 * 
 * Retrieves the full range of Dacia vehicle models currently available, returning an array 
 * of models with name, starting price, category, and availability information.
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    "name": "Bigster",
    "description": "Spacious hybrid SUV with GPL engine, 4x4 and automatic transmission.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Bigster%20GPL.jpg.ximg.large.webp/e6921f98ca.webp",
    "price": "from 22,890 EUR",
    "category": "SUV"
  },
  {
    "name": "Duster",
    "description": "Versatile SUV available in hybrid and GPL versions with optional 4x4.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Duster%20GPL.jpg.ximg.large.webp/589927f26b.webp",
    "price": "from 19,100 EUR",
    "category": "SUV"
  },
  {
    "name": "Logan",
    "description": "Affordable sedan with economical GPL engine and modern connectivity.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.large.webp/7d9c1a07d2.webp",
    "price": "from 14,650 EUR",
    "category": "Sedan"
  },
  {
    "name": "Sandero Stepway",
    "description": "Compact crossover with raised ride height and robust styling.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Stepway%20GPL.jpg.ximg.large.webp/7b6547eeb1.webp",
    "price": "from 15,650 EUR",
    "category": "Crossover"
  },
  {
    "name": "Jogger",
    "description": "7-seat family vehicle available in full hybrid and GPL versions.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Jogger-GPL.jpg.ximg.large.webp/7292573e4a.webp",
    "price": "from 18,650 EUR",
    "category": "Family"
  },
  {
    "name": "Sandero",
    "description": "Economical city car with GPL engine and modern multimedia.",
    "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Sandero-GPL.jpg.ximg.large.webp/c46a2d5762.webp",
    "price": "from 15,450 EUR",
    "category": "City car"
  }
];

module.exports = async ({ category = '' }) => {
  // Filter by category if provided
  let results = MOCK_DATA;
  
  if (category && typeof category === 'string' && category.trim()) {
    const categoryFilter = category.trim();
    results = MOCK_DATA.filter(model => model.category === categoryFilter);
  }

  const contentText = category && category.trim()
    ? `Found ${results.length} Dacia model${results.length !== 1 ? 's' : ''} in the ${category} category.`
    : `Found ${results.length} Dacia models available.`;

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.models — bare array outputSchema; key derived from actionName "list_models"
    structuredContent: {
      models: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/models?category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Dacia website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/models`);
 *   if (category) url.searchParams.append('category', category);
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
