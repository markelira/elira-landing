/**
 * Sample Blog Posts Data
 * Replace this with your actual content management system or MDX files
 */

import { Post } from '@/components/blog/PostCard';
import { Author } from '@/components/blog/AuthorBio';

export const sampleAuthors: Record<string, Author> = {
  'marton-marques': {
    name: 'Márton Márques',
    title: 'Marketing Stratégia Szakértő',
    bio: 'Több mint 10 éves tapasztalattal rendelkezem a digitális marketing területén. Segítek cégeknek adatvezérelt stratégiákat építeni és növekedést elérni.',
    linkedin: 'https://www.linkedin.com',
  },
  'eszter-kovacs': {
    name: 'Eszter Kovács',
    title: 'Growth Marketing Vezető',
    bio: 'A növekedési marketing szakértője vagyok, aki abban hisz, hogy minden adatban van egy történet. Segítek feltárni ezeket a történeteket és működő kampányokat építeni.',
  },
  'adam-nagy': {
    name: 'Ádám Nagy',
    title: 'Analytics & Data Scientist',
    bio: 'Adatelemzéssel és gépi tanulással foglalkozom, hogy prediktív modelleket építsek üzleti döntések támogatására.',
  },
  'gorgei-mark': {
    name: 'Görgei Márk',
    title: 'Founder of Elira',
    bio: 'Az Elira-nál teljes körű marketing és AI stratégiával segítünk vállalkozásoknak növelni értékesítésüket, automatizálni folyamataikat és versenyképesebbé válni a piacon.',
    avatar: '/MARK-blog.jpg',
  },
  'kovacs-aron': {
    name: 'Kovács Áron',
    title: 'Co-founder of Elira',
    bio: 'Az Elira társalapítójaként stratégiai marketing megoldásokkal és adatvezérelt kampányokkal támogatjuk a vállalkozásokat a növekedésben és a versenyképesség erősítésében.',
    avatar: '/ARON1.jpeg',
  },
};

export const samplePosts: Post[] = [
  {
    slug: 'ertekesites-noveles-ai-eszkozokkel',
    title: 'Hogyan növeld az értékesítést AI eszközökkel? – 5 Gyakorlati lépéssel',
    excerpt: 'A trendek azt mutatják, hogy az AI marketing eszközök alkalmazása ma még versenyelőnyt jelent, de néhány éven belül alapelvárás lesz a KKV-k számára is. Ezért érdemes minél előbb megismerkedni velük, hogy a vállalkozások ne maradjanak le a piaci versenyben.',
    category: 'Marketing',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-09-30',
    readTime: '7 perc olvasás',
    featuredImage: '/ai-marketing-blog.png',
    featured: false,
  },
  {
    slug: 'social-proof-es-ertekelesek-pszichologiaja',
    title: 'Social proof és értékelések pszichológiája: A magyar KKV-k versenyképességének kulcsa 2025-ben',
    excerpt: 'A digitális korszakban a vásárlói döntések alapja radikálisan megváltozott. Míg korábban a személyes ajánlások dominálták a döntéshozatalt, ma már a social proof és az online értékelések pszichológiai hatása határozza meg, hogy egy kis- vagy középvállalkozás sikeres lesz-e a magyar piacon.',
    category: 'Marketing',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-10-17',
    readTime: '7 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'marketing-strategia-keszitese-2025',
    title: 'Marketing stratégia készítése 2025-ben – Útmutató magyar KKV-knak',
    excerpt: 'Fedezd fel, hogyan építhetsz sikeres, adatvezérelt marketinget KKV-ként, a legújabb trendek és kutatások alapján!',
    category: 'Marketing',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-10-10',
    readTime: '8 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'hogyan-keszits-hatekonny-landing-page-t-ami-konvertal',
    title: 'Hogyan készíts hatékony landing page-t, ami konvertál? – Gyakorlati útmutató 2025-re',
    excerpt: 'A landing page egy olyan speciális weboldal, amelyet egyetlen, jól meghatározott cél érdekében hoznak létre – például vásárlásra ösztönöz, regisztrációra, vagy ajánlatkérésre.',
    category: 'Marketing',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-10-07',
    readTime: '6 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'fogyasztoi-bizalom-epitese-online-terben',
    title: 'A fogyasztói bizalom építése az online térben: Kulcs a magyar KKV-k sikeres növekedéséhez 2025-ben',
    excerpt: 'A digitális kereskedelem korában a fogyasztói bizalom nem pusztán "egy jó ha van" tényező – hanem a versenyképesség alapja.',
    category: 'Marketing',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-01-20',
    readTime: '5 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'tartalommarketing-kisvallalatoknak-2025',
    title: 'Tartalommarketing kisvállalkozásoknak 2025 – mit tanulhatunk a nagyoktól',
    excerpt: 'A magyar kisvállalkozások többsége még mindig azt gondolja, hogy a tartalommarketing csak a nagyvállalatok kiváltsága. Valójában azonban pont az ellenkezője igaz.',
    category: 'Marketing',
    author: sampleAuthors['kovacs-aron'],
    publishedAt: '2025-10-13',
    readTime: '5 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'vevopszichologia-alapjai-kisvallalkozasoknak',
    title: 'Vevőpszichológia alapjai kisvállalkozásoknak',
    excerpt: 'Vevőpszichológia kisvállalkozásoknak 2025-ben: hogyan értsd meg a vásárlók motivációit, és alkalmazd azonnal a gyakorlatban.',
    category: 'Marketing',
    author: sampleAuthors['kovacs-aron'],
    publishedAt: '2025-10-04',
    readTime: '6 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop',
    featured: true,
  },
  {
    slug: 'mesterseges-intelligencia-marketingben-2025',
    title: 'Mesterséges intelligencia a marketingben – 2025-ös trendek',
    excerpt: 'A mesterséges intelligencia már nem egy távoli jövő technológiája – 2025-ben a magyar kis- és középvállalkozások számára a versenyképesség alapfeltétele lett.',
    category: 'Marketing',
    author: sampleAuthors['kovacs-aron'],
    publishedAt: '2025-09-24',
    readTime: '4 perc olvasás',
    featuredImage: '/ai-marketing-blogposttt.png',
    featured: false,
  },
  {
    slug: 'hogyan-hasznald-ugyfeladatokat-etikus-modon',
    title: 'Hogyan használd az ügyféladatokat etikus módon a növekedéshez',
    excerpt: 'A digitális marketing és az adatvezérelt döntéshozatal kulcstényezővé vált a kis- és középvállalkozások versenyképességében. A McKinsey szerint a data-driven cégek 23-szor nagyobb eséllyel szereznek új vásárlókat, hatszor nagyobb arányban tartják meg őket, és 19-szer valószínűbb, hogy nyereségesek.',
    category: 'Strategy',
    author: sampleAuthors['gorgei-mark'],
    publishedAt: '2025-09-19',
    readTime: '8 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
    featured: false,
  },
  {
    slug: 'automatizalt-email-marketing-rendszerek-hatekonysaga-2025',
    title: 'Automatizált e‑mail marketing rendszerek hatékonysága 2025-ben: mit érdemes tudni KKV-ként?',
    excerpt: 'Automatizált e‑mail marketing rendszerek hatékonysága a magyar KKV-knak: ROI, benchmarkok, személyre szabás, AI marketing eszközök KKV-knak.',
    category: 'Marketing',
    author: sampleAuthors['kovacs-aron'],
    publishedAt: '2025-09-03',
    readTime: '9 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&h=800&fit=crop',
    featured: false,
  },
];

// Helper function to get posts by category
export function getPostsByCategory(category: string): Post[] {
  return samplePosts.filter(post => post.category === category);
}

// Helper function to get related posts (same category, excluding current)
export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): Post[] {
  return samplePosts
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, limit);
}

// Helper function to search posts
export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase();
  return samplePosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.category.toLowerCase().includes(lowerQuery)
  );
}

// Get all unique categories
export function getAllCategories(): string[] {
  return Array.from(new Set(samplePosts.map(post => post.category)));
}

// Category translations
export const categoryTranslations: Record<string, string> = {
  'Marketing': 'Marketing',
  'Strategy': 'Stratégia',
};

// Get translated category name
export function getCategoryTranslation(category: string): string {
  return categoryTranslations[category] || category;
}
