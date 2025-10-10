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
    imagePath: '/dashboard.png',
    alt: 'Elira platform dashboard nézet'
  },
  {
    id: 'module',
    title: 'Moduláris tanulás',
    description: 'Rövid, lényegre törő modulok saját tempóban',
    imagePath: '/dashboard-new.png',
    alt: 'Kurzus modul felület'
  },
  {
    id: 'templates',
    title: 'Letölthető sablonok',
    description: 'Egy kattintással letölthető, kitölthető eszközök',
    imagePath: '/letoltheto-sablonok-3rd.png',
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
    label: 'Azonnal alkalmazható rendszerek'
  },
  {
    icon: 'template',
    label: 'Sablonok egy kattintással'
  }
];
