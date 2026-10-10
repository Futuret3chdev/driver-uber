// Redirect to Uber OAuth (TEST ONLY — hard-coded Client ID and Redirect URI)
const UBER_CLIENT_ID = 'iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q';
const REDIRECT_URI = 'https://driver-uber-green.vercel.app/api/auth/callback';

export default function handler(req, res) {
  const clientId = UBER_CLIENT_ID;
  const redirectUri = REDIRECT_URI;
  const scopes = 'partner.accounts partner.trips partner.payments';
  const authUrl = `https://auth.uber.com/oauth/v2/authorize?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authUrl);
}
