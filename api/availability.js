export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (!startDate || !endDate) {
    return new Response(JSON.stringify({ success: false, error: 'Missing startDate or endDate' }), { headers });
  }

  const BEDS24_TOKEN = 'PsJikzvTCNtknwTQt4eFFueJKMA/71vezOPM0kSmxl7ZgGwUMEAwDF0RIryBdmSSWb41A7tM4DkVaYxFv2bAAaAvZzrpI9siKJvH9YV0WNf8PwbY+0tRfg6xF11UszG8e/23Hd5m80kJQxLNgCdMUFI/WN3lTLR6FVzk/3srSf4=';
  const PROPERTY_ID = '279646';

  try {
    const response = await fetch(
      `https://beds24.com/api/v2/inventory/rooms/availability?propertyId=${PROPERTY_ID}&startDate=${startDate}&endDate=${endDate}`,
      { headers: { 'token': BEDS24_TOKEN } }
    );
    const data = await response.json();
    return new Response(JSON.stringify(data), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { headers });
  }
}
