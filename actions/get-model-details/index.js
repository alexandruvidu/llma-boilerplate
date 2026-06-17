// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    name: 'Dacia Bigster',
    description: 'The new SUV with hybrid engine options and robust design for adventure.',
    image_url: 'https://cdn.group.renault.com/ren/ro/transversal-assets/dealer-locator/Dacia-new-logo.png',
    price: 'de la €20,490',
    category: 'SUV',
    engine_options: ['Hybrid', 'Petrol'],
    key_features: ['7 seats', 'All-wheel drive', 'Advanced safety systems']
  },
  {
    name: 'Dacia Duster',
    description: 'Versatile SUV with rugged capability and modern technology.',
    image_url: 'https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/duster-3/product-page/duster-3-main-desktop.jpg',
    price: 'de la €17,100',
    category: 'SUV',
    engine_options: ['Petrol', 'Diesel'],
    key_features: ['4x4 capability', 'Modern infotainment', 'Hill descent control']
  },
  {
    name: 'Dacia Logan',
    description: 'Spacious sedan offering exceptional value and comfort for daily commuting.',
    image_url: 'https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/logan-3/product-page/logan-3-main-desktop.jpg',
    price: 'de la €12,741',
    category: 'Sedan',
    engine_options: ['Petrol'],
    key_features: ['Large boot space', 'Fuel efficient', 'Comfortable interior']
  },
  {
    name: 'Dacia Sandero Stepway',
    description: 'Urban crossover combining style with practical versatility.',
    image_url: 'https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/sandero-stepway-3/product-page/sandero-stepway-3-main-desktop.jpg',
    price: 'de la €13,741',
    category: 'Crossover',
    engine_options: ['Petrol', 'LPG'],
    key_features: ['Raised ground clearance', 'Roof bars', 'All-season tires']
  },
  {
    name: 'Dacia Jogger',
    description: 'Family-oriented vehicle with up to 7 seats and hybrid powertrain options.',
    image_url: 'https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/jogger/product-page/jogger-main-desktop.jpg',
    price: 'de la €16,741',
    category: 'Family',
    engine_options: ['Hybrid', 'Petrol', 'LPG'],
    key_features: ['7-seater configuration', 'Modular interior', 'Hybrid efficiency']
  },
  {
    name: 'Dacia Spring',
    description: 'Compact electric city car with zero emissions and affordable pricing.',
    image_url: 'https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/spring-2/product-page/spring-2-main-desktop.jpg',
    price: '',
    category: 'Electric',
    engine_options: ['Electric'],
    key_features: ['Zero emissions', 'City-friendly size', 'Low running costs']
  }
];

module.exports = async ({ model_name = '' }) => {
  // Validate required parameter
  if (!model_name || typeof model_name !== 'string' || !model_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a model_name to retrieve details.' }]
    };
  }

  const query = model_name.trim();

  // Look up the model by name (case-insensitive)
  const item = MOCK_DATA.find(m => m.name.toLowerCase() === query.toLowerCase());

  if (!item) {
    return {
      content: [{ type: 'text', text: `No model found matching: ${model_name}` }]
    };
  }

  // Build content text with key details
  const engineText = item.engine_options && item.engine_options.length > 0
    ? ` Engine options: ${item.engine_options.join(', ')}.`
    : '';
  const priceText = item.price ? ` Starting price: ${item.price}.` : '';

  return {
    content: [{
      type: 'text',
      text: `${item.name}: ${item.description}${priceText}${engineText}`
    }],
    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    structuredContent: {
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      engine_options: item.engine_options || [],
      key_features: item.key_features || [],
      image_url: item.image_url
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Dacia API):
 *   GET ${process.env.API_BASE_URL}/models/${encodeURIComponent(model_name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Dacia API (e.g., https://api.dacia.com)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/models/${encodeURIComponent(model_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) {
 *     if (res.status === 404) {
 *       return {
 *         content: [{ type: 'text', text: `No model found matching: ${model_name}` }]
 *       };
 *     }
 *     throw new Error(`API error: ${res.status}`);
 *   }
 *   const data = await res.json();
 *   return {
 *     content: [{ type: 'text', text: `${data.name}: ${data.description}` }],
 *     structuredContent: { ...data }
 *   };
 */