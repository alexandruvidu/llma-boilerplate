/**
 * list_models MCP tool handler
 * Retrieves the complete lineup of vehicle models, optionally filtered by category.
 */

// Real scraped data from Action Planner — use verbatim as mock fixture
const MOCK_DATA = [
  {
    "name": "Dacia Bigster",
    "description": "The new SUV with hybrid engine options and robust design for adventure.",
    "image_url": "https://cdn.group.renault.com/ren/ro/transversal-assets/dealer-locator/Dacia-new-logo.png",
    "price": "de la €20,490",
    "category": "SUV"
  },
  {
    "name": "Dacia Duster",
    "description": "Versatile SUV with rugged capability and modern technology.",
    "image_url": "https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/duster-3/product-page/duster-3-main-desktop.jpg",
    "price": "de la €17,100",
    "category": "SUV"
  },
  {
    "name": "Dacia Logan",
    "description": "Spacious sedan offering exceptional value and comfort for daily commuting.",
    "image_url": "https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/logan-3/product-page/logan-3-main-desktop.jpg",
    "price": "de la €12,741",
    "category": "Sedan"
  },
  {
    "name": "Dacia Sandero Stepway",
    "description": "Urban crossover combining style with practical versatility.",
    "image_url": "https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/sandero-stepway-3/product-page/sandero-stepway-3-main-desktop.jpg",
    "price": "de la €13,741",
    "category": "Crossover"
  },
  {
    "name": "Dacia Jogger",
    "description": "Family-oriented vehicle with up to 7 seats and hybrid powertrain options.",
    "image_url": "https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/jogger/product-page/jogger-main-desktop.jpg",
    "price": "de la €16,741",
    "category": "Family"
  },
  {
    "name": "Dacia Spring",
    "description": "Compact electric city car with zero emissions and affordable pricing.",
    "image_url": "https://cdn.group.renault.com/content/dam/Dacia/master/brand-v5/vehicles/spring-2/product-page/spring-2-main-desktop.jpg",
    "price": "",
    "category": "Electric"
  }
];

module.exports = async (args = {}) => {
  const { category } = args;

  // TODO: Replace MOCK_DATA with real API call
  // const response = await fetch(`${process.env.API_BASE_URL}/models`, {
  //   method: 'GET',
  //   headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
  // });
  // const allModels = await response.json();

  let filtered = MOCK_DATA;

  // Apply category filter if provided
  if (category) {
    filtered = MOCK_DATA.filter(model => model.category === category);
  }

  // Build text summary for LLM
  const count = filtered.length;
  const categoryText = category ? ` in the ${category} category` : '';
  const modelNames = filtered.map(m => m.name).join(', ');

  const content = count === 0
    ? `No models found${categoryText}.`
    : `Found ${count} model${count === 1 ? '' : 's'}${categoryText}: ${modelNames}.`;

  // structuredContent.models — bare array outputSchema; key derived from actionName "list_models"
  return {
    content,
    structuredContent: {
      models: filtered
    }
  };
};
