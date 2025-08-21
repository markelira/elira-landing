import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Felhasználási Feltételek | Elira',
  description: 'Az Elira szolgáltatásainak felhasználási feltételei.',
  robots: 'noindex, nofollow'
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Felhasználási Feltételek</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Hatályos: 2025. január 1-től
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Általános Rendelkezések</h2>
              <p className="mb-4">
                Jelen felhasználási feltételek az Elira Kft. (továbbiakban: "Szolgáltató") 
                által üzemeltetett https://elira.hu weboldal használatára vonatkoznak.
              </p>
              <p className="mb-4">
                A weboldal használatával Ön elfogadja ezeket a feltételeket.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Szolgáltatások</h2>
              <p className="mb-4">A Szolgáltató az alábbi szolgáltatásokat nyújtja:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Ingyenes oktatási anyagok biztosítása</li>
                <li>Email newsletter szolgáltatás</li>
                <li>Közösségi platform hozzáférés</li>
                <li>Karrierfejlesztési tippek és tanácsok</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Felhasználói Kötelezettségek</h2>
              <p className="mb-4">A felhasználó köteles:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Valós adatokat megadni regisztrációkor</li>
                <li>Nem használni a szolgáltatást jogellenes célokra</li>
                <li>Nem megosztani harmadik féllel a letöltött anyagokat kereskedelmi célból</li>
                <li>Tiszteletben tartani mások szerzői jogait</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Szellemi Tulajdon</h2>
              <p className="mb-4">
                A weboldalon elérhető összes tartalom (szöveg, kép, videó, letölthető anyagok) 
                a Szolgáltató szellemi tulajdonát képezi.
              </p>
              <p className="mb-4">
                Az ingyenes anyagok személyes felhasználásra letölthetők, de kereskedelmi 
                célú felhasználásuk vagy továbbadásuk tilos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Felelősség Korlátozása</h2>
              <p className="mb-4">
                A Szolgáltató nem vállal felelősséget az ingyenes anyagok használatából 
                eredő károkért. Az anyagokat oktatási célból biztosítjuk.
              </p>
              <p className="mb-4">
                A szolgáltatás "ahogy van" alapon kerül biztosításra, mindenféle 
                garancia nélkül.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Adatvédelem</h2>
              <p className="mb-4">
                Az adatkezelésre vonatkozó szabályokat az 
                <a href="/privacy" className="text-teal-600 hover:text-teal-700">
                  Adatvédelmi Tájékoztató
                </a> tartalmazza.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Szolgáltatás Módosítása</h2>
              <p className="mb-4">
                A Szolgáltató fenntartja a jogot a szolgáltatások bármikori 
                módosítására, korlátozására vagy megszüntetésére.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Alkalmazandó Jog</h2>
              <p className="mb-4">
                Jelen feltételekre a magyar jog az irányadó. Vitás esetekben 
                a magyar bíróságok rendelkeznek hatáskörrel.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Kapcsolat</h2>
              <p className="mb-4">
                Kérdés esetén írjon nekünk: <strong>info@elira.hu</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Hatálybalépés</h2>
              <p className="mb-4">
                Jelen feltételek 2025. január 1. napján léptek hatályba.
                A módosításokról weboldalunkon tájékoztatjuk.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a 
              href="/" 
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Vissza a főoldalra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}