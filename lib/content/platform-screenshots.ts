/**
 * Platform Screenshots Data
 * Visual proof of platform interface
 *
 * Note: Using placeholder paths - replace with actual screenshots when available
 */

export interface PlatformScreenshot {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  alt: string;
}

export const platformScreenshots: PlatformScreenshot[] = [
  {
    id: 'dashboard',
    title: 'Tiszta dashboard',
    description: 'Minden kurzus, sablon és eszköz egy helyen',
    imagePath: '/platform/dashboard.png', // Placeholder
    alt: 'Elira platform dashboard nézet'
  },
  {
    id: 'module',
    title: 'Moduláris tanulás',
    description: 'Rövid, lényegre törő modulok saját tempóban',
    imagePath: '/platform/module-view.png', // Placeholder
    alt: 'Kurzus modul felület'
  },
  {
    id: 'templates',
    title: 'Letölthető sablonok',
    description: 'Egy kattintással letölthető, kitölthető eszközök',
    imagePath: '/platform/templates.png', // Placeholder
    alt: 'Sablon letöltési felület'
  }
];

export const featureBadges = [
  {
    icon: 'mobile',
    label: 'Mobilon is tökéletes'
  },
  {
    icon: 'download',
    label: 'Offline letöltés'
  },
  {
    icon: 'template',
    label: 'Sablonok egy kattintással'
  }
];
