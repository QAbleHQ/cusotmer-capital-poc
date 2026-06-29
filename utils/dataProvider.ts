const PRODUCT =
  process.env.PROJECT?.split('-')[0]?.toLowerCase() || 'tripstacc';

// Map lowercase product name to actual camelCase filename
const PATH_MAP: Record<string, string> = {
  tripstacc: '../TripStacc/testData/tripStacc.json',
  shopstacc: '../ShopStacc/testData/shopStacc.json',
};

let testData: any;

try {
  const dataPath = PATH_MAP[PRODUCT];
  if (!dataPath) throw new Error();
  testData = require(dataPath);
} catch {
  throw new Error(`❌ JSON not found for product: ${PRODUCT}`);
}

// ✅ Normalize client name (case-insensitive match)
const RAW_CLIENT = process.env.CLIENT || 'BOB';

// ✅ Find matching key dynamically (important for future clients)
const CLIENT_KEY = Object.keys(testData).find(
  (key) => key.toLowerCase() === RAW_CLIENT.toLowerCase()
);

if (!CLIENT_KEY || CLIENT_KEY === 'common') {
  throw new Error(
    `❌ Invalid CLIENT: "${RAW_CLIENT}". Available: ${Object.keys(testData)
      .filter((k) => k !== 'common')
      .join(', ')}`
  );
}

// ✅ Deep merge utility
function deepMerge(target: any, source: any): any {
  const output = { ...target };

  if (source) {
    Object.keys(source).forEach((key) => {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

// ✅ Final unified data
export const Data = deepMerge(
  testData.common || {},
  testData[CLIENT_KEY] || {}
);