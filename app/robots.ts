import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/instructor/*',
          '/api/*',
          '/payment/success*',
          '/payment/cancel*',
          '/auth-test',
          '/test-*',
          '/button-test',
          '/mobile-demo',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/instructor/*',
          '/api/*',
          '/payment/success*',
          '/payment/cancel*',
          '/auth-test',
          '/test-*',
          '/button-test',
          '/mobile-demo',
        ],
      },
    ],
    sitemap: 'https://www.elira.hu/sitemap.xml',
  };
}
