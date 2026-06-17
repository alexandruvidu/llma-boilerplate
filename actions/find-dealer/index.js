// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Dacia Bucharest Center',
    address: 'Bulevardul Unirii 45, București 030824, Romania',
    phone: '+40 21 123 4567',
    services: ['Sales', 'Service', 'Parts', 'Test Drive']
  },
  {
    name: 'Dacia Cluj-Napoca',
    address: 'Strada Observatorului 108, Cluj-Napoca 400363, Romania',
    phone: '+40 264 555 789',
    services: ['Sales', 'Service', 'Parts']
  },
  {
    name: 'Dacia Timișoara West',
    address: 'Calea Aradului 2, Timișoara 300645, Romania',
    phone: '+40 256 789 012',
    services: ['Sales', 'Service']
  },
  {
    name: 'Dacia Iași Nord',
    address: 'Șoseaua Națională 25B, Iași 700293, Romania',
    phone: '+40 232 456 123',
    services: ['Sales', 'Service', 'Parts']
  }
];

module.exports = async ({ city = '' }) => {
  // Validate required parameter
  if (!city || typeof city !== 'string' || !city.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a city name to search for nearby dealers.' }],
      // structuredContent.dealers — bare array outputSchema; key derived from actionName "find_dealer"
      structuredContent: { dealers: [] }
    };
  }

  const query = city.trim().toLowerCase();

  // Filter dealers by city/region match
  const results = MOCK_DATA.filter(dealer => {
    const addressLower = dealer.address.toLowerCase();
    const nameLower = dealer.name.toLowerCase();
    return addressLower.includes(query) || nameLower.includes(query);
  });

  // Build human-readable summary
  const contentText = results.length > 0
    ? `Found ${results.length} Dacia dealer${results.length !== 1 ? 's' : ''} near ${city}.`
    : `No Dacia dealers found near ${city}. Try a different city or region name.`;

  return {
    content: [{ type: 'text', text: contentText }],
    // structuredContent.dealers — bare array outputSchema; key derived from actionName "find_dealer"
    structuredContent: { dealers: results }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Dacia dealer API):
 *   GET ${process.env.API_BASE_URL}/dealers?city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Dacia API (e.g., https://api.dacia.ro)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Dacia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/dealers?city=${encodeURIComponent(city)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.dealers || data;
 */
