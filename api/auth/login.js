// Redirect to Uber OAuth authorize for Driver API (trial / limited access / test only)
// Client ID hard-coded for this test app (Dasher / hybrid trial on developer.uber.com)
const UBER_CLIENT_ID = 'iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q';

export default function handler(req, res) {
  const clientId = process.env.UBER_CLIENT_ID || UBER_CLIENT_ID;
  const redirectUri = process.env.UBER_REDIRECT_URI || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/callback`;
  const scopes = 'partner.accounts partner.trips partner.payments';
  const authUrl = `https://auth.uber.com/oauth/v2/authorize?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authUrl);
}
