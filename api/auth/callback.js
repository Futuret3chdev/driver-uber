// Exchange code for access token (test / trial only — do not use in production)
// Client ID hard-coded for this test app
const UBER_CLIENT_ID = 'iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'missing code' });

  const clientId = process.env.UBER_CLIENT_ID || UBER_CLIENT_ID;
  // Client Secret must still be set via env UBER_CLIENT_SECRET (never commit the real secret)
  const clientSecret = process.env.UBER_CLIENT_SECRET;
  const redirectUri = process.env.UBER_REDIRECT_URI || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/callback`;

  if (!clientSecret) {
    return res.status(500).json({
      error: 'UBER_CLIENT_SECRET not set',
      note: 'Set the Client Secret from the Uber dashboard as a Vercel environment variable for this test. The secret value was not provided in chat.'
    });
  }

  try {
    const tokenRes = await fetch('https://auth.uber.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code
      })
    });
    const data = await tokenRes.json();
    if (!tokenRes.ok) return res.status(400).json(data);

    // For trial/test: redirect back with token in query (in production use httpOnly cookie or session)
    const returnUrl = `/?uber_token=${encodeURIComponent(data.access_token || '')}&expires=${data.expires_in || 2592000}`;
    res.redirect(returnUrl);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
