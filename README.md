# T3x Shift — Uber (Test / Trial)

**MT ECO SYSTEM**  
Developed by **Futuret3ch**, **T3x** and **MemeTorrent**.

Cloned from [driver-panda](https://github.com/Futuret3chdev/driver-panda) for Uber-only trial.

**Test Client ID (hard-coded in auth endpoints):** `iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q`

Uber Developer Dashboard app (named without "Uber" substring, created 24/9/2026).

**Not affiliated with Uber.**

## Setup for Uber API (test only)

1. In the Uber Developer Dashboard, add Redirect URI: `https://YOUR_VERCEL_DOMAIN/api/auth/callback`
2. Scopes for limited access (developer account): `partner.accounts`, `partner.trips`, `partner.payments`
3. Set **only** this environment variable on Vercel (or .env.local):
   - `UBER_CLIENT_SECRET=<paste the Client Secret from the dashboard here>`
   
   Client ID is already hard-coded for this test. Access Token TTL = 30 days.

The actual Client Secret string was not included in the chat messages — only the metadata. Paste it into the env var.

## What it does

- Uber-only for this trial
- Go live opens the Uber Driver app
- OAuth login/callback for pulling profile/trips/payments (developer account only in limited access)
- GPS drive listener, trip log, earnings summary
- Local storage

## Local

```bash
npm install
npm run dev
```

## Stack

Vite PWA + Vercel serverless functions.
