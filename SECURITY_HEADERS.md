# Security Headers Reference

**Last Updated**: 2025-10-12
**File**: `middleware.ts`
**Purpose**: Documentation for HTTP security headers implemented in the application

---

## Overview

Security headers are HTTP response headers that instruct browsers to behave in specific ways to enhance security and protect against common web vulnerabilities.

**Security Score**: A+ (expected from [securityheaders.com](https://securityheaders.com))

---

## Headers Implemented

### 1. Content-Security-Policy (CSP)

**Purpose**: Prevents Cross-Site Scripting (XSS) and data injection attacks

**Configuration**:
```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline' [trusted CDNs]
style-src 'self' 'unsafe-inline' [Google Fonts]
img-src 'self' blob: data: https:
connect-src 'self' [Firebase, Stripe, Sentry, Mux, etc.]
```

**What it does**:
- Only allows loading resources from approved sources
- Blocks inline scripts except from trusted sources
- Prevents loading of malicious external resources
- Upgrades insecure requests to HTTPS

**Allowed Sources**:
- **Scripts**: Google Tag Manager, Stripe, Mux, Sentry, Vercel
- **Styles**: Google Fonts
- **Images**: All HTTPS sources (for user-uploaded content)
- **Fonts**: Google Fonts
- **Connections**: Firebase, Stripe, Sentry, Mux, Google Analytics

**Adjust if**:
- Adding new CDN: Add domain to `script-src` or `style-src`
- Using new API: Add domain to `connect-src`
- Embedding videos: Add domain to `frame-src`

---

### 2. X-Frame-Options

**Purpose**: Prevents clickjacking attacks

**Value**: `DENY`

**What it does**:
- Prevents the page from being embedded in `<iframe>`, `<frame>`, or `<object>`
- Protects against UI redress attacks

**Change to `SAMEORIGIN` if**:
- You need to embed your own pages in iframes (e.g., admin previews)

---

### 3. X-Content-Type-Options

**Purpose**: Prevents MIME type sniffing

**Value**: `nosniff`

**What it does**:
- Forces browsers to respect the declared `Content-Type`
- Prevents browsers from interpreting files as a different MIME type
- Protects against MIME confusion attacks

---

### 4. Referrer-Policy

**Purpose**: Controls how much referrer information is included with requests

**Value**: `strict-origin-when-cross-origin`

**What it does**:
- Sends full URL for same-origin requests
- Sends only origin (domain) for cross-origin requests
- Doesn't send referrer when downgrading from HTTPS to HTTP

**Protects**:
- User privacy (doesn't leak full URLs to third parties)
- Sensitive information in URLs (e.g., tokens, session IDs)

---

### 5. Permissions-Policy

**Purpose**: Controls which browser features can be used

**Value**:
```
camera=()
microphone=()
geolocation=(self)
payment=(self)
interest-cohort=()
usb=()
magnetometer=()
gyroscope=()
accelerometer=()
```

**What it does**:
- Disables camera and microphone access
- Allows geolocation only for same-origin
- Allows payment API for same-origin (Stripe)
- Opts out of FLoC (Federated Learning of Cohorts)

**Adjust if**:
- Adding video chat: Change `camera=(self)` and `microphone=(self)`
- Using device sensors: Enable specific sensors

---

### 6. Strict-Transport-Security (HSTS)

**Purpose**: Enforces HTTPS connections

**Value**: `max-age=31536000; includeSubDomains; preload`

**What it does**:
- Forces browsers to use HTTPS for 1 year (31536000 seconds)
- Applies to all subdomains
- Eligible for browser HSTS preload list

**Important**:
- Only enabled in production (not in local development)
- Once enabled, can't downgrade to HTTP for 1 year
- **Preload**: Submit to [hstspreload.org](https://hstspreload.org) for inclusion in browser preload lists

---

### 7. X-XSS-Protection

**Purpose**: Legacy XSS protection for older browsers

**Value**: `1; mode=block`

**What it does**:
- Enables browser's built-in XSS filter
- Blocks the page if XSS attack detected
- Legacy header (modern browsers rely on CSP)

---

### 8. X-DNS-Prefetch-Control

**Purpose**: Controls DNS prefetching

**Value**: `on`

**What it does**:
- Allows browsers to prefetch DNS for external links
- Improves performance by resolving DNS before user clicks
- Can be set to `off` for privacy-sensitive applications

---

### 9. Cross-Origin-Opener-Policy (COOP)

**Purpose**: Isolates browsing context

**Value**: `same-origin-allow-popups`

**What it does**:
- Isolates the page's browsing context
- Allows popups (needed for OAuth flows, Stripe checkout)
- Prevents cross-origin windows from accessing the page

---

### 10. Cross-Origin-Embedder-Policy (COEP)

**Purpose**: Controls cross-origin resource loading

**Value**: `credentialless`

**What it does**:
- Allows loading cross-origin resources without credentials
- More permissive than `require-corp`
- Enables SharedArrayBuffer and high-resolution timers

---

### 11. Cross-Origin-Resource-Policy (CORP)

**Purpose**: Controls how resources can be loaded cross-origin

**Value**: `same-site`

**What it does**:
- Allows resources to be loaded by same-site origins
- Prevents cross-origin resource leaks
- Protects against speculative execution attacks (Spectre)

---

### 12. X-Robots-Tag (Dynamic)

**Purpose**: Controls search engine indexing

**Value**: `noindex, nofollow, noarchive` (for `/dashboard` and `/admin`)

**What it does**:
- Prevents search engines from indexing sensitive pages
- Prevents following links on sensitive pages
- Prevents caching of sensitive pages

---

## Testing Security Headers

### 1. Online Scanners

**SecurityHeaders.com**:
```bash
# Test your deployment
https://securityheaders.com/?q=https://your-domain.com
```

**Mozilla Observatory**:
```bash
https://observatory.mozilla.org/analyze/your-domain.com
```

### 2. Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on the first request (usually the HTML document)
5. Check "Response Headers" section

### 3. Command Line

```bash
# Check headers with curl
curl -I https://your-domain.com

# Check specific header
curl -I https://your-domain.com | grep -i content-security-policy
```

---

## Common CSP Violations and Fixes

### Error: "Refused to load script"

**Cause**: Script source not allowed in CSP

**Fix**: Add the script's domain to `script-src`:
```typescript
script-src 'self' 'unsafe-inline' https://new-cdn.example.com
```

### Error: "Refused to connect"

**Cause**: API endpoint not allowed in CSP

**Fix**: Add the API domain to `connect-src`:
```typescript
connect-src 'self' https://api.example.com
```

### Error: "Refused to frame"

**Cause**: Iframe source not allowed in CSP

**Fix**: Add the iframe domain to `frame-src`:
```typescript
frame-src 'self' https://embeds.example.com
```

### Error: "Refused to load image"

**Cause**: Image source not allowed in CSP

**Fix**: Images from all HTTPS sources are already allowed. If error persists, check:
- Image URL is HTTPS (not HTTP)
- Image isn't a data URI (already allowed with `data:`)

---

## CSP Reporting (Optional)

To monitor CSP violations in production, add reporting:

```typescript
// middleware.ts
const cspHeader = `
  ... existing CSP ...
  report-uri https://your-domain.com/api/csp-report;
  report-to csp-endpoint;
`

response.headers.set('Report-To', JSON.stringify({
  group: 'csp-endpoint',
  max_age: 10886400,
  endpoints: [{ url: 'https://your-domain.com/api/csp-report' }],
}))
```

Create CSP report endpoint:
```typescript
// app/api/csp-report/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const report = await request.json()

  // Log to Sentry or your monitoring service
  console.error('CSP Violation:', report)

  return NextResponse.json({ received: true })
}
```

---

## Troubleshooting

### Development Issues

**Problem**: CSP blocking local resources

**Solution**: CSP already allows `localhost` and `127.0.0.1`. If still blocked:
```typescript
// Temporarily add in development only
if (process.env.NODE_ENV === 'development') {
  cspHeader += " script-src 'unsafe-eval'"
}
```

**Problem**: Hot reload not working

**Solution**: Ensure WebSocket connections are allowed:
```typescript
connect-src ... ws://localhost:* wss://localhost:*
```

### Production Issues

**Problem**: Third-party script blocked

**Check**:
1. Is the script from a trusted source?
2. Can you load it from your server instead?
3. If needed, add to `script-src` (but verify it's safe first)

**Problem**: HSTS certificate warning

**Cause**: HSTS preload with invalid/expired SSL certificate

**Solution**:
1. Ensure SSL certificate is valid
2. If migrating domains, wait for HSTS max-age to expire
3. Or submit to HSTS removal (can take months)

---

## Security Best Practices

### 1. Minimize `'unsafe-inline'`

**Current Status**: Used for styles (Tailwind, Framer Motion) and some scripts

**Goal**: Remove `'unsafe-inline'` for better security

**How**:
- Use nonces for inline scripts: `<script nonce="random-value">`
- Use hashes for inline styles
- Generate nonce in middleware and pass to components

### 2. Review CSP Regularly

**When to review**:
- After adding new third-party services
- After security audits
- Quarterly (at minimum)

**How to review**:
```bash
# Check production CSP
curl -I https://your-domain.com | grep -i content-security-policy

# Compare with documented policy
diff <(echo "$documented_csp") <(curl -s -I https://your-domain.com | grep -i content-security-policy)
```

### 3. Monitor CSP Violations

**Options**:
1. **Sentry**: Automatically captures CSP violations
2. **Custom endpoint**: Create `/api/csp-report` and log violations
3. **Google Analytics**: Track violations as events

### 4. Use Subresource Integrity (SRI)

For critical external scripts, add integrity hashes:

```html
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
></script>
```

Generate hash:
```bash
curl https://cdn.example.com/library.js | openssl dgst -sha384 -binary | openssl base64 -A
```

---

## Compliance

### GDPR

✅ **X-Robots-Tag**: Prevents indexing of user data
✅ **CSP**: Prevents unauthorized data leaks
✅ **Permissions-Policy**: Disables FLoC tracking

### PCI DSS

✅ **HSTS**: Enforces HTTPS for payment forms
✅ **CSP**: Prevents XSS on payment pages
✅ **X-Frame-Options**: Prevents clickjacking on payment pages

### OWASP Top 10

✅ **A03 Injection**: CSP prevents XSS
✅ **A05 Security Misconfiguration**: All headers properly configured
✅ **A07 XSS**: CSP, X-XSS-Protection
✅ **A08 Insecure Deserialization**: X-Content-Type-Options

---

## Maintenance Checklist

### Monthly
- [ ] Check SecurityHeaders.com score
- [ ] Review CSP violations in Sentry
- [ ] Verify HSTS max-age still appropriate

### Quarterly
- [ ] Review and update CSP allowed sources
- [ ] Test security headers on all environments
- [ ] Review permissions policy for new browser features

### Annually
- [ ] Security audit of all headers
- [ ] Update header values per latest OWASP recommendations
- [ ] Test with latest browser versions

---

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [SecurityHeaders.com](https://securityheaders.com)
- [HSTS Preload](https://hstspreload.org)

---

**Last Updated**: 2025-10-12
**Maintained by**: Development Team
**Related Docs**:
- `middleware.ts` - Implementation
- `DEPLOYMENT_CHECKLIST.md` - Deployment verification
- `SECURITY_AUDIT.md` - Security audit findings
