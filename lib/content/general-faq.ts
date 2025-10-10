/**
 * General FAQ Data
 * Common questions before tier selection
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'differentiation' | 'guarantee' | 'flexibility' | 'support' | 'customization' | 'updates';
}

export const generalFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Mennyi idő alatt lehet elvégezni egy masterclasst?',
    answer: 'A videó tartalom 4-6 óra, de a teljes implementáció 30 napot vesz igénybe. Az első héten már lesz használható eredményed - kitöltöd az első sablonokat. A második héten alkalmazzuk, finomhangolunk. A harmadik héten dokumentálod a folyamatot. A 30. napra működő rendszered van, amit a csapatod is használhat.',
    category: 'basics'
  },
  {
    id: 'faq-2',
    question: 'Kapok tanúsítványt vagy akkreditációt?',
    answer: 'Nem adunk formális tanúsítványt - helyette működő rendszert és dokumentált folyamatokat kapsz. A végére konkrét kampánysablonjaval, buyer personákkal és implementált stratégiával rendelkezel, amit azonnal használhatsz. Ez többet ér mint egy papír - ez tényleg működik a cégedben.',
    category: 'basics'
  },
  {
    id: 'faq-3',
    question: 'Mi van ha nincs időm megcsinálni a feladatokat?',
    answer: 'Ezért van a Done-For-You (DFY) csomag - mi csináljuk helyetted. Ha az időd szűkös, de eredmény kell, válaszd a DFY-t: mi elkészítjük a kampányokat, sablonokat, folyamatokat, te csak átnézed és használod. A DWY (Done-With-You) csomagban közösen dolgozunk, de ott is te diktálod az ütemet.',
    category: 'flexibility'
  },
  {
    id: 'faq-4',
    question: 'Elérhető mobilon/tableten is?',
    answer: 'Igen, a platform teljesen reszponzív - mobilon, tableten és számítógépen is működik. A videókat bárhol megnézheted, a sablonokat letöltheted és offline is dolgozha​tsz velük. A konzultációkat Zoom-on tartjuk, ami szintén elérhető minden eszközön.',
    category: 'basics'
  },
  {
    id: 'faq-5',
    question: 'Magyar nyelvű az összes tartalom?',
    answer: 'Igen, minden 100%-ban magyarul van: videók, sablonok, dokumentációk, konzultációk. Az oktatók magyar anyanyelvűek, magyar piaci példákat használnak, magyar vállalatokkal dolgoznak. Nem fordított amerikai tartalom - ez a magyar piacra készült.',
    category: 'differentiation'
  },
  {
    id: 'faq-6',
    question: 'Milyen fizetési módokat fogadtok el?',
    answer: 'Bankkártyás fizetés (Visa, Mastercard) Stripe-on keresztül, vagy átutalás. A DWY/DFY csomagoknál van lehetőség részletfizetésre is - vedd fel velünk a kapcsolatot az egyedi ajánlatért.',
    category: 'basics'
  },
  {
    id: 'faq-7',
    question: 'A csapatom is hozzáférhet?',
    answer: 'Igen, egy masterclass vásárlással 3 csapattag kaphat hozzáférést. Ha több kell, jelezd nekünk - csapatlicer​ncet kedvezményesen tudjuk biztosítani. A DWY/DFY csomagoknál a konzultációkon a teljes csapat részt vehet.',
    category: 'support'
  },
  {
    id: 'faq-8',
    question: 'Miben más ez mint a YouTube tutorialok?',
    answer: 'Három fő különbség: (1) Strukturált rendszer - nem random tippek, hanem A-tól Z-ig megmondva mit csinálj. (2) Letölthető sablonok - amit látsz a videóban, azt megkapod kitölthetően. (3) Személyes támogatás - ha elakadsz, segítünk (DWY/DFY), nem vagy egyedül. A YouTube jó inspirációnak, de nem épít működő rendszert.',
    category: 'differentiation'
  }
];
