// Exchange code for access token (TEST ONLY — hard-coded credentials for trial)
// WARNING: Do not use this approach in production. Secret is intentionally not hard-coded because the value was never provided in chat.

const UBER_CLIENT_ID = 'iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q';
// Client Secret was not included in any message. Paste it here only for a private test if you want:
// const UBER_CLIENT_SECRET = 'PASTE_SECRET_HERE_FOR_TEST';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'missing code' });

  const clientId = UBER_CLIENT_ID;
  const clientSecret = process.env.UBER_CLIENT_SECRET; // still prefer env; hardcode only if you paste the real value above
  const redirectUri = process.env.UBER_REDIRECT_URI || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/callback`;

  if (!clientSecret) {
    return res.status(500).json({
      error: 'Client Secret missing',
      note: 'The actual Client Secret string was never pasted in the conversation. Add it as UBER_CLIENT_SECRET env var or hard-code it in this file for the test (private repo only).'
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

    const returnUrl = `/?uber_token=${encodeURIComponent(data.access_token || '')}&expires=${data.expires_in || 2592000}`;
    res.redirect(returnUrl);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
