export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({ success: false, error: 'Missing startDate or endDate' });
  }

  const BEDS24_TOKEN = 'PsJikzvTCNtknwTQt4eFFueJKMA/71vezOPM0kSmxl7ZgGwUMEAwDF0RIryBdmSSWb41A7tM4DkVaYxFv2bAAaAvZzrpI9siKJvH9YV0WNf8PwbY+0tRfg6xF11UszG8e/23Hd5m80kJQxLNgCdMUFI/WN3lTLR6FVzk/3srSf4=';
  const PROPERTY_ID = '279646';

  try {
    const response = await fetch(
      `https://beds24.com/api/v2/inventory/rooms/availability?propertyId=${PROPERTY_ID}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: { 'token': BEDS24_TOKEN }
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
