# T3x Shift — Uber

**MT ECO SYSTEM**  
Developed by **Futuret3ch**, **T3x** and **MemeTorrent**.

Cloned from [driver-panda](https://github.com/Futuret3chdev/driver-panda) for Uber-only trial.

Live trial intended for Uber Driver API (limited access / developer account).

**Client ID:** `iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q`

**Not affiliated with Uber.**

## Setup for Uber API (trial)

1. In the Uber Developer Dashboard for this app, set a Redirect URI to your Vercel URL + `/api/auth/callback` (e.g. `https://driver-uber.vercel.app/api/auth/callback`).
2. Select scopes: `partner.accounts`, `partner.trips`, `partner.payments` (available for the developer account in limited access).
3. Set environment variables on Vercel:
   - `UBER_CLIENT_ID=iQoNkfoy4lmb5NDMavqhL28aqC9gJH-q`
   - `UBER_CLIENT_SECRET=<your-client-secret>`
   - `UBER_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback`

Access Token TTL is 30 days as configured.

## What it does

- Focused on Uber only for trial
- Go live opens the Uber Driver app
- Optional OAuth to pull profile / trips / payments when authorized (developer account)
- GPS drive listener, trip log, earnings summary (same as original)
- Local storage for offline use

## Local

```bash
npm install
npm run dev
```

## Stack

Vite PWA + Vercel serverless functions.
