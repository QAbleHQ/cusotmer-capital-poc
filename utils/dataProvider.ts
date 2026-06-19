
const PRODUCT = process.env.PROJECT?.split('-')[0]?.toLowerCase() || 'tripstacc';

let testData: any;

try {
  testData = require(`../testdata/${PRODUCT}.json`);
} catch {
  throw new Error(`❌ JSON not found for product: ${PRODUCT}`);
}
type ClientType = Exclude<keyof typeof testData, 'common'>;

const CLIENT = (process.env.CLIENT?.toUpperCase() || 'BOB') as ClientType;

// ✅ deep merge (no change)
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

// ✅ final data
export const Data = deepMerge(
  testData.common,
  testData[CLIENT]
);