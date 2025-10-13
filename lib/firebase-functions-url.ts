/**
 * Firebase Functions URL Configuration
 *
 * Provides a centralized way to get the Firebase Functions URL.
 * Fails explicitly if the environment variable is not configured,
 * preventing accidental use of staging/dev URLs in production.
 */

export function getFirebaseFunctionsUrl(): string {
  const url = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL;

  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL is not configured. ' +
      'Please set this environment variable in your Vercel dashboard or .env file.'
    );
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    throw new Error(
      `Invalid NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL: "${url}". Must be a valid URL.`
    );
  }

  return url;
}

/**
 * Get Firebase Functions API endpoint
 * @param path - API path (e.g., "/api/payment/webhook")
 * @returns Full URL to the Firebase Functions endpoint
 */
export function getFirebaseFunctionsApiUrl(path: string): string {
  const baseUrl = getFirebaseFunctionsUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
